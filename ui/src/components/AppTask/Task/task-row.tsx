'use client'

import { useState } from 'react'
import { MoreVertical, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { cn } from '@/lib/utils'
import type { AppTask } from '@/types/task.type'
import { TableCell, TableRow } from '@/components/ui/table'
import { PriorityBadge } from './Rows/priority-badge'
import { TaskTypeIcon } from './Rows/task-type-icon'
import { useSetAtom } from 'jotai'
import { selectedTaskAtom } from '@/state/tasks/task.jotai'

export interface Task {
	id: string
	title: string
	description: string
	assignees: string[]
	dueDate: string
	priority: 'Low' | 'Medium' | 'High'
	progress: number
	status: 'todo' | 'ongoing'
	taskType: AppTask
	subtasks?: Task[]
}

interface TaskRowProps {
	task: AppTask
	isSubtask?: boolean
	depth?: number
	onTaskClick?: (task: Task) => void
}

export function TaskRow({ task, isSubtask = false, depth = 0, onTaskClick }: TaskRowProps) {
	const [isExpanded, setIsExpanded] = useState(false)
	const hasSubtasks = task.children && task.children.length > 0

	const setTask = useSetAtom(selectedTaskAtom)

	const handleRowClick = () => {
		setTask(task)
	}

	return (
		<>
			<TableRow
				onClick={handleRowClick}
				className={cn('transition-colors hover:bg-secondary/50 cursor-pointer border-b border-border', isSubtask && 'bg-secondary/20')}
			>
				<TableCell className="py-3" style={{ paddingLeft: `${8 + depth * 20}px` }}>
					<div className="flex items-center gap-1">
						<Checkbox className="rounded-none" />
						{hasSubtasks ? (
							<button
								onClick={(e) => {
									e.stopPropagation()
									setIsExpanded(!isExpanded)
								}}
								className="p-1 hover:bg-secondary rounded-none transition-colors"
							>
								{isExpanded ? (
									<ChevronDown className="w-4 h-4 text-muted-foreground" />
								) : (
									<ChevronRight className="w-4 h-4 text-muted-foreground" />
								)}
							</button>
						) : (
							<div className="w-6" />
						)}
					</div>
				</TableCell>

				<TableCell className="py-3">
					<div className="flex items-center gap-2.5 min-w-0">
						<TaskTypeIcon type={task.task_type} size={isSubtask ? 'sm' : 'md'} />
						<span
							className={cn(
								'font-medium truncate max-w-[180px] sm:max-w-[220px] lg:max-w-[280px]',
								isSubtask ? 'text-sm text-muted-foreground' : 'text-foreground',
							)}
							title={task.title}
						>
							{task.title}
						</span>
					</div>
				</TableCell>

				<TableCell className="hidden lg:table-cell py-3">
					<p className="text-sm text-muted-foreground truncate max-w-[250px]" title={task.detail}>
						{task.detail}
					</p>
				</TableCell>

				<TableCell className="hidden sm:table-cell py-3">
					<span className="text-sm text-muted-foreground whitespace-nowrap">March 12,2025</span>
				</TableCell>

				<TableCell className="py-3">
					<PriorityBadge priority={task.priorities} />
				</TableCell>

				<TableCell className="hidden md:table-cell py-3">{/* <ProgressBar progress={task.} /> */}as</TableCell>

				<TableCell className="py-3">
					<Button
						variant="ghost"
						size="icon"
						className="h-7 w-7 rounded-none text-muted-foreground hover:text-foreground"
						onClick={(e) => e.stopPropagation()}
					>
						<MoreVertical className="w-4 h-4" />
					</Button>
				</TableCell>
			</TableRow>

			{/* Subtasks */}
			{hasSubtasks &&
				isExpanded &&
				task.children!.map((subtask) => <TaskRow key={subtask.ID} task={subtask} isSubtask={true} depth={depth + 1} onTaskClick={onTaskClick} />)}
		</>
	)
}
