import TaskContainer from '@/components/tasks/TaskContainer';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

function Home() {
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
