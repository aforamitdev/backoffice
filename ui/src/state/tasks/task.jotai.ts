import { atom } from 'jotai'
import buildTaskTree from '../utils/taskTree'
import type { AppTask, Priorities, TaskStatus, TaskType } from '@/types/task.type'

export const taskAtom = atom<AppTask[]>([])

export const taskTypeAtom = atom<TaskType[]>([])
export const taskStatusAtom = atom<TaskStatus[]>([])
export const taskPriorityAtom=atom<Priorities[]>([])

export const selectedTaskAtom = atom<AppTask | null>(null)

export const taskAtomWithChild = atom((get) => buildTaskTree(get(taskAtom)))
