import { cn } from '@/lib/utils';

interface LineProps {
  state: 'empty' | 'half' | 'full';
}

export default function Line({ state }: LineProps) {
  return (
    <div
      className={cn('h-[3px] min-w-10', {
        'bg-light-gray': state == 'empty',
        'from-dark-pink to-light-gray bg-gradient-to-r': state == 'half',
        'bg-dark-pink': state == 'full',
      })}
    ></div>
  );
}
