import type { Task } from '@/types/task.type';
import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Play, StopCircle } from 'lucide-react';

type Props = {
  task: Task;
  id: string;
  startTaskTime: (taskid: string, wid: string) => void;
  current?: any;
};
function Task({ task, startTaskTime, current }: Props) {
  const tags = useMemo(() => {
    return task.tags.map((t) => t.name);
  }, [task]);

  return (
    <div
      className={cn('border-t py-3 px-2 pl-12', {
        'text-muted': !tags.includes('now'),
      })}
    >
      <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <Checkbox id={task.id} />
          <Label htmlFor={task.id}>{task.name}</Label>
        </div>

        {current?.id !== task.id ? (
          <div
            className='text-sm flex  items-center cursor-pointer'
            onClick={() => startTaskTime(task.id, task.space.id)}
          >
            <Play size={15} className='text-green-500 ' />
          </div>
        ) : (
          <div
            className='text-sm flex  items-center cursor-pointer'
            onClick={() => startTaskTime(task.id, task.space.id)}
          >
            <StopCircle size={15} className='text-red-500 ' />
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
