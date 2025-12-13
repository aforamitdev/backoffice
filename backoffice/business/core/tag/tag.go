package tag

import (
	"context"
	"fmt"

	"github.com/aforamitdev/backoffice/backoffice/app/services/storage"
	"github.com/aforamitdev/backoffice/backoffice/business/data/store/tag"
	"go.uber.org/zap"
)

type Core struct {
	log *zap.SugaredLogger
	tag tag.Store
}

func NewCore(log *zap.SugaredLogger, db *storage.PbDb) Core {
	return Core{log: log, tag: tag.NewStore(log, db)}
}

func (c Core) Query(ctx context.Context, pageNumber int, rowsPage int) ([]tag.Tag, error) {
	tags, err := c.tag.Query(ctx)
	if err != nil {
		return nil, fmt.Errorf("query: %w", err)
	}
	return *tags, nil
}
