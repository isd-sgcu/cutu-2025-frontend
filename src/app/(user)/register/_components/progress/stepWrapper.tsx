import { cn } from '@/lib/utils';
import Step from './step';

const steps = ['ข้อตกลงและเงื่อนไข', 'กรอกข้อมูล', 'รับตั๋ว'];

interface StepWrapperProps {
  step: number;
  isActive: boolean;
  bgColor: string;
}

export default function StepWrapper({
  step,
  isActive,
  bgColor,
}: StepWrapperProps) {
  return (
    <div className={cn('flex h-full w-14 flex-col items-center')}>
      <Step step={step} isActive={isActive} bgColor={bgColor} />
      <div className="mt-2 flex h-full flex-1 items-center text-center text-sm">
        {steps[step - 1]}
      </div>
    </div>
  );
}
