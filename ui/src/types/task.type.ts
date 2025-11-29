export interface Priority {
  id: string
  priority: string
  color: string
  orderindex: string
}

export interface Dependency {
  task_id: string
  depends_on: string
  type: number
}

export interface LinkedTask {
  task_id: string
  link_id: string
}

export interface Location {
  id: string
  name: string
  lat: string
  lng: string
}

export interface GroupAssignee {
  id: number
  name: string
}

export interface Task {
  id: string
  custom_id: string
  custom_item_id: number
  name: string
  text_content: string
  description: string
  status: Status
  orderindex: number
  date_created: string
  date_updated: string
  date_closed: string
  date_done: string
  archived: boolean
  creator: Creator
  assignees: Assignee[]
  group_assignees: GroupAssignee[]
  watchers: Watcher[]
  checklists: Checklist[]
  tags: Tag[]
  parent: string
  top_level_parent: string
  priority: Priority | null
  due_date: string | null
  start_date: string | null
  points: number | null
  time_estimate: number | null
  custom_fields: CustomField[]
  dependencies: Dependency[]
  linked_tasks: LinkedTask[]
  locations: Location[]
  team_id: string
  url: string
  sharing: Sharing
  permission_level: string
  list: List
  project: Project
  folder: Folder
  space: Space
  children: Task[]
}

export interface Tag {
  name: string 
  tag_fg: string
   tag_bg: string
   creator: number
}

export interface Status {
  status: string
  id: string
  color: string
  type: string
  orderindex: number
}

export interface Creator {
  id: number
  username: string
  color: string
  email: string
  profilePicture: string
}

export interface Assignee {
  id: number
  username: string
  color: string
  initials: string
  email: string
  profilePicture: string | null
}

export interface Watcher {
  id: number
  username: string
  color: string
  initials: string
  email: string
  profilePicture: string | null
}

export interface CustomField {
  id: string
  name: string
  type: string
  type_config: TypeConfig
  date_created: string
  hide_from_guests: boolean
  required: boolean
}

export interface TypeConfig {}

export interface Sharing {
  public: boolean
  public_share_expires_on: string | null
  public_fields: string[]
  token: string | null
  seo_optimized: boolean
}

export interface List {
  id: string
  name: string
  access: boolean
}

export interface Project {
  id: string
  name: string
  hidden: boolean
  access: boolean
}

export interface Folder {
  id: string
  name: string
  hidden: boolean
  access: boolean
}

export interface Space {
  id: string
}




export interface Checklist {
  id: string
  task_id: string
  name: string
  date_created: string
  orderindex: number
  creator: number
  resolved: number
  unresolved: number
  items: Item[]
}

export interface Item {
  id: string
  name: string
  orderindex: number
  resolved: boolean
  parent: string | null
  date_created: string
  start_date: string | null
  start_date_time: boolean
  due_date: string | null
  due_date_time: boolean
  sent_due_date_notif: boolean | null
  children: Item[]
}
