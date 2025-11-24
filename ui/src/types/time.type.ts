export type TimeEntryPayload={
	workSpaceId:string
	tid:string
	team_id:string 
}



export interface TimeResponse {
  data: Data
}

export interface Data {
  id: string
  task: Task
  wid: string
  user: User
  billable: boolean
  start: string
  duration: number
  description: string
  source: string
  at: string
  is_locked: boolean
  task_location: TaskLocation
  task_url: string
}

export interface Task {
  id: string
  name: string
  status: Status
  custom_type: number
}

export interface Status {
  status: string
  color: string
  type: string
  orderindex: number
}

export interface User {
  id: number
  username: string
  email: string
  color: string
  initials: string
  profilePicture: string 
}

export interface TaskLocation {
  list_id: string
  folder_id: string
  space_id: string
}
