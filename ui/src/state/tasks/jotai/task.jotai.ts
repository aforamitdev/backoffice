import type { AppTask } from "@/types/task.type";
import { atom } from "jotai";


export const taskAtom=atom<AppTask[]>([])