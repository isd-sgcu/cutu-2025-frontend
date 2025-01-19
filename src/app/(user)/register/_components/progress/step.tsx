import { cn } from '@/lib/utils';

interface StepProps {
  step: number;
  isActive: boolean;
}

export default function Step({ step, isActive }: StepProps) {
  return (
    <div
      className={cn(
        'flex size-10 items-center justify-center rounded-full bg-light-gray text-xl font-[700]',
        {
          'bg-dark-pink text-white': isActive,
        },
      )}
    >
      {step}
    </div>
  );
}
