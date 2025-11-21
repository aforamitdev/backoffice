import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

type Props = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  avatar?: string;
  color?: string;
};

const FilterItem = ({ label, value, icon, color, avatar }: Props) => {
  return (
    <div className='flex flex-col gap-1.5'>
      <span className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider'>
        {label}
      </span>
      <Button
        variant='outline'
        size='sm'
        className='h-8 justify-start font-normal text-slate-600 bg-transparent border-dashed border-slate-300 hover:bg-slate-50 hover:border-slate-400 px-2.5 rounded-none'
      >
        {avatar && (
          <Avatar className='h-4 w-4 mr-2'>
            <AvatarImage src={avatar} />
          </Avatar>
        )}
        {icon && <span className={cn('mr-2', color)}>{icon}</span>}
        {value}
        <ChevronDown className='ml-auto h-3 w-3 opacity-50' />
      </Button>
    </div>
  );
};

export default FilterItem;
