import type { Task } from '@/types/task.type';
import TaskUnit from './units/Tasks';
import { useCallback, useMemo } from 'react';
import { startTask } from '@/services/clickup/clickip.services';
import { useAtom } from 'jotai';
import { currentTaskAtom } from '@/state/time.jotai';
import { CLICKUP_CONFIG } from '@/constants/config';

type Props = {
  tasks: Task[];
};

function SubTaskList({ tasks }: Props) {
  const [current, setCurrentTask] = useAtom(currentTaskAtom);

  const sorted = useMemo(() => {
    return [...tasks].sort((a, b) => a.orderindex - b.orderindex);
  }, [tasks]);

  const handleStartTask = useCallback(async (tid: string) => {
    try {
      const response = await startTask({
        workSpaceId: CLICKUP_CONFIG.DEFAULT_WORKSPACE_ID,
        tid: tid,
        team_id: tid,
      });
      if (response?.data) {
        setCurrentTask(response.data);
      }
    } catch (error) {
      console.error('Error starting task:', error);
      throw new Error('Failed to start task');
    }
  }, [setCurrentTask]);

  return (
    <div>
      {sorted.map((s) => (
        <TaskUnit
          id={s.id}
          task={s}
          key={s.id}
          startTaskTime={handleStartTask}
          current={current?.task}
        />
      ))}
    </div>
  );
}

export default SubTaskList;
