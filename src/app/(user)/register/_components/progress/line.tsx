import { cn } from '@/lib/utils';

interface LineProps {
  state: 'empty' | 'half' | 'full';
  className?: string;
  startColor: string;
  stopColor: string;
}

export default function Line({
  state,
  className,
  stopColor,
  startColor,
}: LineProps) {
  let bg: string;
  switch (state) {
    case 'empty':
      bg = 'bg-light-gray';
      break;
    case 'half':
      bg = 'bg-gradient-to-r to-light-gray ' + startColor;
      break;
    default:
      bg = 'bg-gradient-to-r ' + startColor + ' ' + stopColor;
  }

  return <div className={cn('h-[3px] min-w-10', bg, className)}></div>;
}
