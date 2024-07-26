package handlers

import (
	"fmt"
	"net/http"
	"os"

	"github.com/aforamitdev/backoffice/apps/desk/handlers/status"
	"github.com/aforamitdev/backoffice/zero/web"
	"go.uber.org/zap"
)

type APIMuxConfig struct {
	Shutdown chan os.Signal
	Log      *zap.SugaredLogger
	Build    string
}

func APIMux(cfg APIMuxConfig) http.Handler {
	app := web.NewApp(cfg.Shutdown)

	status := status.New(cfg.Build)
	fmt.Println(status)
	app.Handle(http.MethodGet, "/status", status.Readness)

	return app
}
