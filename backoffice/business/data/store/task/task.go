package task

import (
	"context"
	"fmt"

	"github.com/aforamitdev/backoffice/backoffice/app/services/storage"
	"go.uber.org/zap"
)

type Store struct {
	log *zap.SugaredLogger
	db  *storage.PbDb
}

func NewStore(log *zap.SugaredLogger, db *storage.PbDb) Store {
	return Store{log: log, db: db}
}

func (s Store) Query(ctx context.Context, pageNumber int, rowsPerPage int) ([]Task, error) {
	data := struct {
		Offset       int `db:""`
		RowsPerPages int `db:""`
	}{
		Offset:       0,
		RowsPerPages: 10,
	}
	var tasks []Task
	fmt.Println(data)
	return tasks, nil
}
