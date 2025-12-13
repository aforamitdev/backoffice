import { useAtomValue } from 'jotai'
import { taskAtom } from '@/state/tasks/task.jotai'
import type { AppTask } from '@/types/task.type'
import { Button } from '@/components/ui/button'
import { ClipboardList, Loader2, Plus, ShieldAlertIcon } from 'lucide-react'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import TaskTableHeader from '@/components/AppTask/Task/Headers/task-table-header'
import { TaskRow } from '@/components/AppTask/Task/task-row'

interface TasksSectionProps {
	title: string
	subtitle?: string
	tasks: AppTask[]
	taskCount: number
	activeView: 'list' | 'kanban' | 'calendar' | 'gantt'
	setActiveView: (view: 'list' | 'kanban' | 'calendar' | 'gantt') => void
	icon?: 'todo' | 'ongoing'
}

export function TableDemo() {
	const tasks = useAtomValue(taskAtom)
	return (
		<>
			<div className="flex w-full  flex-col ">
				<Item variant="default">
					<ItemMedia variant="icon" className="rounded-0">
						<ClipboardList className="rounded-0" />
					</ItemMedia>
					<ItemContent>
						<ItemTitle>To Do</ItemTitle>
						<ItemDescription>You have 34 tasks ongoing. Stay focused and complete them on time.</ItemDescription>
					</ItemContent>
					<ItemActions>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 rounded-none text-muted-foreground hover:text-foreground"
							// onClick={() => setCreateTaskOpen(true)}
						>
							<Plus className="w-5 h-5" />
						</Button>
					</ItemActions>
				</Item>
				<div className="bg-card border  rounded-none overflow-hidden mt-2">
					{/* Table Header */}
					<div className="bg-card border border-border rounded-none overflow-hidden shadow-sm">
						<div className="overflow-x-auto">
							<Table>
								<TaskTableHeader />

								<TableBody>
									{tasks.map((task) => (
										<TaskRow key={task.ID} task={task} />
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
