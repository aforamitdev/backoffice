package reception

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/aforamitdev/backoffice/business/core/gram"
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
		statusCode := http.StatusInternalServerError
		errRes := struct {
			Status string `json:"status"`
		}{Status: "as"}

		return web.Respond(ctx, w, errRes, statusCode)
	}

	return web.Respond(ctx, w, hooks, statusCode)

}

func (h *Handler) ReciveHookMessage(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
	ctx, cancle := context.WithTimeout(ctx, time.Second)
	defer cancle()

	respBytes, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error")
	}

	message := gram.BotMessage{}

	err = json.Unmarshal(respBytes, &message)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(message)

	return nil

}
