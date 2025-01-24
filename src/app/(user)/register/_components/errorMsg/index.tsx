import { cn } from '@/lib/utils';
import React, { ComponentPropsWithoutRef } from 'react';

export function ErrorMsgFloat({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'p'>) {
  return (
    <ErrorMsg
      className={cn('absolute right-0 text-right', className)}
      {...props}
    >
      {children}
    </ErrorMsg>
  );
}

export function ErrorMsg({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'p'>) {
  return (
    <p className={cn('text-sm text-red-500', className)} {...props}>
      {children}
    </p>
  );
}
