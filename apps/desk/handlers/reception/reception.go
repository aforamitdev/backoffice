package reception

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/aforamitdev/backoffice/internal/telegram"
	"github.com/aforamitdev/backoffice/zero/web"
)

type Handler struct {
	build     string
	telClient *telegram.Telegram
}

func New(build string, telClient *telegram.Telegram) *Handler {

	return &Handler{
		build:     build,
		telClient: telClient,
	}
}

func (h *Handler) GetActiveHooks(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
	ctx, cancle := context.WithTimeout(ctx, time.Second)
	defer cancle()

	// status := "OK"
	statusCode := http.StatusOK

	hooks, err := h.telClient.GetRegisterHooks()

	if err != nil {
		fmt.Println("error gerring hooks")
	}
	// data := struct {
	// 	Status string `json:"status"`
	// }{
	// 	Status: status,
	// }

	return web.Respond(ctx, w, hooks, statusCode)

}
