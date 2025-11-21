import type { Task } from '@/types/task.type';
import MilestonesList from './MilestonesList';
import { Card } from '../ui/card';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

type Props = {
  goals: Task[];
};

const GoalsList = (props: Props) => {
  return (
    <>
      {props.goals.map((g) => (
        <div className='my-2' key={g.id}>
          <Goal goal={g} />
        </div>
      ))}
    </>
  );
};

type GoalProp = {
  goal: Task;
};
const Goal = ({ goal }: GoalProp) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className='overflow-hidden border-slate-200  duration-200 mb-0 gap-2'>
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between px-4 py-3 bg-slate-50/50 border-b border-slate-100 cursor-pointer hover:bg-slate-100/50 transition-colors select-none'
      >
        <div className='flex items-center gap-3'>
          <Button
            variant='ghost'
            size='icon'
            className='h-6 w-6 text-slate-400'
          >
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                isOpen && 'rotate-90'
              )}
            />
          </Button>
          <h3 className='font-semibold text-slate-800 text-sm'>{goal.name}</h3>
          <Badge
            variant='secondary'
            className='text-xs font-normal bg-white border border-slate-200 text-slate-500'
          >
            {goal.children.length} tasks
          </Badge>
        </div>

        <div className='flex items-center gap-3'>
          <div className='h-4 w-4 rounded-full border border-slate-200 flex items-center justify-center bg-white'>
            <div className='h-2 w-2 rounded-full bg-slate-200'></div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='bg-white animate-in slide-in-from-top-2 duration-200'>
          <div className='px-12  text-xs text-slate-500 bg-slate-50/30 border-b border-slate-50 italic flex items-center gap-2'>
            {goal.text_content}
          </div>
          {Boolean(goal.children.length) && (
            <MilestonesList milestones={goal.children} />
          )}
        </div>
      )}
    </Card>
  );
};

export default GoalsList;
