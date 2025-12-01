package web

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"syscall"

	"github.com/dimfeld/httptreemux/v5"
)

type Logger func(ctx context.Context, msg string, args ...any)

type Handler func(ctx context.Context, w http.ResponseWriter, r *http.Request) error

type App struct {
	mux      *httptreemux.ContextMux
	log      Logger
	shutdown chan os.Signal
	mw       []Middleware
}

func NewApp(shutdown chan os.Signal, mw ...Middleware) *App {

	mux := httptreemux.NewContextMux()
	return &App{
		mux: mux,
		mw:  mw,
	}

}

func (a *App) SignalShutdown() {
	a.shutdown <- syscall.SIGTERM
}

func (a *App) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	a.mux.ServeHTTP(w, r)
}

func (a *App) Handle(method string, group string, path string, handler Handler, mw ...Middleware) {
	handler = wrapMiddleware(mw, handler)

	h := func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		handler(ctx, w, r)

	}
	finalPath := path
	if group != "" {
		finalPath = "/" + group + path
	}
	fmt.Println(finalPath)
	a.mux.Handle(method, finalPath, h)

}
