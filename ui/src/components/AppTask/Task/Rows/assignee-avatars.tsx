'use client'

interface AssigneeAvatarsProps {
	assignees: string[]
}

export function AssigneeAvatars({ assignees }: AssigneeAvatarsProps) {
	const maxDisplay = 3
	const display = assignees.slice(0, maxDisplay)
	const overflow = assignees.length - maxDisplay

	return (
		<div className="flex items-center">
			<div className="flex -space-x-2">
				{display.map((avatar, index) => (
					<div
						key={index}
						className="relative h-7 w-7 rounded-full ring-2 ring-card overflow-hidden transition-transform hover:scale-110 hover:z-10"
					>
						<img
							src={avatar || '/placeholder.svg?height=28&width=28&query=avatar'}
							alt={`Assignee ${index + 1}`}
							className="w-full h-full object-cover"
						/>
					</div>
				))}
			</div>
			{overflow > 0 && (
				<div className="ml-1 h-7 min-w-7 px-1.5 flex items-center justify-center rounded-full bg-secondary text-xs font-semibold text-muted-foreground">
					+{overflow}
				</div>
			)}
		</div>
	)
}
