package web

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"syscall"

	"github.com/gorilla/mux"
)

type Logger func(ctx context.Context, msg string, args ...any)

type Handler func(ctx context.Context, w http.ResponseWriter, r *http.Request) error

type App struct {
	mux      *mux.Router
	log      Logger
	shutdown chan os.Signal
}

func NewApp(shutdown chan os.Signal) *App {

	mux := mux.NewRouter()
	return &App{
		mux: mux,
	}

}

func (a *App) SignalShutdown() {
	a.shutdown <- syscall.SIGTERM
}

func (a *App) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	a.mux.ServeHTTP(w, r)
}

func (a *App) Handle(method string, path string, handler Handler) {
	fmt.Printf("registring url %s", path)
	h := func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		handler(ctx, w, r)

	}
	a.mux.HandleFunc(path, h).Methods(method)
}
