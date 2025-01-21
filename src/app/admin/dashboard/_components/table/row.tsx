import { cn } from '@/lib/utils';
import React from 'react';

export function Row({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'grid grid-flow-col grid-cols-[70px_1fr_70px_70px] py-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
