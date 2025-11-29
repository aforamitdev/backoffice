import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useAtomValue, useSetAtom } from 'jotai';
import { taskAtom } from '@/state/task.jotai';
import { useState, useMemo } from 'react';
import { CheckSquare, Plus, Zap, Calendar, Trash2 } from 'lucide-react';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import type { Task } from '@/types/task.type';

function SimpleTasksPage() {
  const allTasks = useAtomValue(taskAtom);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter tasks with 'quick-task' tag (simple tasks)
  const simpleTasks = useMemo(() => {
    return allTasks.filter(task =>
      task.tags.some(tag => tag.name.toLowerCase() === 'quick-task')
    );
  }, [allTasks]);

  const stats = useMemo(() => {
    const completed = simpleTasks.filter(task =>
      task.status.status.toLowerCase() === 'complete' ||
      task.status.status.toLowerCase() === 'closed'
    ).length;

    return {
      total: simpleTasks.length,
      completed,
      pending: simpleTasks.length - completed,
    };
  }, [simpleTasks]);

  return (
    <div className='space-y-6'>
      <div className="flex items-center justify-between">
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3'>
            <Zap className="h-8 w-8 text-emerald-600" />
            Quick Tasks
          </h1>
          <p className='text-sm text-slate-500 mt-1'>
            Simple tasks without hierarchy - get things done fast!
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Quick Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">Total Tasks</p>
              <p className="text-3xl font-bold text-emerald-900 mt-2">
                {stats.total}
              </p>
            </div>
            <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <Zap className="h-7 w-7 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Completed</p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {stats.completed}
              </p>
            </div>
            <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
              <CheckSquare className="h-7 w-7 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700">Pending</p>
              <p className="text-3xl font-bold text-orange-900 mt-2">
                {stats.pending}
              </p>
            </div>
            <div className="h-14 w-14 rounded-full bg-orange-100 flex items-center justify-center">
              <Calendar className="h-7 w-7 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tasks List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">All Quick Tasks</h3>

        {simpleTasks.length > 0 ? (
          <div className="space-y-2">
            {simpleTasks.map((task) => {
              const isCompleted =
                task.status.status.toLowerCase() === 'complete' ||
                task.status.status.toLowerCase() === 'closed';

              return (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all group"
                >
                  <Checkbox id={task.id} checked={isCompleted} />

                  <div className="flex-1 min-w-0">
                    <Label
                      htmlFor={task.id}
                      className={`text-base font-medium cursor-pointer ${
                        isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.name}
                    </Label>
                    {task.text_content && (
                      <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                        {task.text_content}
                      </p>
                    )}
                  </div>

                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: task.status.color + '20',
                      color: task.status.color,
                      borderColor: task.status.color,
                    }}
                  >
                    {task.status.status}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No quick tasks yet
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
              Quick tasks are perfect for standalone items that don't need to be part of a larger goal or project.
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Quick Task
            </Button>
          </div>
        )}
      </Card>

      <CreateTaskModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        defaultType="simple"
      />
    </div>
  );
}

export default SimpleTasksPage;
