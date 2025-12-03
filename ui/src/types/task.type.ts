

export interface AppTask {
  ID: string
  title: string
  task_type: TaskType
  detail: string
  tags?: Tag[]
  priorities: Priorities
}

export interface TaskType {
  id: string
  name: string
}

export interface Tag {
  id: string
  name: string
  color: string
}

export interface Priorities {
  id: string
  name: string
}
