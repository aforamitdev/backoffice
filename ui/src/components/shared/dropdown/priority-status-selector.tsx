import type { TaskPriority } from '@/types/task.type'

import { ArrowDown, Minus, ArrowUp, Zap } from 'lucide-react'
import { useMemo, type Dispatch, type SetStateAction } from 'react'
import DropDown from './dropdown'

type BackendType = { id: string; name: string }

type Props = {
	priorities: BackendType[]
	currentPriority: TaskPriority | null
	setTaskPriority: Dispatch<SetStateAction<TaskPriority | null>>
}

const LABELS: Record<string, string> = {
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: 'High',
	URGENT: 'Urgent',
}

const ICONS: Record<string, any> = {
	LOW: ArrowDown,
	MEDIUM: Minus,
	HIGH: ArrowUp,
	URGENT: Zap,
}

const COLORS: Record<string, string> = {
	LOW: 'text-emerald-500',
	MEDIUM: 'text-amber-500',
	HIGH: 'text-red-500',
	URGENT: 'text-violet-500',
}

const toTitle = (s: string) => {
	return s
		.toLowerCase()
		.split(/_|\s+/)
		.map((w) => w[0]?.toUpperCase() + w.slice(1))
		.join(' ')
}

const mapBackendPriorities = (types: BackendType[]) => {
	return types.map((t) => ({
		value: t.name,
		id: t.id,
		label: LABELS[t.name] ?? toTitle(t.name),
		icon: ICONS[t.name] ?? ArrowDown,
		color: COLORS[t.name] ?? 'text-slate-500',
	}))
}

const PrioritySelector = ({ priorities, currentPriority, setTaskPriority }: Props) => {
	const mapped = useMemo(() => mapBackendPriorities(priorities || []), [priorities])

	const prioritySelected = useMemo(() => {
		return mapped.find((p) => p.id === currentPriority?.id || p.value === currentPriority?.name)
	}, [mapped, currentPriority])

	const handleSelect = (value: string) => {
		const pr = priorities.find((s) => s.id === value)
		if (pr) {
			setTaskPriority(pr as unknown as TaskPriority)
		}
	}

	return <DropDown drops={mapped} current={prioritySelected} setCurrent={(val) => handleSelect(val)} placeholder="Select Priority" />
}

export default PrioritySelector
