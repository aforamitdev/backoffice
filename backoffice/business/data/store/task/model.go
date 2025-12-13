package task

type Task struct {
	ID       string      `db:"id",json:"id"`
	Title    string      `json:"title"`
	TaskType *TaskType   `json:"task_type"`
	Detail   string      `json:"detail"`
	Tags     []Tag       `json:"tags"`
	Priority *Priority   `json:"priorities"`
	SubTasks []Task      `json:"children"`
	Status   *TaskStatus `json:"status"`
}

type Tag struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Color string `json:"color"`
}

type Priority struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type TaskType struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type TaskStatus struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}
