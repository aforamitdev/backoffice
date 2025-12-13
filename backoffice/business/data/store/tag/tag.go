package tag

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
func (s Store) Query(ctx context.Context) (*[]Tag, error) {

	var tags []Tag

	record, err := s.db.Pb.FindRecordsByFilter("tags", "", "", 10, 0)
	if err != nil {
		return nil, fmt.Errorf("error getting tags")
	}
	for _, i := range record {
		fmt.Println(i, "data")
		tag := Tag{ID: i.Id, Name: i.GetString("name"), Color: i.GetString("color")}
		tags = append(tags, tag)
	}

	return &tags, nil
}
