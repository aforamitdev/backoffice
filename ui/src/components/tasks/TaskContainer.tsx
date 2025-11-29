import { useAtomValue } from 'jotai';
import { taskAtomWithChild } from '@/state/task.jotai';
import GoalsList from './GoalsList';

function TaskContainer() {
  const tasks = useAtomValue(taskAtomWithChild);
  return (
    <div>
      <GoalsList goals={tasks} />
    </div>
  );
}

export default TaskContainer;
