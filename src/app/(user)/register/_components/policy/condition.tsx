import CheckBox from '@/components/checkbox';

interface ConditionProps {
  condition: string;
  isAccepted: boolean;
  SetIsAccepted: (isAccepted: boolean) => void;
}

export default function Condition({
  condition,
  isAccepted,
  SetIsAccepted,
}: ConditionProps) {
  return (
    <label
      className="flex items-center gap-2"
      onClick={() => SetIsAccepted(!isAccepted)}
    >
      <CheckBox isChecked={isAccepted} />
      {condition}
    </label>
  );
}
