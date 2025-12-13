// queries/useUserQuery.ts
import { useQuery } from '@tanstack/react-query'

import { getTaskStatus } from '@/services/clickup/task.services'

export const useTaskStatus = () =>
	useQuery({
		queryKey: ['task_status'],
		queryFn: () => getTaskStatus(),
	})
