import { useState, useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  Milestone as MilestoneIcon,
  CheckSquare,
  ChevronRight,
  X,
  Loader2,
} from 'lucide-react';
import { useAtomValue, useSetAtom } from 'jotai';
import { taskAtomWithChild, taskAtom } from '@/state/tasks/task.jotai';
import { CLICKUP_CONFIG } from '@/constants/config';
import type { Task } from '@/types/task.type';

type TaskType = 'simple' | 'goal' | 'milestone' | 'task' | 'subtask';

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultType?: TaskType;
  parentTask?: Task;
}

const taskTypeConfig = {
  simple: {
    label: 'Simple Task',
    icon: CheckSquare,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    description: 'Quick standalone task',
    canHaveChildren: [],
    quickCreate: true,
  },
  goal: {
    label: 'Goal',
    icon: Target,
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    description: 'High-level objective',
    canHaveChildren: ['milestone'],
  },
  milestone: {
    label: 'Milestone',
    icon: MilestoneIcon,
    color: 'bg-purple-100 text-purple-700 border-purple-300',
    description: 'Key checkpoint',
    canHaveChildren: ['task'],
  },
  task: {
    label: 'Task',
    icon: CheckSquare,
    color: 'bg-orange-100 text-orange-700 border-orange-300',
    description: 'Work item in a milestone',
    canHaveChildren: ['subtask'],
  },
  subtask: {
    label: 'Subtask',
    icon: ChevronRight,
    color: 'bg-slate-100 text-slate-700 border-slate-300',
    description: 'Smaller step',
    canHaveChildren: [],
  },
};

