package telegram

import (
	"fmt"
	"os"
)

type Telegram struct {
	baseUrl string
}

func NewTelegramClient() *Telegram {

	return &Telegram{
		baseUrl: fmt.Sprintf("https://api.telegram.org/bot%s", os.Getenv("TELEGRAM_SECRAE")),
	}

}

func (t *Telegram) RegisterWebHook() {

}
