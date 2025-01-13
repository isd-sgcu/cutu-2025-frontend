import { Input } from '@/components/ui/input';

interface TextInputProps {
  value: string;
  setValue: (val: string) => void;
}

export default function TextInput({ value, setValue }: TextInputProps) {
  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      className="focus-visible:border-dark-pink focus-visible:border-2 focus-visible:ring-0 border border-dark-gray rounded"
    />
  );
}
