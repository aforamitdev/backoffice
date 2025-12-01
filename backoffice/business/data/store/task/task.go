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
	// data := struct {
	// 	Offset       int `db:""`
	// 	RowsPerPages int `db:""`
	// }{
	// 	Offset:       0,
	// 	RowsPerPages: 10,
	// }
	var tasks []Task
	records, err := s.db.Pb.FindRecordsByFilter("tasks", "", "", 50, 0)
	if err != nil {
		return nil, fmt.Errorf("requested collection not found")
	}

	for _, record := range records {
		task := Task{
			ID: record.Id, Title: record.GetString("title"), Detail: record.GetString("detail"),
		}

		if taskType := record.ExpandedOne("task_type"); taskType != nil {
			task.TaskType = TaskType{
				Id:   taskType.Id,
				Name: taskType.GetString("name"),
			}
		}
		tags, err := s.GetTagsByIds(ctx, record.GetStringSlice("tags"))

		if err != nil {
			return nil, fmt.Errorf("error fetching tag")
		}

		task.Tags = tags

		tasks = append(tasks, task)

	}

	return tasks, nil
}

func (s Store) GetTagsByIds(ctx context.Context, ids []string) ([]Tag, error) {
	records, err := s.db.Pb.FindRecordsByIds("tags", ids)
	if err != nil {
		return nil, fmt.Errorf("error fetching tags: %w", err)
	}

	var tags []Tag
	for _, r := range records {
		tags = append(tags, Tag{ID: r.Id, Name: r.GetString("name")})
	}

	return tags, nil
}
