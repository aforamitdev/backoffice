import type { TimeResponse } from "@/types/time.type";
import { atom } from "jotai";


export const currentTaskAtom=atom<TimeResponse["data"]|null>(null)
