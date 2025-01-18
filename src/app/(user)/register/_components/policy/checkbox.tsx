import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckBoxProps {
  isChecked?: boolean;
  setIsChecked?: (value: boolean) => void;
}

export default function CheckBox({ isChecked, setIsChecked }: CheckBoxProps) {
  return (
    <div
      className={cn(
        'flex h-5 w-5 cursor-pointer items-center justify-center rounded',
        {
          'bg-dark-pink': isChecked,
          'border border-dark-gray': !isChecked,
        },
      )}
      onClick={() => setIsChecked && setIsChecked(!isChecked)}
    >
      {isChecked && <Check className="h-4 w-4 text-white" />}
    </div>
  );
}
