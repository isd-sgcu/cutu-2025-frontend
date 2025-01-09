import Step from './step';

const steps = ['ข้อตกลงและเงื่อนไข', 'กรอกข้อมูล', 'รับตั๋ว'];

interface StepWrapperProps {
  step: number;
  isActive: boolean;
}

export default function StepWrapper({ step, isActive }: StepWrapperProps) {
  return (
    <div className='w-14 flex flex-col items-center h-full'>
      <Step step={step} isActive={isActive} />
      <div className='text-sm text-center mt-2 flex-1 flex items-center'>{steps[step - 1]}</div>
    </div>
  );
}
