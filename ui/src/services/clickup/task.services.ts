import type { AppTask } from "@/types/task.type"
import axios from "axios"



export const getAppTask=async ():Promise<AppTask[]>=>{
	const response=await axios.get<AppTask[]>("http://127.0.0.1:9000/v1/tasks/1/100")
	return response.data
}