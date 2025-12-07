

export interface AppTask {
  ID: string
  title: string
  task_type: TaskType
  detail: string
  tags?: Tag[]
  priorities: Priorities
  children?:AppTask[]
}

export interface TaskType {
  id: string
  name: 'GOAL' | 'MILESTONE' | 'SUBTASK' | 'UNIT';
}

export interface Tag {
  id: string
  name: string
  color: string
}

export interface Priorities {
  id: string
  name: "HIGH"|"LOW"|"MEDIUM"|"NOW"
}
