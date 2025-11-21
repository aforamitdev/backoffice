import type { Task } from '@/types/task.type';
import TaskUnit from './units/Tasks';
import { useMemo } from 'react';

type Props = {
  tasks: Task[];
};

function SubTaskList({ tasks }: Props) {
  const sorted = useMemo(() => {
    return tasks.sort((a, b) => a.orderindex - b.orderindex);
  }, [tasks]);
  return (
    <div>
      {sorted?.map((s) => {
        return (
          <>
            <TaskUnit id={s.id} task={s} key={s.id} />
          </>
        );
      })}
    </div>
  );
}

export default SubTaskList;
