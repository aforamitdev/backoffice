package handler

import (
	"net/http"
	"os"

	"github.com/aforamitdev/backoffice/backoffice/app/services/office-api/handler/v1/taskgrp"
	"github.com/aforamitdev/backoffice/backoffice/app/services/storage"
	"github.com/aforamitdev/backoffice/backoffice/business/core/task"
	"github.com/aforamitdev/backoffice/backoffice/business/web/mid"
	"github.com/aforamitdev/backoffice/backoffice/foundation/web"
	"go.uber.org/zap"
)

type APIMuxConfig struct {
	Shutdown chan os.Signal
	Log      *zap.SugaredLogger
	Db       *storage.PbDb
}

func APIMux(cfg APIMuxConfig) http.Handler {

	app := web.NewApp(cfg.Shutdown, mid.Errors(cfg.Log))
	v1(app, cfg)
	return app
}

func v1(app *web.App, cfg APIMuxConfig) {
	const version = "v1"
	task := taskgrp.Handler{
		Task: task.NewCore(cfg.Log, cfg.Db),
	}

	app.Handle(http.MethodGet, version, "/tasks/:page/:row", task.Query)

}
