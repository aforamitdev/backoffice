'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Progress } from '@/components/ui/progress'
import {
	X,
	MoreHorizontal,
	CalendarIcon,
	Flag,
	Users,
	Clock,
	MessageSquare,
	Paperclip,
	Link2,
	CheckSquare,
	Play,
	ChevronDown,
	Plus,
	Send,
	Activity,
	FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import type { AppTask } from '@/types/task.type'
import { TaskTypeIcon } from '../Task/Rows/task-type-icon'
import { useAtom, useSetAtom } from 'jotai'
import { selectedTaskAtom } from '@/state/tasks/task.jotai'

interface TaskDetailDrawerProps {
	task: AppTask | null
	open: boolean
}

const PRIORITIES = [
	{
		value: 'High',
		label: 'High',
		color: 'bg-red-500/10 text-red-500 border-red-500/20',
	},
	{
		value: 'Medium',
		label: 'Medium',
		color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
	},
	{
		value: 'Low',
		label: 'Low',
		color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
	},
]

const STATUSES = [
	{ value: 'todo', label: 'To Do', color: 'bg-zinc-500' },
	{ value: 'ongoing', label: 'In Progress', color: 'bg-blue-500' },
	{ value: 'done', label: 'Done', color: 'bg-emerald-500' },
]

export function TaskDetailDrawer({ open }: TaskDetailDrawerProps) {
	const [task, setTask] = useAtom(selectedTaskAtom)

	const [activeTab, setActiveTab] = useState('details')
	const [isEditing, setIsEditing] = useState(false)
	const [editedTitle, setEditedTitle] = useState(task?.title || '')
	const [editedDescription, setEditedDescription] = useState(task?.detail || '')
	const [newComment, setNewComment] = useState('')

	if (!task) return null

	const currentPriority = PRIORITIES.find((p) => p.value === task.priorities?.id)
	const currentStatus = STATUSES.find((s) => s.value === 'todo')

	const mockComments = [
		{
			id: '1',
			author: 'Alex Rivera',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
			content: 'Great progress on this task! Let me know if you need any help.',
			timestamp: '2 hours ago',
		},
		{
			id: '2',
			author: 'Jordan Lee',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
			content: "I've reviewed the requirements. Everything looks good to proceed.",
			timestamp: 'Yesterday',
		},
	]

	const mockActivity = [
		{
			id: '1',
			action: 'Task created',
			user: 'Alex Rivera',
			timestamp: 'March 10, 2025',
		},
		{
			id: '2',
			action: 'Status changed to In Progress',
			user: 'Jordan Lee',
			timestamp: 'March 11, 2025',
		},
		{
			id: '3',
			action: 'Priority changed to High',
			user: 'Alex Rivera',
			timestamp: 'March 12, 2025',
		},
	]

	return (
		<Sheet open={open} onOpenChange={() => setTask(null)}>
			<SheetContent className="w-full sm:max-w-[540px] p-0 bg-zinc-900 border-zinc-800 text-white rounded-none">
				{/* Header */}
				<SheetHeader className="p-4 border-b border-zinc-800">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<TaskTypeIcon type={task.task_type} size="md" />
							<div className="flex items-center gap-2">
								<Badge variant="outline" className={cn('rounded-none text-xs', currentStatus?.color, 'text-white border-none')}>
									{currentStatus?.label}
								</Badge>
							</div>
						</div>
					</div>

					{/* Title */}
					<div className="pt-2">
						{isEditing ? (
							<Input
								value={editedTitle}
								onChange={(e) => setEditedTitle(e.target.value)}
								className="text-xl font-semibold bg-transparent border-zinc-700 text-white rounded-none"
								onBlur={() => setIsEditing(false)}
								autoFocus
							/>
						) : (
							<SheetTitle
								className="text-xl font-semibold text-white cursor-pointer hover:text-zinc-300"
								onClick={() => setIsEditing(true)}
							>
								{task.title}
							</SheetTitle>
						)}
					</div>
				</SheetHeader>

				{/* Tabs */}
				<Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
					<TabsList className="w-full justify-start bg-transparent border-b border-zinc-800 p-0 h-auto rounded-none">
						<TabsTrigger
							value="details"
							className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-white text-zinc-400"
						>
							<FileText className="h-4 w-4 mr-2" />
							Details
						</TabsTrigger>
						<TabsTrigger
							value="subtasks"
							className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-white text-zinc-400"
						>
							<CheckSquare className="h-4 w-4 mr-2" />
							Subtasks
							{task.children && task.children.length > 0 && (
								<Badge className="ml-2 h-5 px-1.5 bg-zinc-700 text-zinc-300 rounded-none text-xs">{task.children.length}</Badge>
							)}
						</TabsTrigger>
						<TabsTrigger
							value="comments"
							className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-white text-zinc-400"
						>
							<MessageSquare className="h-4 w-4 mr-2" />
							Comments
						</TabsTrigger>
						<TabsTrigger
							value="activity"
							className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:text-white text-zinc-400"
						>
							<Activity className="h-4 w-4 mr-2" />
							Activity
						</TabsTrigger>
					</TabsList>

					{/* Details Tab */}
					<TabsContent value="details" className="p-4 space-y-6 mt-0">
						{/* Description */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-zinc-400">Description</label>
							<Textarea
								value={editedDescription}
								onChange={(e) => setEditedDescription(e.target.value)}
								placeholder="Add a description..."
								className="min-h-[100px] bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 resize-none rounded-none"
							/>
						</div>

						<Separator className="bg-zinc-800" />

						{/* Properties Grid */}
						<div className="grid grid-cols-2 gap-4">
							{/* Status */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
									<Play className="h-3.5 w-3.5" />
									Status
								</label>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-between bg-zinc-800/50 border-zinc-700 text-white hover:bg-zinc-700 rounded-none"
										>
											<span className="flex items-center gap-2">
												<span className={cn('h-2 w-2 rounded-full', currentStatus?.color)} />
												{currentStatus?.label}
											</span>
											<ChevronDown className="h-4 w-4 opacity-50" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="bg-zinc-800 border-zinc-700 rounded-none">
										{STATUSES.map((status) => (
											<DropdownMenuItem
												key={status.value}
												className="text-zinc-300 focus:bg-zinc-700 focus:text-white rounded-none"
											>
												<span className={cn('h-2 w-2 rounded-full mr-2', status.color)} />
												{status.label}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							{/* Priority */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
									<Flag className="h-3.5 w-3.5" />
									Priority
								</label>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											className={cn(
												'w-full justify-between bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700 rounded-none',
												currentPriority?.color,
											)}
										>
											{currentPriority?.label}
											<ChevronDown className="h-4 w-4 opacity-50" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="bg-zinc-800 border-zinc-700 rounded-none">
										{PRIORITIES.map((priority) => (
											<DropdownMenuItem key={priority.value} className={cn('focus:bg-zinc-700 rounded-none', priority.color)}>
												<Flag className="h-4 w-4 mr-2" />
												{priority.label}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							{/* Due Date */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
									<CalendarIcon className="h-3.5 w-3.5" />
									Due Date
								</label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-between bg-zinc-800/50 border-zinc-700 text-white hover:bg-zinc-700 rounded-none"
										>
											{new Date().toISOString()}
											<CalendarIcon className="h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0 bg-zinc-800 border-zinc-700 rounded-none" align="start">
										<Calendar mode="single" className="bg-zinc-800 text-white rounded-none" />
									</PopoverContent>
								</Popover>
							</div>

							{/* Assignees */}
							{/* <div className='space-y-2'>
                <label className='text-sm font-medium text-zinc-400 flex items-center gap-2'>
                  <Users className='h-3.5 w-3.5' />
                  Assignees
                </label>
                <Button
                  variant='outline'
                  className='w-full justify-between bg-zinc-800/50 border-zinc-700 text-white hover:bg-zinc-700 rounded-none'
                >
                  <div className='flex items-center gap-1'>
                    {task.children.slice(0, 3).map((avatar, i) => (
                      <img
                        key={i}
                        // src={avatar || "/placeholder.svg"}
                        alt=''
                        className='h-6 w-6 rounded-full border-2 border-zinc-800 -ml-1 first:ml-0'
                      />
                    ))}
                    {task.children.length > 3 && (
                      <span className='text-xs text-zinc-400 ml-1'>
                        +{task.children.length - 3}
                      </span>
                    )}
                  </div>
                  <Plus className='h-4 w-4 opacity-50' />
                </Button>
              </div> */}
						</div>

						<Separator className="bg-zinc-800" />

						{/* Progress */}
						{/* <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium text-zinc-400'>
                  Progress
                </label>
                <span className='text-sm font-medium text-white'>
                  {task.progress}%
                </span>
              </div>
              <Progress
                value={task.progress}
                className='h-2 bg-zinc-800 rounded-none'
              />
            </div> */}

						{/* Quick Actions */}
						<div className="flex items-center gap-2 pt-2">
							<Button
								variant="outline"
								size="sm"
								className="gap-2 bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-none"
							>
								<Paperclip className="h-4 w-4" />
								Attach
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="gap-2 bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-none"
							>
								<Link2 className="h-4 w-4" />
								Link
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="gap-2 bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-none"
							>
								<Clock className="h-4 w-4" />
								Time
							</Button>
						</div>
					</TabsContent>

					{/* Subtasks Tab */}
					{/* <TabsContent value='subtasks' className='p-4 space-y-4 mt-0'>
            {task.children && task.children.length > 0 ? (
              <div className='space-y-2'>
                {task.children.map((subtask) => (
                  <div
                    key={subtask.ID}
                    className='flex items-center gap-3 p-3 bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-800 transition-colors rounded-none'
                  >
                    <input
                      type='checkbox'
                      className='h-4 w-4 rounded-none border-zinc-600 bg-transparent'
                    />
                    <TaskTypeIcon type={subtask.task_type} size='sm' />
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-white truncate'>
                        {subtask.title}
                      </p>
                      <p className='text-xs text-zinc-500'>{new Date().toISOString()}</p>
                    </div>
                    <Badge
                      className={cn(
                        'rounded-none text-xs',
                        PRIORITIES.find((p) => p.value === subtask.)
                          ?.color
                      )}
                    >
                      {subtask.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8'>
                <CheckSquare className='h-12 w-12 text-zinc-600 mx-auto mb-3' />
                <p className='text-zinc-400'>No subtasks yet</p>
              </div>
            )}
            <Button
              variant='outline'
              className='w-full gap-2 bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-none'
            >
              <Plus className='h-4 w-4' />
              Add Subtask
            </Button>
          </TabsContent> */}

					{/* Comments Tab */}
					<TabsContent value="comments" className="flex flex-col h-[calc(100vh-200px)] mt-0">
						<div className="flex-1 overflow-auto p-4 space-y-4">
							{mockComments.map((comment) => (
								<div key={comment.id} className="flex gap-3">
									<img src={comment.avatar || '/placeholder.svg'} alt="" className="h-8 w-8 rounded-full" />
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-1">
											<span className="text-sm font-medium text-white">{comment.author}</span>
											<span className="text-xs text-zinc-500">{comment.timestamp}</span>
										</div>
										<p className="text-sm text-zinc-300">{comment.content}</p>
									</div>
								</div>
							))}
						</div>
						<div className="p-4 border-t border-zinc-800">
							<div className="flex gap-2">
								<Input
									placeholder="Write a comment..."
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
									className="flex-1 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 rounded-none"
								/>
								<Button size="icon" className="bg-blue-600 hover:bg-blue-700 rounded-none">
									<Send className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</TabsContent>

					{/* Activity Tab */}
					<TabsContent value="activity" className="p-4 space-y-4 mt-0">
						<div className="space-y-4">
							{mockActivity.map((item, index) => (
								<div key={item.id} className="flex gap-3">
									<div className="flex flex-col items-center">
										<div className="h-2 w-2 rounded-full bg-zinc-600" />
										{index < mockActivity.length - 1 && <div className="w-px h-full bg-zinc-700 my-1" />}
									</div>
									<div className="flex-1 pb-4">
										<p className="text-sm text-white">{item.action}</p>
										<p className="text-xs text-zinc-500">
											{item.user} - {item.timestamp}
										</p>
									</div>
								</div>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</SheetContent>
		</Sheet>
	)
}
