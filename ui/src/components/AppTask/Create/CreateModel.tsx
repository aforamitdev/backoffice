import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  List,
  Circle,
  CalendarIcon,
  Flag,
  Tag,
  MoreHorizontal,
  Sparkles,
  Layout,
  Paperclip,
  MessageCircle,
  ChevronDown,
  X,
  Download,
  Target,
  Milestone,
  ListTodo,
  Box,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import TaskTypeSelector from '@/components/shared/dropdown/task-type-selector';

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TASK_TYPES = [
  { value: 'GOAL', label: 'Goal', icon: Target, color: 'text-violet-500' },
  {
    value: 'MILESTONE',
    label: 'Milestone',
    icon: Milestone,
    color: 'text-amber-500',
  },
  {
    value: 'SUBTASK',
    label: 'Subtask',
    icon: ListTodo,
    color: 'text-blue-500',
  },
  { value: 'UNIT', label: 'Unit', icon: Box, color: 'text-emerald-500' },
];

const PRIORITIES = [
  { value: 'High', label: 'High', color: 'text-red-500 bg-red-500/10' },
  { value: 'Medium', label: 'Medium', color: 'text-amber-500 bg-amber-500/10' },
  { value: 'Low', label: 'Low', color: 'text-emerald-500 bg-emerald-500/10' },
];

const STATUSES = [
  { value: 'todo', label: 'TO DO', color: 'bg-zinc-700' },
  { value: 'ongoing', label: 'IN PROGRESS', color: 'bg-blue-600' },
  { value: 'done', label: 'DONE', color: 'bg-emerald-600' },
];

const LISTS = [
  { value: 'my-tasks', label: 'My Tasks' },
  { value: 'assigned', label: 'Assigned Tasks' },
  { value: 'team', label: 'Team Tasks' },
];

