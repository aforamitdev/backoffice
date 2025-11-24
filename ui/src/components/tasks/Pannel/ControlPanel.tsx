import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import FilterItem from '../units/FilterItem';
import { Clock, Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { useAtomValue } from 'jotai';
import { currentTaskAtom } from '@/state/time.jotai';

const ControlPanel = () => {
  const task = useAtomValue(currentTaskAtom);
  if (!task) {
    return <></>;
  }
  return (
    <>
      <Card className='p-0 overflow-hidden shadow-sm border-slate-200'>
        <div className='p-6 space-y-6'>
          {/* Top Row */}
          <div className='flex justify-between items-start'>
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold tracking-tight text-slate-900'>
                {task?.task?.name}
              </h1>
              <p className='text-sm text-slate-500'>
                Manage project roadmap and deliverables.
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <Badge
                variant='outline'
                className='pl-1 pr-3 py-1 gap-2 rounded-full bg-slate-50'
              >
                <span className='relative flex h-2 w-2 ml-1'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-2 w-2 bg-red-500'></span>
                </span>
                <span className='font-medium text-slate-700'>Acme, Inc.</span>
                <Separator
                  orientation='vertical'
                  className='h-3 mx-1 w-[1px]'
                />
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/b/b7/Salesforce.com_logo.svg'
                  alt='SF'
                  className='h-3 w-auto opacity-60 grayscale'
                />
              </Badge>
            </div>
          </div>

          {/* Filters */}
          <div className='flex flex-wrap items-center gap-6'>
            <FilterItem label='Type' value='Internal' color='text-purple-600' />
            <FilterItem
              label='Status'
              value='In-Progress'
              icon={<Clock className='w-3 h-3' />}
              color='text-amber-600'
            />
            <FilterItem
              label='Assigned to'
              value='Stella Artois'
              avatar='https://api.dicebear.com/7.x/avataaars/svg?seed=Stella'
            />

            <FilterItem
              label='Priority'
              value='Low'
              icon={<div className='w-2 h-2 bg-green-500 rounded-[1px]' />}
            />

            <div className='ml-auto self-end flex items-center gap-3 pb-1'>
              <div className='flex -space-x-2'>
                <Avatar className='h-8 w-8 border-2 border-white'>
                  <AvatarFallback className='bg-slate-800 text-white text-xs rounded-2xl px-2 py-2'>
                    {task?.user.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Navigation Tabs */}
        {/* <div className='px-6 bg-slate-50/50'>
          <div className='flex items-center gap-6'>
            <button
            
              className={cn(
                'flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-all',
                activeTab === 'tasks'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              )}
            >
              <ListFilter className='w-4 h-4' />
              Tasks
            </button>
            <button
              
              className={cn(
                'flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-all',
                "filds" === 'fields'
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              )}
            >
              <Layout className='w-4 h-4' />
              Custom fields
            </button>
            <button className='flex items-center gap-2 py-4 text-sm font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all'>
              <MessageSquare className='w-4 h-4' />
              Notes
            </button>
          </div>
        </div> */}
      </Card>
    </>
  );
};

export default ControlPanel;
