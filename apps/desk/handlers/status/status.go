package status

import (
	"context"
	"net/http"
	"time"

	"github.com/aforamitdev/backoffice/zero/web"
)

type Handler struct {
	build string
}

func New(build string) *Handler {
	return &Handler{
		build: build,
	}
}

func (h *Handler) Readness(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
	ctx, cancle := context.WithTimeout(ctx, time.Second)
	defer cancle()

	status := "OK"
	statusCode := http.StatusOK

	data := struct {
		Status string `json:"status"`
	}{
		Status: status,
	}

	return web.Respond(ctx, w, data, statusCode)

}
