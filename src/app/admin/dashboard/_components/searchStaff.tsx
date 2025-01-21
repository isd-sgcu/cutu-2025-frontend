import TextInput from '@/app/(user)/register/_components/textInput';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react';

export default function SearchStaff({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <div className="relative flex items-center px-6 py-4">
      <TextInput
        className={cn(
          'rounded-full border-light-gray shadow-none placeholder:text-dark-gray',
          className,
        )}
        placeholder="searching staff"
        {...props}
      />
      <Search className="absolute right-10 text-dark-gray" />
    </div>
  );
}
