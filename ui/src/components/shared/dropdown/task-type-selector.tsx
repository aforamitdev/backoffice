import type { TaskType } from '@/types/task.type';

import { Box, ListTodo, Milestone, Target } from 'lucide-react';

import { useMemo } from 'react';
import DropDown from './dropdown';

type Props = {
  taskTypes: TaskType[];
  currentTask: TaskType;
};

const TASK_TYPES = [
  { value: 'GOAL', label: 'Goal', icon: Target, color: 'text-violet-500' },
  {
    value: 'MILESTONE',
    label: 'Milestone',
    icon: Milestone,
    color: 'text-amber-500',
  },
  {
    value: 'SUBTASK',
    label: 'Subtask',
    icon: ListTodo,
    color: 'text-blue-500',
  },
  { value: 'UNIT', label: 'Unit', icon: Box, color: 'text-emerald-500' },
];

const TaskTypeSelector = ({ taskTypes, currentTask }: Props) => {
  const taskSelected = useMemo(() => {
    const type = TASK_TYPES.find((t) => t.value === currentTask.name);
    return type;
  }, [currentTask]);

  return (
    <DropDown drops={TASK_TYPES} current={taskSelected} setCurrent={() => {}} />
  );
};

export default TaskTypeSelector;
