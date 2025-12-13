import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { Tag, MoreHorizontal, Paperclip, MessageCircle, ChevronDown, X, Download } from 'lucide-react'

import TaskTypeSelector from '@/components/shared/dropdown/task-type-selector'
import TaskStatusSelector from '@/components/shared/dropdown/task-status-selector'
import PrioritySelector from '@/components/shared/dropdown/priority-status-selector'
import DatePicker from '@/components/shared/dropdown/picker-date'
import { useAtomValue } from 'jotai'
import { taskPriorityAtom, taskStatusAtom, taskTypeAtom } from '@/state/tasks/task.jotai'
import type { TaskPriority, TaskStatus, TaskType } from '@/types/task.type'
import { TaskValidation, type TaskPayload } from '@/services/validation/task.validation'

interface CreateTaskModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function CreateTaskModal({ open, onOpenChange }: CreateTaskModalProps) {
	const [activeTab, setActiveTab] = useState('task')
	const taskTypes = useAtomValue(taskTypeAtom)
	const taskStatus = useAtomValue(taskStatusAtom)
	const taskPriority = useAtomValue(taskPriorityAtom)

	const [title, setTitle] = useState('')
	const [details, setDetails] = useState('')

	const [taskType, setTaskType] = useState<TaskType | null>(null)
	const [status, setTaskStatus] = useState<TaskStatus | null>(null)
	const [priority, setTaskPriority] = useState<TaskPriority | null>(null)

	const handleCreateTask = () => {
		const payload: Partial<TaskPayload> = {
			detail: details,
			title,
			due_date: new Date().toISOString(),
			status: status?.id,
			priority: priority?.id,
			type: taskType?.id,
		}
		console.log(payload, 'PAYLOAD')
		const request = TaskValidation.parse(payload)
		console.log({ request })
		console.log(title, details, taskType, status, priority)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[680px] p-0 gap-0  bg-gray-800  overflow-hidden rounded-xs">
				{/* <DialogHeader className='p-0 border-b '>
          <div className='flex items-center justify-between px-4 pt-3 text-white'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='bg-transparent h-auto p-0 gap-0 rounded-none'>
                <TabsTrigger
                  value='task'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Task
                </TabsTrigger>
                <TabsTrigger
                  value='doc'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Doc
                </TabsTrigger>
                <TabsTrigger
                  value='reminder'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Reminder
                </TabsTrigger>
                <TabsTrigger
                  value='chat'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value='whiteboard'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Whiteboard
                </TabsTrigger>
                <TabsTrigger
                  value='dashboard'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Dashboard
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className='flex items-center gap-2 pb-2'>
              <Button
                variant='ghost'
                size='icon'
                className='h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none'
              >
                <Download className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none'
                onClick={() => onOpenChange(false)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </DialogHeader> */}

				<div className="p-4 space-y-4">
					<div className="flex items-center gap-2">
						<TaskTypeSelector taskTypes={taskTypes} currentTask={taskType} setTaskType={setTaskType} />
					</div>

					<Input
						placeholder="Task Name or type '/' for commands"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="h-12 placeholder:text-sm text-sm text-input rounded-4xl"
					/>

					<div className="relative">
						<Textarea
							placeholder="Add description, or write with"
							value={details}
							onChange={(e) => setDetails(e.target.value)}
							className=" bg-transparent text-input resize-none pr-16 rounded-4xl"
						/>
					</div>
					<div className="flex items-center gap-2 flex-wrap">
						<TaskStatusSelector taskStatuses={taskStatus} currentStatus={status} setTaskStatus={setTaskStatus} />

						<DatePicker />
						<PrioritySelector priorities={taskPriority} currentPriority={priority} setTaskPriority={setTaskPriority} />

						<Button variant="outline" className="h-8   gap-2 primary-btn rounded-xs ">
							<Tag className="h-4 w-4" />
							Tags
						</Button>

						<Button variant="outline" size="icon" className="h-8   gap-2 primary-btn rounded-xs ">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</div>

					{/* <div className='space-y-3 pt-2'>
            <p className='text-sm text-white'>Custom Fields</p>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                onClick={() => setShowCustomFields(!showCustomFields)}
                className='h-8   gap-2 primary-btn rounded-xs '
              >
                {showCustomFields ? 'Hide' : 'Show'} custom fields
              </Button>
              <Button
                variant='outline'
                className='h-8   gap-2 primary-btn rounded-xs '
              >
                + Create new field
              </Button>
            </div>
          </div> */}
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between p-4 border-t border-zinc-800 bg-zinc-900/50">
					<div className="flex items-center gap-3">
						<Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none">
							<Paperclip className="h-4 w-4" />
						</Button>
						<Button variant="ghost" className="h-8 px-2 gap-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none">
							<MessageCircle className="h-4 w-4" />
							<span className="text-sm">1</span>
						</Button>

						{/* Create Task Button */}
						<div className="flex">
							<Button onClick={() => handleCreateTask()} className="h-9 px-4 bg-purple-500 hover:bg-purple-700 text-white rounded-xs">
								Create Task
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button className="h-9 px-2 bg-purple-500 hover:bg-blue-700 text-white rounded-none border-l border-purple-500">
										<ChevronDown className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="bg-zinc-800 border-zinc-700 rounded-none">
									<DropdownMenuItem className="text-zinc-300 focus:bg-zinc-700 focus:text-white rounded-none">
										Create and open
									</DropdownMenuItem>
									<DropdownMenuItem className="text-zinc-300 focus:bg-zinc-700 focus:text-white rounded-none">
										Create and add another
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
