import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React from 'react';

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  return (
    <Input
      className={cn(
        'rounded border border-dark-gray focus-visible:border-2 focus-visible:border-dark-pink focus-visible:ring-0',
        className,
      )}
      type={type}
      ref={ref}
      {...props}
    />
  );
});

TextInput.displayName = 'Input';

export default TextInput;
