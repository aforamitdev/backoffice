import { useAtomValue } from 'jotai';
import { taskAtomWithChild } from '@/state/tasks/task.jotai';
function Dashboard() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Dashboard
        </h1>
        <p className='text-sm text-slate-500 mt-1'>
          Overview of your tasks and progress
        </p>
      </div>

      {/* Stats Cards */}

      {/* Progress Overview */}

      {/* Goals Overview */}
      {/* <Card className='p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-slate-900'>
            Goals Overview
          </h3>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              setCreateModalConfig({ type: 'goal' });
              setIsCreateModalOpen(true);
            }}
          >
            <Plus className='h-4 w-4 mr-2' />
            New Goal
          </Button>
        </div>
        <div className='space-y-3'>
          {tasksTree.length > 0 ? (
            tasksTree.slice(0, 5).map((goal) => {
              const totalMilestoneTasks = goal.children.reduce(
                (sum, milestone) => sum + milestone.children.length,
                0
              );
              const completedMilestoneTasks = goal.children.reduce(
                (sum, milestone) =>
                  sum +
                  milestone.children.filter(
                    (task) =>
                      task.status.status.toLowerCase() === 'complete' ||
                      task.status.status.toLowerCase() === 'closed'
                  ).length,
                0
              );
              const progress =
                totalMilestoneTasks > 0
                  ? Math.round(
                      (completedMilestoneTasks / totalMilestoneTasks) * 100
                    )
                  : 0;

              return (
                <div
                  key={goal.id}
                  className='flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors group'
                >
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                      <Target className='h-4 w-4 text-blue-600 flex-shrink-0' />
                      <h4 className='text-sm font-medium text-slate-900 truncate'>
                        {goal.name}
                      </h4>
                      <Button
                        size='sm'
                        variant='ghost'
                        className='h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity'
                        onClick={() => {
                          setCreateModalConfig({
                            type: 'milestone',
                            parent: goal,
                          });
                          setIsCreateModalOpen(true);
                        }}
                      >
                        <Plus className='h-3 w-3 mr-1' />
                        <span className='text-xs'>Milestone</span>
                      </Button>
                    </div>
                    <p className='text-xs text-slate-500 mt-1 ml-6'>
                      {goal.children.length} milestones •{' '}
                      {completedMilestoneTasks}/{totalMilestoneTasks} tasks
                      completed
                    </p>
                  </div>
                  <div className='flex items-center gap-3 ml-4'>
                    <div className='w-24'>
                      <div className='w-full bg-slate-200 rounded-full h-1.5'>
                        <div
                          className='bg-blue-600 h-1.5 rounded-full'
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <span className='text-sm font-semibold text-slate-700 w-12 text-right'>
                      {progress}%
                    </span>
                    <ChevronRight className='h-4 w-4 text-slate-400' />
                  </div>
                </div>
              );
            })
          ) : (
            <div className='text-center py-8 text-slate-500'>
              <Target className='h-12 w-12 mx-auto mb-3 text-slate-300' />
              <p className='text-sm mb-3'>No goals yet</p>
              <Button
                size='sm'
                onClick={() => {
                  setCreateModalConfig({ type: 'goal' });
                  setIsCreateModalOpen(true);
                }}
              >
                <Plus className='h-4 w-4 mr-2' />
                Create Your First Goal
              </Button>
            </div>
          )}
        </div>
      </Card> */}
    </div>
  );
}

export default Dashboard;
