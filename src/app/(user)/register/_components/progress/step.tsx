import { cn } from '@/lib/utils';

interface StepProps {
  step: number;
  isActive: boolean;
  bgColor: string;
}

export default function Step({ step, isActive, bgColor }: StepProps) {
  return (
    <div
      className={cn(
        `flex size-10 items-center justify-center rounded-full bg-light-gray text-xl font-[700] ${isActive && 'text-white ' + bgColor}`,
      )}
    >
      {step}
    </div>
  );
}
