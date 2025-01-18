import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DropdownInputProps {
  placeholder: string;
  choices: string[];
  value: string;
  setValue: (value: string) => void;
}

export default function DropdownInput({
  placeholder,
  choices,
  value,
  setValue,
}: DropdownInputProps) {
  function handleOnValueChange(value: string) {
    setValue(value);
  }

  return (
    <Select value={value} onValueChange={handleOnValueChange}>
      <SelectTrigger className="w-full rounded border-dark-gray focus:border-2 focus:border-dark-pink focus:ring-0">
        <SelectValue
          placeholder={
            <div className="text-placeholder-gray">{placeholder}</div>
          }
        />
      </SelectTrigger>
      <SelectContent className="border-dark-gray p-1">
        {choices.map(choice => (
          <SelectItem key={choice} value={choice} className="focus:bg-mid-gray">
            {choice}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
