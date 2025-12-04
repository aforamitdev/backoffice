// queries/useUserQuery.ts
import { useQuery } from "@tanstack/react-query"
import type { AxiosInstance } from "axios"
import { getAppTasks } from "../services.task"

export const useTaskQuery = (api:AxiosInstance) =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: ()=>getAppTasks(api,{size:1,page:122}),
  })
