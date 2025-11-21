import TaskContainer from '@/components/tasks/TaskContainer';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getTasks } from '@/services/clickup/clickip.services';
import { taskAtom } from '@/state/task.jotai';
import { useSetAtom } from 'jotai';
import { useEffect, useEffectEvent } from 'react';

function Home() {
  // const tasks = use(getTasks('901612157845'));
  const setTasks = useSetAtom(taskAtom);

  const getTasksEvent = useEffectEvent(() => {
    return getTasks('901612157845');
  });

  useEffect(() => {
    getTasksEvent()
      .then((res) => {
        console.log(res, 'RES');
        setTasks(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Card className='gap-0 '>
        <div className='border-b'>
          <div>
            <div className='flex justify-between py-2 px-2 text-xs '>
              <div className='font-bold '>
                <Badge variant='secondary' className='bg-blue-500 text-white'>
                  NOW
                </Badge>
              </div>
              <div>0/5</div>
            </div>
          </div>
        </div>
        <div className='mt-2 px-4'>
          <TaskContainer />
        </div>
      </Card>
    </>
  );
}

export default Home;
