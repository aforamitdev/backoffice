package task

type Task struct {
	ID         string     `db:"id",json:"id"`
	Title      string     `json:"title"`
	TaskType   TaskType   `json:"task_type"`
	Detail     string     `json:"detail"`
	Tags       []Tag      `json:"tags"`
	Priorities Priorities `json:"priorities"`
}

type Tag struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Color string `json:"color"`
}

type Priorities struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type TaskType struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}
