package taskgrp

import (
	"context"
	"fmt"
	"net/http"
	"strconv"

	taskCore "github.com/aforamitdev/backoffice/backoffice/business/core/task"
	"github.com/aforamitdev/backoffice/backoffice/business/sys/validate"
	"github.com/aforamitdev/backoffice/backoffice/foundation/web"
)

type Handler struct {
	Task taskCore.Core
}

func (h Handler) Query(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
	page := web.Param(r, "page")

	pageNumber, err := strconv.Atoi(page)
	if err != nil {
		fmt.Println(err)
		return validate.NewRequestError(fmt.Errorf("invalid page format [%s]", page), http.StatusBadRequest)
	}

	rows := web.Param(r, "row")
	rowsPerPage, err := strconv.Atoi(rows)

	if err != nil {
		fmt.Println(err)
		return validate.NewRequestError(fmt.Errorf("invalid rows format [%s]", rows), http.StatusBadRequest)
	}

	tasks, err := h.Task.Query(ctx, pageNumber, rowsPerPage)
	if err != nil {
		return validate.NewRequestError(fmt.Errorf("invalid page format [%s]", 10), http.StatusBadRequest)
	}
	return web.Respond(ctx, w, tasks, http.StatusOK)

}
