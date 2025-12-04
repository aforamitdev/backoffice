import { memo } from 'react';
import { cn } from '@/lib/utils';

import type { AppTask } from '@/types/task.type';

type Props = {
  task: AppTask[];
  id: string;
  startTaskTime: (taskid: string, wid: string) => void;
  current?: AppTask;
};

const Task = memo(({ task, startTaskTime, current }: Props) => {
  // const tags = useMemo(() => {
  //   return task.tags.map((t) => t.name);
  // }, [task]);

  return (
    <div
      className={cn('border-t py-3 px-2 pl-12', {
        'text-muted': false,
      })}
    >
      {/* <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <Checkbox id={task.id} />
          <Label htmlFor={task.id}>{task.name}</Label>
        </div>

        {current?.id !== task.id ? (
          <button
            className='text-sm flex items-center cursor-pointer bg-transparent border-0 p-1 hover:opacity-80'
            onClick={() => startTaskTime(task.id, task.space.id)}
            aria-label={`Start task: ${task.name}`}
            type='button'
          >
            <Play size={15} className='text-green-500' aria-hidden='true' />
          </button>
        ) : (
          <button
            className='text-sm flex items-center cursor-pointer bg-transparent border-0 p-1 hover:opacity-80'
            onClick={() => startTaskTime(task.id, task.space.id)}
            aria-label={`Stop task: ${task.name}`}
            type='button'
          >
            <StopCircle size={15} className='text-red-500' aria-hidden='true' />
          </button>
        )}
      </div> */}
    </div>
  );
});

Task.displayName = 'Task';

export default Task;