function CreateTaskModal({
  open,
  onOpenChange,
  defaultType = 'goal',
  parentTask,
}: CreateTaskModalProps) {
  const [selectedType, setSelectedType] = useState<TaskType>(defaultType);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedParent, setSelectedParent] = useState<Task | null>(
    parentTask || null
  );
  const [showParentSelector, setShowParentSelector] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allTasks = useAtomValue(taskAtomWithChild);
  const setTasks = useSetAtom(taskAtom);

  const availableParents = useMemo(() => {
    const getValidParents = (type: TaskType): Task[] => {
      switch (type) {
        case 'simple':
        case 'goal':
          return [];
        case 'milestone':
          return allTasks;
        case 'task':
          return allTasks.flatMap((goal) => goal.children);
        case 'subtask':
          return allTasks.flatMap((goal) =>
            goal.children.flatMap((milestone) => milestone.children)
          );
        default:
          return [];
      }
    };

    return getValidParents(selectedType);
  }, [selectedType, allTasks]);

  const isSimpleMode = selectedType === 'simple';

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const tags =
          selectedType === 'simple' ? ['quick-task'] : [selectedType];

        // Refresh tasks list
        const { getTasks } = await import(
          '@/services/clickup/clickip.services'
        );
        const updatedTasks = await getTasks(CLICKUP_CONFIG.DEFAULT_LIST_ID);
        setTasks(updatedTasks);

        setTaskName('');
        setDescription('');
        setSelectedParent(null);
        setSelectedType('simple');
        onOpenChange(false);
      } catch (error) {
        console.error('Failed to create task:', error);
        alert('Failed to create task. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      taskName,
      description,
      selectedType,
      selectedParent,
      onOpenChange,
      setTasks,
    ]
  );

  const getParentTypeLabel = (type: TaskType): string => {
    switch (type) {
      case 'milestone':
        return 'Goal';
      case 'task':
        return 'Milestone';
      case 'subtask':
        return 'Task';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Create New Item</DialogTitle>
          <DialogDescription className='text-base'>
            Choose between a quick task or build a structured workflow with
            goals and milestones.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='space-y-6 py-4'>
            {/* Quick Mode Toggle */}
            <div className='flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200'>
              <div className='h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center'>
                <CheckSquare className='h-5 w-5 text-emerald-600' />
              </div>
              <div className='flex-1'>
                <p className='font-semibold text-sm text-slate-900'>
                  Quick Mode
                </p>
                <p className='text-xs text-slate-600'>
                  Create a simple task without hierarchy
                </p>
              </div>
              <Button
                type='button'
                size='sm'
                variant={isSimpleMode ? 'default' : 'outline'}
                onClick={() =>
                  setSelectedType(isSimpleMode ? 'goal' : 'simple')
                }
              >
                {isSimpleMode ? 'Enabled' : 'Enable'}
              </Button>
            </div>

            {/* Type Selection */}
            {!isSimpleMode && (
              <div className='space-y-3'>
                <Label className='text-base'>Task Type</Label>
                <div className='grid grid-cols-2 gap-3'>
                  {(Object.keys(taskTypeConfig) as TaskType[])
                    .filter((type) => type !== 'simple')
                    .map((type) => {
                      const config = taskTypeConfig[type];
                      const Icon = config.icon;

                      return (
                        <button
                          key={type}
                          type='button'
                          onClick={() => setSelectedType(type)}
                          className={`
                          relative flex items-start gap-3 p-4 rounded-xl border-2 transition-all hover:shadow-md
                          ${
                            selectedType === type
                              ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.02]'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }
                        `}
                        >
                          <div
                            className={`
                          h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm
                          ${config.color}
                        `}
                          >
                            <Icon className='h-6 w-6' />
                          </div>
                          <div className='flex-1 text-left'>
                            <p className='font-bold text-sm text-slate-900'>
                              {config.label}
                            </p>
                            <p className='text-xs text-slate-600 mt-1'>
                              {config.description}
                            </p>
                          </div>
                          {selectedType === type && (
                            <div className='absolute top-3 right-3 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center shadow-md'>
                              <CheckSquare className='h-3.5 w-3.5 text-white' />
                            </div>
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Parent Selection */}
            {!isSimpleMode && selectedType !== 'goal' && (
              <div className='space-y-3'>
                <Label>
                  Parent {getParentTypeLabel(selectedType)}{' '}
                  <span className='text-slate-500'>(Optional)</span>
                </Label>
                {selectedParent ? (
                  <div className='flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200'>
                    <Badge variant='outline' className='flex-shrink-0'>
                      {getParentTypeLabel(selectedType)}
                    </Badge>
                    <span className='flex-1 text-sm font-medium truncate'>
                      {selectedParent.name}
                    </span>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => setSelectedParent(null)}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setShowParentSelector(!showParentSelector)}
                    className='w-full justify-start'
                  >
                    Select parent {getParentTypeLabel(selectedType)}
                  </Button>
                )}

                {showParentSelector && !selectedParent && (
                  <div className='max-h-48 overflow-y-auto border border-slate-200 rounded-lg'>
                    {availableParents.length > 0 ? (
                      availableParents.map((parent) => (
                        <button
                          key={parent.id}
                          type='button'
                          onClick={() => {
                            setSelectedParent(parent);
                            setShowParentSelector(false);
                          }}
                          className='w-full text-left px-3 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-b-0'
                        >
                          <p className='text-sm font-medium text-slate-900'>
                            {parent.name}
                          </p>
                          <p className='text-xs text-slate-500 truncate'>
                            {parent.text_content || 'No description'}
                          </p>
                        </button>
                      ))
                    ) : (
                      <div className='p-4 text-center text-sm text-slate-500'>
                        No available{' '}
                        {getParentTypeLabel(selectedType).toLowerCase()}s
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Name Input */}
            <div className='space-y-2'>
              <Label htmlFor='task-name' className='text-base font-semibold'>
                {isSimpleMode ? 'Task' : taskTypeConfig[selectedType].label}{' '}
                Name <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='task-name'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder={
                  isSimpleMode
                    ? 'e.g., Review PR #123'
                    : `Enter ${taskTypeConfig[
                        selectedType
                      ].label.toLowerCase()} name`
                }
                required
                className='text-base h-11'
              />
            </div>

            {/* Description Input */}
            <div className='space-y-2'>
              <Label
                htmlFor='task-description'
                className='text-base font-semibold'
              >
                Description{' '}
                <span className='text-slate-400 font-normal'>(Optional)</span>
              </Label>
              <textarea
                id='task-description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  isSimpleMode
                    ? 'What needs to be done?'
                    : 'Add a description...'
                }
                className='w-full min-h-28 px-4 py-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y'
              />
            </div>

            {/* Hierarchy Preview */}
            {!isSimpleMode && selectedParent && (
              <div className='p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl'>
                <p className='text-xs font-bold text-blue-900 mb-2 uppercase tracking-wide'>
                  📍 Hierarchy Preview
                </p>
                <div className='flex items-center gap-2 text-sm'>
                  <span className='text-slate-700 font-medium'>
                    {selectedParent.name}
                  </span>
                  <ChevronRight className='h-4 w-4 text-slate-400' />
                  <span className='font-bold text-slate-900'>
                    {taskName || `New ${taskTypeConfig[selectedType].label}`}
                  </span>
                </div>
              </div>
            )}

            {/* Simple Mode Info */}
            {isSimpleMode && (
              <div className='p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl'>
                <p className='text-xs font-bold text-emerald-900 mb-1 uppercase tracking-wide'>
                  ⚡ Quick Task
                </p>
                <p className='text-xs text-emerald-700'>
                  This task will be created as a standalone item. You can
                  organize it later!
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={!taskName.trim() || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating...
                </>
              ) : (
                <>
                  Create{' '}
                  {isSimpleMode ? 'Task' : taskTypeConfig[selectedType].label}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskModal;
