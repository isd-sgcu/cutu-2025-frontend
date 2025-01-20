import { cn } from '@/lib/utils';
import { Asterisk } from 'lucide-react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean;
}
export default function Label({
  children,
  className,
  isRequired = false,
  ...props
}: LabelProps) {
  return (
    <label className={cn('relative text-base', className)} {...props}>
      {children}
      {isRequired && (
        <Asterisk className="absolute -right-2 top-0 size-2.5" color="red" />
      )}
    </label>
  );
}
