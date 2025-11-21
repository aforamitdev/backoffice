import type { Task } from '@/types/task.type';
import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  task: Task;
  id: string;
};
function Task({ task }: Props) {
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
        <div className='text-sm'>as</div>
      </div>
    </div>
  );
}

export default Task;
