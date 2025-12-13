package taggrp

import (
	"context"
	"fmt"
	"net/http"

	"github.com/aforamitdev/backoffice/backoffice/business/core/tag"
	"github.com/aforamitdev/backoffice/backoffice/foundation/web"
)

type Handler struct {
	Tag tag.Core
}

func (h Handler) Query(ctx context.Context, w http.ResponseWriter, r *http.Request) error {

	tags, err := h.Tag.Query(ctx, 1, 2)
	if err != nil {
		return fmt.Errorf("error getting rags ")
	}
	return web.Respond(ctx, w, tags, http.StatusOK)

}
