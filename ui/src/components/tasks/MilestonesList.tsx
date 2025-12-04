import { Pyramid } from 'lucide-react';

import type { AppTask } from '@/types/task.type';

type Props = {
  milestones: AppTask[];
};

function MilestonesList({ milestones }: Props) {
  return (
    <div className='bg-white '>
      {milestones.map((s) => {
        // if (!s.children.length) {
        //   return <React.Fragment key={s.id}></React.Fragment>;
        // }

        return (
          <div className='flex  flex-col border-b' key={s.id}>
            <div className='flex items-center pl-8 px-2 py-2'>
              <Pyramid size={16} />
              <div className=' px-2 flex items-center gap-3 text-sm'>
                {/* {s.name} */}
              </div>
            </div>
            <div>{/* <SubTaskList tasks={s.children} /> */}</div>
          </div>
        );
      })}
    </div>
  );
}

export default MilestonesList;
