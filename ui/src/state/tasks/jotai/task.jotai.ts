import { atom } from 'jotai'

import type { AppTask } from '@/types/task.type'

export const taskAtom = atom<AppTask[]>([])
