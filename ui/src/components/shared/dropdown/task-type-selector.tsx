import type { TaskType } from '@/types/task.type'

import { Box, ListTodo, Milestone, Target } from 'lucide-react'

import { useMemo, type Dispatch, type SetStateAction } from 'react'
import DropDown from './dropdown'

type Props = {
	taskTypes: TaskType[]
	currentTask: TaskType | null
	setTaskType: Dispatch<SetStateAction<TaskType | null>>
}

const LABELS: Record<string, string> = {
	GOAL: 'Goal',
	MILESTONE: 'Milestone',
	SUBTASK: 'Subtask',
	TASK: 'Task',
	UNIT: 'Unit',
	ITEM: 'Item',
}

const ICONS: Record<string, any> = {
	GOAL: Target,
	MILESTONE: Milestone,
	SUBTASK: ListTodo,
	TASK: ListTodo,
	UNIT: Box,
	ITEM: Box,
}

const COLORS: Record<string, string> = {
	GOAL: 'text-violet-500',
	MILESTONE: 'text-amber-500',
	SUBTASK: 'text-blue-500',
	TASK: 'text-emerald-500',
	UNIT: 'text-emerald-500',
	ITEM: 'text-slate-500',
}

const toTitle = (s: string) => {
	return s
		.toLowerCase()
		.split(/_|\s+/)
		.map((w) => w[0]?.toUpperCase() + w.slice(1))
		.join(' ')
}

const mapBackendTypes = (types: TaskType[]) => {
	return types.map((t) => ({
		value: t.name,
		id: t.id,
		label: LABELS[t.name] ?? toTitle(t.name),
		icon: ICONS[t.name] ?? ListTodo,
		color: COLORS[t.name] ?? 'text-slate-500',
	}))
}

const TaskTypeSelector = ({ taskTypes, currentTask, setTaskType }: Props) => {
	const mapped = useMemo(() => mapBackendTypes(taskTypes || []), [taskTypes])

	const taskSelected = useMemo(() => {
		return mapped.find((t) => t.id === currentTask?.id)
	}, [mapped, currentTask])

	const handleSelect = (value: string) => {
		const task = taskTypes.find((s) => s.id === value)
		if (task) {
			setTaskType(task)
		}
	}

	return <DropDown drops={mapped} current={taskSelected} setCurrent={(val) => handleSelect(val)} placeholder="Select Task Type" />
}

export default TaskTypeSelector
