import Step from './step';

const steps = ['ข้อตกลงและเงื่อนไข', 'กรอกข้อมูล', 'รับตั๋ว'];

interface StepWrapperProps {
  step: number;
  isActive: boolean;
}

export default function StepWrapper({ step, isActive }: StepWrapperProps) {
  return (
    <div className="flex h-full w-14 flex-col items-center">
      <Step step={step} isActive={isActive} />
      <div className="mt-2 flex h-full flex-1 items-center text-center text-sm">
        {steps[step - 1]}
      </div>
    </div>
  );
}
