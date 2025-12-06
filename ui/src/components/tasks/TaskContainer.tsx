import { taskAtom } from '@/state/tasks/task.jotai';
import { useAtomValue } from 'jotai';

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
