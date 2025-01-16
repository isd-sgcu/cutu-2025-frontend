import CheckBox from '@/app/(user)/register/_components/checkbox';
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
  function handlerOnToggle() {
    setValue(!value);
  }

  return (
    <label className="flex items-center gap-2" onClick={handlerOnToggle}>
      <CheckBox isChecked={value} />
      <Label isRequired={isRequired} text={label} />
    </label>
  );
}
