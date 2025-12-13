import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

type Drop = {
	value: string
	label: string
	icon: any
	id: string
	color: string
}
type Props = {
	drops: Drop[]
	current?: Drop
	setCurrent: (drop: any) => void
	placeholder: string
}

const DropDown = (props: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="h-8   gap-2 primary-btn rounded-xs ">
					{props.current?.icon && <props.current.icon className={cn('h-4 w-4 mr-2', props.current.color)} />}
					{props.current?.label || props.placeholder}
					<ChevronDown className="h-3 w-3 opacity-50" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="primary-btn rounded-none bg-gray-800" align="start">
				{props.drops.map((type) => (
					<DropdownMenuItem
						key={type.value}
						onClick={() => props.setCurrent(type.id)}
						className="text-zinc-300 focus:bg-cool-steel-600 focus:text-white rounded-xs"
					>
						<type.icon className={cn('h-4 w-4 mr-2', type.color)} />
						{type.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default DropDown
