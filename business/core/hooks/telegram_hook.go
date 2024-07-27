package hooks

type TelegramHookResponse struct {
	Ok     bool         `json:"ok"`
	Result TelegramHook `json:"result"`
}

type TelegramHook struct {
	URL                  string `json:"url"`
	HasCustomCertificate bool   `json:"has_custom_certificate"`
	PendingUpdateCount   int    `json:"pending_update_count"`
	MaxConnections       int    `json:"max_connections"`
	IPAddress            string `json:"ip_address"`
}