export function CreateTaskModal({ open, onOpenChange }: CreateTaskModalProps) {
  const [activeTab, setActiveTab] = useState('task');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedList, setSelectedList] = useState('my-tasks');
  const [selectedTaskType, setSelectedTaskType] = useState('GOAL');
  const [selectedStatus, setSelectedStatus] = useState('todo');
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [showCustomFields, setShowCustomFields] = useState(false);

  const currentTaskType = TASK_TYPES.find((t) => t.value === selectedTaskType);
  const currentStatus = STATUSES.find((s) => s.value === selectedStatus);
  const currentPriority = PRIORITIES.find((p) => p.value === selectedPriority);
  const currentList = LISTS.find((l) => l.value === selectedList);

  const handleCreateTask = () => {
    console.log({
      taskName,
      description,
      selectedList,
      selectedTaskType,
      selectedStatus,
      selectedPriority,
      selectedDate,
      tags,
    });
    onOpenChange(false);
    setTaskName('');
    setDescription('');
    setSelectedPriority(null);
    setSelectedDate(undefined);
    setTags([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[680px] p-0 gap-0    overflow-hidden rounded-none'>
        {/* Header with tabs */}
        <DialogHeader className='p-0 border-b '>
          <div className='flex items-center justify-between px-4 pt-3'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='bg-transparent h-auto p-0 gap-0 rounded-none'>
                <TabsTrigger
                  value='task'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Task
                </TabsTrigger>
                <TabsTrigger
                  value='doc'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Doc
                </TabsTrigger>
                <TabsTrigger
                  value='reminder'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Reminder
                </TabsTrigger>
                <TabsTrigger
                  value='chat'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value='whiteboard'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Whiteboard
                </TabsTrigger>
                <TabsTrigger
                  value='dashboard'
                  className='px-4 py-2 rounded-none border-b-2 border-transparent '
                >
                  Dashboard
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className='flex items-center gap-2 pb-2'>
              <Button
                variant='ghost'
                size='icon'
                className='h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none'
              >
                <Download className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none'
                onClick={() => onOpenChange(false)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className='p-4 space-y-4'>
          {/* List & Task Type Selectors */}
          <div className='flex items-center gap-2'>
            <TaskTypeSelector
              taskTypes={[{ id: 'asa', name: 'UNIT' }]}
              currentTask={{ id: '', name: 'GOAL' }}
            />
          </div>

          {/* Task Name Input */}
          <Input
            placeholder="Task Name or type '/' for commands"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className='h-12 text-lg text-input'
          />

          {/* Description */}
          <div className='relative'>
            <Textarea
              placeholder='Add description, or write with'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='min-h-[80px] bg-transparent text-input resize-none pr-16 rounded-none'
            />
            <Button
              variant='ghost'
              size='sm'
              className='absolute top-2 right-2 h-7 px-2 gap-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none'
            >
              <Sparkles className='h-3.5 w-3.5' />
              AI
            </Button>
          </div>

          {/* Quick Action Buttons */}
          <div className='flex items-center gap-2 flex-wrap'>
            {/* Status */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'h-8 px-3 gap-2 border-purple-700  hover:bg-zinc-700 rounded-none bg-purple-800',
                    currentStatus?.color
                  )}
                >
                  {currentStatus?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-zinc-800 border-zinc-700 rounded-none'>
                {STATUSES.map((status) => (
                  <DropdownMenuItem
                    key={status.value}
                    onClick={() => setSelectedStatus(status.value)}
                    className='text-zinc-300 focus:bg-zinc-700 focus:text-white rounded-none'
                  >
                    <Circle
                      className={cn('h-3 w-3 mr-2 fill-current', status.color)}
                    />
                    {status.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Assignee */}
            <Button
              variant='outline'
              className='h-8 w-8 p-0 bg-amber-500 border-amber-500 text-white hover:bg-amber-600 hover:border-amber-600 rounded-none text-xs font-semibold'
            >
              AR
            </Button>

            {/* Due Date */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='h-8 px-3 gap-2 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-none'
                >
                  <CalendarIcon className='h-4 w-4' />
                  {selectedDate
                    ? format(selectedDate, 'MMM d, yyyy')
                    : 'Due date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className='w-auto p-0 bg-zinc-800 border-zinc-700 rounded-none'
                align='start'
              >
                <Calendar
                  mode='single'
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className='bg-zinc-800 text-white rounded-none'
                />
              </PopoverContent>
            </Popover>

            {/* Priority */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className={cn(
                    'h-8 px-3 gap-2 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 rounded-none',
                    currentPriority
                      ? currentPriority.color
                      : 'text-zinc-300 hover:text-white'
                  )}
                >
                  <Flag className='h-4 w-4' />
                  {currentPriority?.label || 'Priority'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-zinc-800 border-zinc-700 rounded-none'>
                {PRIORITIES.map((priority) => (
                  <DropdownMenuItem
                    key={priority.value}
                    onClick={() => setSelectedPriority(priority.value)}
                    className={cn(
                      'focus:bg-zinc-700 rounded-none',
                      priority.color
                    )}
                  >
                    <Flag className='h-4 w-4 mr-2' />
                    {priority.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={() => setSelectedPriority(null)}
                  className='text-zinc-400 focus:bg-zinc-700 focus:text-white rounded-none'
                >
                  <X className='h-4 w-4 mr-2' />
                  Clear
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tags */}
            <Button
              variant='outline'
              className='h-8 px-3 gap-2 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-none'
            >
              <Tag className='h-4 w-4' />
              Tags
            </Button>

            {/* More */}
            <Button
              variant='outline'
              size='icon'
              className='h-8 w-8 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-none'
            >
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </div>

          {/* Custom Fields Section */}
          <div className='space-y-3 pt-2'>
            <p className='text-sm text-zinc-500'>Custom Fields</p>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                onClick={() => setShowCustomFields(!showCustomFields)}
                className='h-8 px-3 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-none'
              >
                {showCustomFields ? 'Hide' : 'Show'} custom fields
              </Button>
              <Button
                variant='outline'
                className='h-8 px-3 gap-1 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-none'
              >
                + Create new field
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-between p-4 border-t border-zinc-800 bg-zinc-900/50'>
          <Button
            variant='outline'
            className='h-9 px-4 gap-2 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-none'
          >
            <Layout className='h-4 w-4' />
            Templates
          </Button>

          <div className='flex items-center gap-3'>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none'
            >
              <Paperclip className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              className='h-8 px-2 gap-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none'
            >
              <MessageCircle className='h-4 w-4' />
              <span className='text-sm'>1</span>
            </Button>

            {/* Create Task Button */}
            <div className='flex'>
              <Button
                onClick={handleCreateTask}
                disabled={!taskName.trim()}
                className='h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-none'
              >
                Create Task
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='h-9 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-none border-l border-blue-500'>
                    <ChevronDown className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='bg-zinc-800 border-zinc-700 rounded-none'
                >
                  <DropdownMenuItem className='text-zinc-300 focus:bg-zinc-700 focus:text-white rounded-none'>
                    Create and open
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-zinc-300 focus:bg-zinc-700 focus:text-white rounded-none'>
                    Create and add another
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
