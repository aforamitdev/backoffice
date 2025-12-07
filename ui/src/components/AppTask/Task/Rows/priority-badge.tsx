'use client';

import { cn } from '@/lib/utils';
import type { Priorities } from '@/types/task.type';
import { Flag } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priorities;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = {
    LOW: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      icon: 'text-emerald-500',
    },
    HIGH: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      icon: 'text-amber-500',
    },
    NOW: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      icon: 'text-rose-500',
    },
    MEDIUM: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      icon: 'text-rose-500',
    },
  };

  const { bg, text, icon } = config[priority?.name || 'MEDIUM'];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-none',
        bg,
        text
      )}
    >
      <Flag className={cn('w-3 h-3', icon)} />
      {priority?.name || 'MEDIUM'}
    </span>
  );
}
