package telegram

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/aforamitdev/backoffice/business/core/hooks"
)

type Telegram struct {
	baseUrl string
}

func NewTelegramClient() *Telegram {

	return &Telegram{
		baseUrl: fmt.Sprintf("https://api.telegram.org/bot%s", os.Getenv("TELEGRAM_SECREAT")),
	}

}

func (t *Telegram) RegisterWebHook() {

}

func (t *Telegram) GetRegisterHooks() (hooks.TelegramHookResponse, error) {

	c := http.Client{Timeout: time.Duration(2) * time.Second}

	resp, err := c.Get(fmt.Sprintf("%s/getWebhookInfo", t.baseUrl))

	if err != nil {
		fmt.Println(err)
		return hooks.TelegramHookResponse{}, err
	}

	defer resp.Body.Close()

	respBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading hooks byted", err)
		return hooks.TelegramHookResponse{}, err
	}

	fmt.Print(string(respBytes))

	info := hooks.TelegramHookResponse{}

	err = json.Unmarshal(respBytes, &info)
	if err != nil {
		fmt.Println(err)
	}

	return info, nil
}
