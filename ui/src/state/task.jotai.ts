import type { Task } from "@/types/task.type"
import { atom } from 'jotai'
import buildTaskTree from "./utils/taskTree"


export const taskAtom=atom<Task[]>([])

export const taskAtomWithChild=atom(get=>buildTaskTree(get(taskAtom)))




