import { Badge } from '@/components/ui/badge';
import React from 'react';

type Props = {
  name: string;
  bg: string;
  fg: string;
};

function Tag({ name, bg, fg }: Props) {
  return (
    <Badge
      variant='outline'
      className='text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border-0 shadow-none'
      style={{ backgroundColor: bg || '#f1f5f9', color: fg || '#475569' }}
    >
      {name}
    </Badge>
  );
}

export default Tag;
