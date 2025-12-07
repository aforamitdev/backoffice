import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const isCompleted = progress === 100;
  const isNotStarted = progress === 0;

  return (
    <div className='flex items-center gap-2.5 min-w-[120px]'>
      <div className='flex-1 h-1.5 bg-secondary rounded-full overflow-hidden'>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            isCompleted
              ? 'bg-emerald-500'
              : isNotStarted
              ? 'bg-secondary'
              : 'bg-amber-500'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span
        className={cn(
          'text-xs font-medium tabular-nums w-[70px]',
          isNotStarted ? 'text-muted-foreground' : 'text-foreground'
        )}
      >
        {isNotStarted ? 'Not started' : `${progress}% done`}
      </span>
    </div>
  );
}
