import { useQuery } from '@tanstack/react-query'

import { getPriorities } from '@/services/clickup/task.services'

export const usePriority = () =>
	useQuery({
		queryKey: ['task_priorities'],
		queryFn: () => getPriorities(),
	})
