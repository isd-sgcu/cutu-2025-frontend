import { cn } from '@/lib/utils';
import Line from './line';
import StepWrapper from './stepWrapper';

interface ProgressProps {
  step: number;
  className?: string;
}

export default function Progress({ step, className }: ProgressProps) {
  step = Math.min(3, Math.max(1, step));
  return (
    <div className={cn('flex w-fit -space-x-2', className)}>
      <StepWrapper step={1} isActive={step >= 1} />
      <Line state={step == 1 ? 'half' : 'full'} className="mt-[18px]" />
      <StepWrapper step={2} isActive={step >= 2} />
      <Line
        state={step < 2 ? 'empty' : step == 2 ? 'half' : 'full'}
        className="mt-[18px]"
      />
      <StepWrapper step={3} isActive={step === 3} />
    </div>
  );
}
