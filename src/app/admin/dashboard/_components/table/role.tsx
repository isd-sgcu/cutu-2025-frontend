import { cn } from '@/lib/utils';
import React from 'react';

interface RoleProps extends React.ComponentPropsWithoutRef<'div'> {
  role: 'admin' | 'staff';
}

export default function Role({ className, role, ...props }: RoleProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-16 items-center justify-center rounded-none py-0 text-white',
        className,
        {
          'bg-dark-blue': role == 'admin',
          'bg-dark-pink': role == 'staff',
        },
      )}
      {...props}
    >
      {role}
    </div>
  );
}
