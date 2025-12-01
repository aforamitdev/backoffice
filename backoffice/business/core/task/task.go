package task

import (
	"context"
	"fmt"

	"github.com/aforamitdev/backoffice/backoffice/app/services/storage"
	"github.com/aforamitdev/backoffice/backoffice/business/data/store/task"
	"go.uber.org/zap"
)

type Core struct {
	log  *zap.SugaredLogger
	task task.Store
}

func NewCore(log *zap.SugaredLogger, db *storage.PbDb) Core {
	return Core{log: log, task: task.NewStore(log, db)}
}

func (c Core) Query(ctx context.Context, pageNumber int, rowsPage int) ([]task.Task, error) {
	tasks, err := c.task.Query(ctx, pageNumber, rowsPage)

	if err != nil {
		return nil, fmt.Errorf("query: %w", err)
	}
	return tasks, nil
}
