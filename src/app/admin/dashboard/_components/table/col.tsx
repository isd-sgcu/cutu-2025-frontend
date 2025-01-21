import React from 'react';
import { cn } from '@/lib/utils';

export function Col({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('flex flex-wrap items-center justify-center', className)}
      {...props}
    >
      {children}
    </div>
  );
}
