import type { Task } from '@/types/task.type';
import TaskUnit from './units/Tasks';
import { useMemo } from 'react';
import { startTask } from '@/services/clickup/clickip.services';
import { useAtom } from 'jotai';
import { currentTaskAtom } from '@/state/time.jotai';

type Props = {
  tasks: Task[];
};

function SubTaskList({ tasks }: Props) {
  const [current, setCurrentTask] = useAtom(currentTaskAtom);
  const sorted = useMemo(() => {
    return tasks.sort((a, b) => a.orderindex - b.orderindex);
  }, [tasks]);

  const handleStartTask = async (tid: string) => {
    try {
      const response = await startTask({
        workSpaceId: '9016922311',
        tid: tid,
        team_id: tid,
      });
      if (response?.data) {
        setCurrentTask(response.data);
      }
    } catch {
      return new Error('Error starting task');
    }
  };

  return (
    <div>
      {sorted?.map((s) => {
        return (
          <TaskUnit
            id={s.id}
            task={s}
            key={s.id}
            startTaskTime={handleStartTask}
            current={current?.task}
          />
        );
      })}
    </div>
  );
}

export default SubTaskList;
