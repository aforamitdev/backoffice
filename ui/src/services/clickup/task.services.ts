import axios from 'axios'

import type { AppTask, Priorities, TaskStatus, TaskType } from '@/types/task.type'

export const getAppTask = async (): Promise<AppTask[]> => {
	const response = await axios.get<AppTask[]>('http://127.0.0.1:9000/v1/tasks/1/100')
	return response.data
}

export const getTaskTypes = async (): Promise<TaskType[]> => {
	const response = await axios.get<TaskType[]>('http://127.0.0.1:9000/v1/tasks/types')
	if (response.data) {
		return response.data
	}

	throw new Error('SERVER_ERROR:failed to get task type ')
}

export const getTaskStatus = async (): Promise<TaskStatus[]> => {
	const response = await axios.get<TaskStatus[]>('http://127.0.0.1:9000/v1/tasks/status')
	if (response.data) {
		return response.data
	}

	throw new Error('SERVER_ERROR:failed to get task status ')
}

export const getPriorities = async (): Promise<Priorities[]> => {
	const response = await axios.get<Priorities[]>('http://127.0.0.1:9000/v1/tasks/priorities')
	if (response.data) {
		return response.data
	}

	throw new Error('SERVER_ERROR:failed to get priorities')
}
