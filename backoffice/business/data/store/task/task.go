package task

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/aforamitdev/backoffice/backoffice/app/services/storage"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
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
	records, err := s.db.Pb.FindRecordsByFilter("tasks", "task_type.name = {:goalType} || task_type.name = {:itemType}", "", 50, 0, dbx.Params{"goalType": "GOAL", "itemType": "ITEM"})
	if err != nil {
		fmt.Println(err, "Err")
		return nil, fmt.Errorf("requested collection not found")
	}

	for _, record := range records {

		task, err := s.ParseCollectionToTasks(ctx, record)
		if err != nil {
			return nil, fmt.Errorf("error parsing tasks")
		}

		tasks = append(tasks, *task)

	}

	return tasks, nil
}

func (s Store) GetTagsByIds(ctx context.Context, ids []string) ([]Tag, error) {
	records, err := s.db.Pb.FindRecordsByIds("tags", ids)
	if err != nil {

		return nil, fmt.Errorf("error fetching tags: %w", err)
	}

	tags := []Tag{}
	for _, r := range records {
		tags = append(tags, Tag{ID: r.Id, Name: r.GetString("name")})
	}

	return tags, nil
}

func (s Store) GetPriorityById(ctx context.Context, priority string) (*Priority, error) {
	record, err := s.db.Pb.FindRecordById("priority", priority)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("error fetching priority:%w", err)
	}
	p := Priority{}
	p.ID = record.Id
	p.Name = record.GetString("name")

	return &p, nil

}

func (s Store) GetTaskType(ctx context.Context, id string) (*TaskType, error) {
	record, err := s.db.Pb.FindRecordById("task_type", id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("error getting task type")
	}
	t := TaskType{}
	t.Id = record.Id
	t.Name = record.GetString("name")
	return &t, nil
}

func (s Store) GetChildren(ctx context.Context, ids []string) (*[]Task, error) {
	var tasks []Task
	records, err := s.db.Pb.FindRecordsByIds("tasks", ids)
	if err != nil {
		return nil, fmt.Errorf("requested collection not found")
	}

	for _, record := range records {

		task, err := s.ParseCollectionToTasks(ctx, record)
		if err != nil {
			return nil, fmt.Errorf("error parsing tasks")
		}

		tasks = append(tasks, *task)

	}

	return &tasks, nil
}

func (s Store) ParseCollectionToTasks(ctx context.Context, record *core.Record) (*Task, error) {

	task := Task{
		ID: record.Id, Title: record.GetString("title"), Detail: record.GetString("detail"),
	}

	if taskType := record.ExpandedOne("task_type"); taskType != nil {
		task.TaskType = &TaskType{
			Id:   taskType.Id,
			Name: taskType.GetString("name"),
		}
	}

	tags, err := s.GetTagsByIds(ctx, record.GetStringSlice("tags"))

	if err != nil {
		return nil, fmt.Errorf("error fetching tag")
	}

	task.Tags = tags

	priority, err := s.GetPriorityById(ctx, record.GetString("priority"))
	task.Priority = priority

	tt, err := s.GetTaskType(ctx, record.GetString("task_type"))
	task.TaskType = tt
	childrenIds := record.GetStringSlice("children")

	subtasks, err := s.GetChildren(ctx, childrenIds)
	task.SubTasks = *subtasks

	return &task, err

}
