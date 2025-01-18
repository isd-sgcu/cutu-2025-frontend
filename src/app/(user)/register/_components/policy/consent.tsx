import CheckBox from '@/app/(user)/register/_components/policy/checkbox';
import Label from '../label';

interface ConsentProps {
  value: boolean;
  setValue: (isAccepted: boolean) => void;
  label: string;
  isRequired: boolean;
}

export default function Consent({
  value,
  setValue,
  label,
  isRequired,
}: ConsentProps) {
  return (
    <label className="flex items-center gap-2" onClick={() => setValue(!value)}>
      <CheckBox isChecked={value} setIsChecked={setValue} />
      <Label isRequired={isRequired} text={label} />
    </label>
  );
}
