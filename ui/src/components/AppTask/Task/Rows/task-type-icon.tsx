import type React from 'react';
import { Target, Flag, ListTodo, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TaskType } from '@/types/task.type';

export type TaskTypeString =
  | 'GOAL'
  | 'MILESTONE'
  | 'SUBTASK'
  | 'UNIT'
  | 'TASK'
  | 'ITEM';

interface TaskTypeIconProps {
  type: TaskType;
  size?: 'sm' | 'md';
  className?: string;
}

const taskTypeConfig: Record<
  TaskTypeString,
  { icon: React.ElementType; color: string; bgColor: string; label: string }
> = {
  GOAL: {
    icon: Target,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 ring-1 ring-violet-100',
    label: 'Goal',
  },
  MILESTONE: {
    icon: Flag,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 ring-1 ring-amber-100',
    label: 'Milestone',
  },
  SUBTASK: {
    icon: ListTodo,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50 ring-1 ring-sky-100',
    label: 'Subtask',
  },
  UNIT: {
    icon: Box,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 ring-1 ring-emerald-100',
    label: 'Unit',
  },
  ITEM: {
    icon: Box,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 ring-1 ring-emerald-100',
    label: 'Unit',
  },
  TASK: {
    icon: Box,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 ring-1 ring-emerald-100',
    label: 'Unit',
  },
};

export function TaskTypeIcon({
  type,
  size = 'md',
  className = '',
}: TaskTypeIconProps) {
  const config = taskTypeConfig[type?.name];
  const Icon = config?.icon;

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-0  transition-all',
        config?.bgColor,
        size === 'sm' ? 'w-4 h-4' : 'w-5 h-5',
        className
      )}
      title={config?.label}
    >
      <Icon
        className={cn(config?.color, size === 'sm' ? 'w-3 h-3' : 'w-3 h-3')}
        strokeWidth={2}
      />
    </div>
  );
}
