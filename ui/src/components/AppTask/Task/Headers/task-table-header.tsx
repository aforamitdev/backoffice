import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

type Props = {}

const TaskTableHeader = (props: Props) => {
	return (
		<TableHeader>
			<TableRow className="bg-secondary/50 border-b border-border hover:bg-secondary/50">
				<TableHead className="w-[50px] text-xs font-semibold text-muted-foreground uppercase tracking-wide">
					<input type="checkbox" className="rounded-none border-muted-foreground/30" />
				</TableHead>
				<TableHead className="min-w-[200px] text-xs font-semibold text-muted-foreground uppercase tracking-wide">Task</TableHead>
				<TableHead className="hidden lg:table-cell min-w-[200px] text-xs font-semibold text-muted-foreground uppercase tracking-wide">
					Description
				</TableHead>

				<TableHead className="hidden sm:table-cell w-[120px] text-xs font-semibold text-muted-foreground uppercase tracking-wide">
					Due Date
				</TableHead>
				<TableHead className="w-[100px] text-xs font-semibold text-muted-foreground uppercase tracking-wide">Priority</TableHead>
				<TableHead className="hidden md:table-cell w-[160px] text-xs font-semibold text-muted-foreground uppercase tracking-wide">
					Progress
				</TableHead>
				<TableHead className="w-[50px]"></TableHead>
			</TableRow>
		</TableHeader>
	)
}

export default TaskTableHeader
