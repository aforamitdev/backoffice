import { useAtomValue } from 'jotai';
import { taskAtom } from '@/state/task.jotai';
import GoalsList from './GoalsList';

function TaskContainer() {
  const tasks = useAtomValue(taskAtom);
  return (
    <div>
      <GoalsList goals={tasks} />
    </div>
  );
}

export default TaskContainer;
