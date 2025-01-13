import { Asterisk } from 'lucide-react';

interface LabelProps {
  isRequired?: boolean;
  text: string;
}

export default function Label({ isRequired = false, text }: LabelProps) {
  return (
    <span className="relative">
      {text}
      {isRequired && (
        <Asterisk className="absolute -right-2 top-0 size-2.5" color="red" />
      )}
    </span>
  );
}
