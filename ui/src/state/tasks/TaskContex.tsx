/* eslint-disable react-refresh/only-export-components */
import type React from 'react'
import { type Dispatch, type ReactNode, useEffect, useReducer } from 'react'
import createCtx from '../ctx'
import reducer, { initialState, type ActionType } from '../reducer'
import { useApiClientContext } from '../ApiContext'
import { useTaskQuery } from './hooks/useTasks'
import { useSetAtom } from 'jotai'
import { taskAtom, taskPriorityAtom, taskStatusAtom, taskTypeAtom } from './task.jotai'
import { useTaskTypeQuery } from './hooks/useTaskType'
import { useTaskStatus } from './hooks/useTaskStatus'
import { usePriority } from './hooks/usePriority'

export const [useTaskContext, TaskProvider] = createCtx<{
	dispatch: Dispatch<ActionType>
}>()

const TaskContextProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
	const api = useApiClientContext()

	const setTaskAtoms = useSetAtom(taskAtom)
	const setTaskType = useSetAtom(taskTypeAtom)
	const setTaskStatus = useSetAtom(taskStatusAtom)
	const setPriority = useSetAtom(taskPriorityAtom)

	const { data: tasks } = useTaskQuery(api)
	const { data: task_type } = useTaskTypeQuery()
	const { data: task_status } = useTaskStatus()
	const { data: task_priority } = usePriority()

	useEffect(() => {
		if (tasks) setTaskAtoms(tasks)
		if (task_type) setTaskType(task_type)
		if (task_status) setTaskStatus(task_status)
		if (task_priority) setPriority(task_priority)
	}, [tasks, task_type, task_status, task_priority])

	const [state, dispatch] = useReducer(reducer, initialState)

	return <TaskProvider value={{ ...state, dispatch }}>{children}</TaskProvider>
}

TaskContextProvider.displayName = 'TaskContext'
export default TaskContextProvider
