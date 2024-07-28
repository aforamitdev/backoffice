package handlers

import (
	"net/http"
	"os"

	"github.com/aforamitdev/backoffice/apps/desk/handlers/reception"
	"github.com/aforamitdev/backoffice/apps/desk/handlers/status"
	"github.com/aforamitdev/backoffice/internal/telegram"
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

	// initiate terlgram client
	telClient := telegram.NewTelegramClient()
	reception := reception.New(cfg.Build, telClient)

	app.Handle(http.MethodGet, "/status", status.Readness)
	app.Handle(http.MethodGet, "/receptions", reception.GetActiveHooks)
	app.Handle(http.MethodPost, "/receptions/lobby/message", reception.ReciveHookMessage)

	return app
}
