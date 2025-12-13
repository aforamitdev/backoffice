import React, { useMemo, type Dispatch, type SetStateAction } from 'react'
import type { FC } from 'react'

import { CheckCircle, Circle, Pause, XCircle } from 'lucide-react'

import DropDown from './dropdown'
import type { TaskStatus } from '@/types/task.type'

type Props = {
	taskStatuses: TaskStatus[] // backend list: [{id, name}, ...]
	currentStatus: TaskStatus | null
	setTaskStatus: Dispatch<SetStateAction<TaskStatus | null>>
}

const LABELS: Record<string, string> = {
	OPEN: 'Open',
	IN_PROGRESS: 'In Progress',
	DONE: 'Done',
	CLOSED: 'Closed',
}

const ICONS: Record<string, any> = {
	OPEN: Circle,
	IN_PROGRESS: Pause,
	DONE: CheckCircle,
	CLOSED: XCircle,
}

const COLORS: Record<string, string> = {
	OPEN: 'text-emerald-500',
	IN_PROGRESS: 'text-amber-500',
	DONE: 'text-violet-500',
	CLOSED: 'text-red-500',
}

const toTitle = (s: string) => {
	return s
		.toLowerCase()
		.split(/_|\s+/)
		.map((w) => w[0]?.toUpperCase() + w.slice(1))
		.join(' ')
}

const mapBackendStatuses = (types: TaskStatus[]) => {
	return types.map((t) => ({
		value: t.name,
		id: t.id,
		label: LABELS[t.name] ?? toTitle(t.name),
		icon: ICONS[t.name] ?? Circle,
		color: COLORS[t.name] ?? 'text-slate-500',
	}))
}

const TaskStatusSelector: FC<Props> = ({ taskStatuses, currentStatus, setTaskStatus }) => {
	const mapped = useMemo(() => mapBackendStatuses(taskStatuses || []), [taskStatuses])

	const statusSelected = useMemo(() => {
		return mapped.find((s) => s.id === currentStatus?.id || s.value === currentStatus?.name)
	}, [mapped, currentStatus])

	const handleSelect = (value: string) => {
		const st = taskStatuses.find((s) => s.id === value)
		if (st) {
			setTaskStatus(st as unknown as TaskStatus)
		}
	}

	return <DropDown drops={mapped} current={statusSelected} setCurrent={(val) => handleSelect(val)} placeholder="Select Status" />
}

export default TaskStatusSelector
