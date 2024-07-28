package main

import (
	"context"
	"errors"
	"expvar"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"runtime"
	"syscall"
	"time"

	"github.com/aforamitdev/backoffice/apps/desk/handlers"
	"github.com/aforamitdev/backoffice/business/sys/database"
	"github.com/aforamitdev/backoffice/zero/logger"
	"github.com/ardanlabs/conf/v3"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

var build = "develop"

func main() {
	log, err := logger.New("DESK-API")

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	if err != run(log) {
		log.Error("startup", "ERROR", err)
		log.Sync()
		os.Exit(1)
	}

}

func run(log *zap.SugaredLogger) error {
	err := godotenv.Load(".env.production")
	if err != nil {
		log.Error("error loading env file", err)
	}

	log.Infow("startup", "GOMAXPROCESS", runtime.GOMAXPROCS(0))

	cfg := struct {
		conf.Version
		Web struct {
			ReadTimeout     time.Duration `conf:"default:5s"`
			WriteTimeout    time.Duration `conf:"default:10s"`
			IdleTimeout     time.Duration `conf:"default:120s"`
			ShutdownTimeout time.Duration `conf:"default:20s"`
			APIHost         string        `conf:"default:0.0.0.0:9080"`
			DebugHost       string        `conf:"default:0.0.0.0:9081"`
		}
		database.Config
		Telegram struct {
			TelegramSecrate string `conf:"env:TELEGRAM_SECREAT"`
		}
	}{
		Version: conf.Version{
			Build: build,
			Desc:  "amitrai",
		},
		Config: database.Config{
			User:       os.Getenv("DATABASE_USER"),
			Password:   os.Getenv("DATABASE_PASSWORD"),
			Host:       os.Getenv("DATABASE_HOST"),
			Name:       os.Getenv("DATABSE_DB"),
			DisableTLS: true,
		},
	}
	cfg.Telegram.TelegramSecrate = os.Getenv("TELEGRAM_SECREAT")
	const prefix = "DESK"
	help, err := conf.Parse(prefix, &cfg)

	if err != nil {
		if errors.Is(err, conf.ErrHelpWanted) {
			fmt.Println(help)
			return nil
		}
		return fmt.Errorf("parsinf conf: %w", err)
	}
	log.Infow("starting service", "version", build)
	defer log.Infow("shutdown complet")

	out, err := conf.String(&cfg)
	if err != nil {
		return fmt.Errorf("generating config for output: %w", err)
	}
	log.Infow("startup", "config", out)

	expvar.NewString("build").Set(build)

	// server start
	serverErrors := make(chan error, 1)

	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, syscall.SIGINT, syscall.SIGTERM)

	apiMux := handlers.APIMux(handlers.APIMuxConfig{
		Build:    build,
		Shutdown: shutdown,
		Log:      log,
	})

	db, err := database.Open(cfg.Config)
	if err != nil {
		log.Fatalf("database fail", err, "fail to coneect database")

	}
	ctx := context.Background()
	err = database.StatusCheck(ctx, db)
	if err != nil {
		panic(err)
	}

	api := http.Server{
		Addr:         cfg.Web.APIHost,
		Handler:      apiMux,
		ReadTimeout:  cfg.Web.ReadTimeout,
		WriteTimeout: cfg.Web.WriteTimeout,
		IdleTimeout:  cfg.Web.IdleTimeout,
		ErrorLog:     zap.NewStdLog(log.Desugar()),
	}

	go func() {
		log.Infow("startup", "status", "api router started", "host", api.Addr)

		serverErrors <- api.ListenAndServe()
	}()

	select {
	case err := <-serverErrors:
		fmt.Println(err)
		return fmt.Errorf("server error :%w", err)
	case sig := <-shutdown:
		log.Infow("shutdown", "status", "shutdown started", "signal", sig)
		defer log.Infow("shutdown", "status", "shutdown started", "signal", sig)
		ctx, cancel := context.WithTimeout(context.Background(), cfg.Web.ShutdownTimeout)
		defer cancel()

		if err := api.Shutdown(ctx); err != nil {
			api.Close()
			return fmt.Errorf("could not stop server gracefully: %w", err)
		}

	}
	return nil

}
