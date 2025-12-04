import type { AppTask } from "@/types/task.type";
import type {  AxiosInstance } from "axios";


export const getAppTasks=async(api:AxiosInstance,params:{size:number,page:number}):Promise<AppTask[]>=>{

	const response=await api.get<AppTask[]>("/v1/tasks/1/1")
	return response.data

}