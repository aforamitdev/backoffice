import { useAtomValue } from 'jotai';
import { taskAtomWithChild } from '@/state/tasks/task.jotai';
import GoalsList from './GoalsList';
import { taskAtom } from '@/state/tasks/jotai/task.jotai';

function TaskContainer() {
  const tasks = useAtomValue(taskAtom);
  return (
    <div>
      {JSON.stringify(tasks)}
      {/* <GoalsList goals={tasks} /> */}
    </div>
  );
}

export default TaskContainer;
