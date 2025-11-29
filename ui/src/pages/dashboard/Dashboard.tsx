import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAtomValue } from 'jotai';
import { taskAtomWithChild } from '@/state/task.jotai';
import { currentTaskAtom } from '@/state/time.jotai';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Target,
  Plus,
  ChevronRight,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import type { Task } from '@/types/task.type';

function Dashboard() {
  const tasksTree = useAtomValue(taskAtomWithChild);
  const currentTask = useAtomValue(currentTaskAtom);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalConfig, setCreateModalConfig] = useState<{
    type?: 'goal' | 'milestone' | 'task' | 'subtask';
    parent?: Task;
  }>({});

  const stats = useMemo(() => {
    const allTasks = tasksTree.flatMap((goal) =>
      goal.children.flatMap((milestone) => milestone.children)
    );

    const completedTasks = allTasks.filter(
      (task) =>
        task.status.status.toLowerCase() === 'complete' ||
        task.status.status.toLowerCase() === 'closed'
    );

    const inProgressTasks = allTasks.filter(
      (task) => task.status.status.toLowerCase() === 'in progress'
    );

    return {
      totalGoals: tasksTree.length,
      totalTasks: allTasks.length,
      completedTasks: completedTasks.length,
      inProgressTasks: inProgressTasks.length,
      completionRate:
        allTasks.length > 0
          ? Math.round((completedTasks.length / allTasks.length) * 100)
          : 0,
    };
  }, [tasksTree]);

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
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-500'>Total Goals</p>
              <p className='text-2xl font-bold text-slate-900 mt-2'>
                {stats.totalGoals}
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center'>
              <Target className='h-6 w-6 text-blue-600' />
            </div>
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-500'>Total Tasks</p>
              <p className='text-2xl font-bold text-slate-900 mt-2'>
                {stats.totalTasks}
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center'>
              <BarChart3 className='h-6 w-6 text-purple-600' />
            </div>
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-500'>Completed</p>
              <p className='text-2xl font-bold text-slate-900 mt-2'>
                {stats.completedTasks}
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-green-100 flex items-center justify-center'>
              <CheckCircle2 className='h-6 w-6 text-green-600' />
            </div>
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-slate-500'>In Progress</p>
              <p className='text-2xl font-bold text-slate-900 mt-2'>
                {stats.inProgressTasks}
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center'>
              <Clock className='h-6 w-6 text-amber-600' />
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Overview */}
      <div className='grid gap-4 md:grid-cols-2'>
        <Card className='p-6'>
          <h3 className='text-lg font-semibold text-slate-900 mb-4'>
            Completion Progress
          </h3>
          <div className='space-y-4'>
            <div>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium text-slate-700'>
                  Overall Completion
                </span>
                <span className='text-sm font-bold text-slate-900'>
                  {stats.completionRate}%
                </span>
              </div>
              <div className='w-full bg-slate-200 rounded-full h-2'>
                <div
                  className='bg-green-600 h-2 rounded-full transition-all duration-500'
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 pt-4'>
              <div>
                <p className='text-xs text-slate-500'>Completed</p>
                <p className='text-lg font-bold text-green-600'>
                  {stats.completedTasks}
                </p>
              </div>
              <div>
                <p className='text-xs text-slate-500'>Remaining</p>
                <p className='text-lg font-bold text-slate-600'>
                  {stats.totalTasks - stats.completedTasks}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Current Task */}
        <Card className='p-6'>
          <h3 className='text-lg font-semibold text-slate-900 mb-4'>
            Current Task
          </h3>
          {currentTask?.task ? (
            <div className='space-y-4'>
              <div className='flex items-start gap-3'>
                <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0'>
                  <Clock className='h-5 w-5 text-blue-600' />
                </div>
                <div className='flex-1 min-w-0'>
                  <h4 className='text-sm font-semibold text-slate-900 truncate'>
                    {currentTask.task.name}
                  </h4>
                  <p className='text-xs text-slate-500 mt-1'>
                    {currentTask.task.text_content || 'No description'}
                  </p>
                  <div className='flex gap-2 mt-3'>
                    <Badge
                      variant='outline'
                      style={{
                        backgroundColor: currentTask.task.status.color + '20',
                        color: currentTask.task.status.color,
                        borderColor: currentTask.task.status.color,
                      }}
                    >
                      {currentTask.task.status.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-8 text-center'>
              <div className='h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3'>
                <Clock className='h-6 w-6 text-slate-400' />
              </div>
              <p className='text-sm text-slate-500'>No task currently active</p>
              <p className='text-xs text-slate-400 mt-1'>
                Start a task to track your time
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Goals Overview */}
      <Card className='p-6'>
        <div className="flex items-center justify-between mb-4">
          <h3 className='text-lg font-semibold text-slate-900'>
            Goals Overview
          </h3>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setCreateModalConfig({ type: 'goal' });
              setIsCreateModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
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
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <h4 className='text-sm font-medium text-slate-900 truncate'>
                        {goal.name}
                      </h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          setCreateModalConfig({ type: 'milestone', parent: goal });
                          setIsCreateModalOpen(true);
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        <span className="text-xs">Milestone</span>
                      </Button>
                    </div>
                    <p className='text-xs text-slate-500 mt-1 ml-6'>
                      {goal.children.length} milestones • {completedMilestoneTasks}/{totalMilestoneTasks} tasks completed
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
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className='text-center py-8 text-slate-500'>
              <Target className="h-12 w-12 mx-auto mb-3 text-slate-300" />
              <p className='text-sm mb-3'>No goals yet</p>
              <Button
                size="sm"
                onClick={() => {
                  setCreateModalConfig({ type: 'goal' });
                  setIsCreateModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Goal
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Create Task Modal */}
      <CreateTaskModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        defaultType={createModalConfig.type}
        parentTask={createModalConfig.parent}
      />
    </div>
  );
}

export default Dashboard;
