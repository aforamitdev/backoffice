package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/aforamitdev/backoffice/backoffice/app/services/storage"
	"github.com/aforamitdev/backoffice/backoffice/foundation/logger"
	"github.com/ardanlabs/conf"
	"go.uber.org/zap"
)

var build = "develop"

func main() {
	log, err := logger.New("BACK-OFFICE")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	storage, err := storage.NewBackOfficeStorage()
	if err != nil {
		os.Exit(1)
	}

	if err = run(log, storage); err != nil {

		os.Exit(1)
	}

}

func run(log *zap.SugaredLogger, storage *storage.BackOfficeStorage) error {

	cfg := struct {
		conf.Version
		Web struct {
			APIHost         string        `conf:"default:localhost:9000"`
			DebugHost       string        `conf:"default:0.0.0.0:9001"`
			ShutdownTimeout time.Duration `conf:"default:20s"`
		}
	}{
		Version: conf.Version{
			SVN:  build,
			Desc: "Back office api",
		},
	}
	fmt.Println(cfg)
	log.Infow("starting service", "version", build)
	defer log.Infow("shutdown complete")

	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, syscall.SIGINT, syscall.SIGTERM)

	serverErrors := make(chan error, 1)

	api := http.Server{
		Addr:     cfg.Web.APIHost,
		ErrorLog: zap.NewStdLog(log.Desugar()),
	}

	go func() {
		serverErrors <- storage.StartDBUi()
	}()

	go func() {
		serverErrors <- api.ListenAndServe()
	}()

	select {
	case err := <-serverErrors:
		return fmt.Errorf("server error: %w", err)

	case sig := <-shutdown:
		log.Infow("shutdown", "status", "shutdown started", "signal", sig)
		ctx, cancel := context.WithTimeout(context.Background(), cfg.Web.ShutdownTimeout)
		defer cancel()
		if err := api.Shutdown(ctx); err != nil {
			api.Close()
			return fmt.Errorf("cloud not stop gracefully")
		}
		os.Exit(0)
		return nil
	}

}
