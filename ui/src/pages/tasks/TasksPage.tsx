import { CreateTaskModal } from '@/components/AppTask/Create/CreateModel';
import { TaskDetailDrawer } from '@/components/AppTask/Details/TaskDetails';
import { TableDemo } from '@/components/tasks/Rows/TaskRow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { selectedTaskAtom } from '@/state/tasks/task.jotai';
import { useAtom } from 'jotai';
import { List, SquareKanban } from 'lucide-react';
import { useState } from 'react';

function TasksPage() {
  const [task, setTask] = useAtom(selectedTaskAtom);
  const [createOpen, setCreateOpen] = useState(true);
  return (
    <div>
      <Tabs defaultValue='account' className='w-full'>
        <TabsList className=' w-full border-b'>
          <div className='flex'>
            <div className='flex items-center'>
              <TabsTrigger value='account'>
                <List className='text-purple-500 size-2.5' />
                The List{' '}
              </TabsTrigger>
            </div>
            <div className='flex items-center'>
              <TabsTrigger value='password'>
                <SquareKanban
                  strokeWidth={2}
                  className='text-purple-500 size-2.5'
                />
                Board
              </TabsTrigger>
            </div>
          </div>
        </TabsList>
        <TabsContent value='account'>
          <div className='mx-3'>
            <TableDemo />
          </div>
        </TabsContent>
      </Tabs>
      <CreateTaskModal open={createOpen} onOpenChange={setCreateOpen} />
      <TaskDetailDrawer open={Boolean(task)} task={task} />
    </div>
  );
}

export default TasksPage;
