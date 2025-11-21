import type { Task } from "@/types/task.type"
import { atom } from 'jotai'


export const taskAtom=atom<Task[]>([])