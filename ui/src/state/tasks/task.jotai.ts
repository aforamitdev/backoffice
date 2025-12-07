import { atom } from 'jotai'
import buildTaskTree from "../utils/taskTree"
import type { AppTask } from "@/types/task.type"


export const taskAtom=atom<AppTask[]>([])
export const selectedTaskAtom=atom<AppTask|null>(null)

export const taskAtomWithChild=atom(get=>buildTaskTree(get(taskAtom)))




