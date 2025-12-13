// queries/useUserQuery.ts
import { useQuery } from '@tanstack/react-query'

import { getTaskTypes } from '@/services/clickup/task.services'

export const useTaskTypeQuery = () =>
	useQuery({
		queryKey: ['task_type'],
		queryFn: () => getTaskTypes(),
	})
