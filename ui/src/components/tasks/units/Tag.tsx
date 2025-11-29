import { Badge } from '@/components/ui/badge';
import { memo } from 'react';

type TagProps = {
  name: string;
  bg: string;
  fg: string;
};

const Tag = memo(({ name, bg, fg }: TagProps) => {
  return (
    <Badge
      variant='outline'
      className='text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border-0 shadow-none'
      style={{ backgroundColor: bg || '#f1f5f9', color: fg || '#475569' }}
    >
      {name}
    </Badge>
  );
});

Tag.displayName = 'Tag';

export default Tag;
