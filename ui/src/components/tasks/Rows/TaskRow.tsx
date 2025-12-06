import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Task from './Task';
import { useAtomValue } from 'jotai';
import { taskAtom } from '@/state/tasks/task.jotai';

export function TableDemo() {
  const tasks = useAtomValue(taskAtom);
  return (
    <Table className='border '>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-12'></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <Task
            title={task.title}
            details={task.detail}
            tags={task.tags}
            unitType={task.task_type}
            childs={task.children}
            hasChild={Boolean(task.children?.length)}
            level={1}
          />
        ))}
      </TableBody>
    </Table>
  );
}
