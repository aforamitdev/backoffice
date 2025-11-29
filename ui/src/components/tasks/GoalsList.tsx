import type { Task } from '@/types/task.type';
import MilestonesList from './MilestonesList';
import { Card } from '../ui/card';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ChevronRight, Plus, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import CreateTaskModal from './CreateTaskModal';

type Props = {
  goals: Task[];
};

const GoalsList = (props: Props) => {
  return (
    <>
      {props.goals?.map((g) => (
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <Card className='overflow-hidden border-slate-200  duration-200 mb-0 gap-2'>
        <div
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-label={`Toggle ${goal.name} details`}
          className='flex items-center justify-between px-4 py-3 bg-slate-50/50 border-b border-slate-100 cursor-pointer hover:bg-slate-100/50 transition-colors select-none'
        >
          <div className='flex items-center gap-3 flex-1'>
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
            <Target className="h-4 w-4 text-blue-600" />
            <h3 className='font-semibold text-slate-800 text-sm'>{goal.name}</h3>
            <Badge
              variant='secondary'
              className='text-xs font-normal bg-white border border-slate-200 text-slate-500'
            >
              {goal.children.length} milestones
            </Badge>
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsCreateModalOpen(true);
            }}
          >
            <Plus className="h-3 w-3 mr-1" />
            <span className="text-xs">Add Milestone</span>
          </Button>
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

      <CreateTaskModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        defaultType="milestone"
        parentTask={goal}
      />
    </>
  );
};

export default GoalsList;
