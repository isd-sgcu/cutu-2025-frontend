import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        filled:
          'bg-gradient-to-r from-gradient-pirple to-gradient-pink text-white hover:opacity-80 focus-visible:ring-dark-pink',
        outline: '',
        disabled: 'bg-disabled text-white',
        ghost: 'hover:bg-dark-pink/10',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  inClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      asChild = false,
      inClassName,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return variant == 'outline' ? (
      <button
        className="rounded-full bg-gradient-to-r from-gradient-pirple to-gradient-pink p-1"
        {...props}
      >
        <div
          className={cn(
            'h-full w-full cursor-pointer rounded-full bg-white px-4',
            inClassName,
          )}
        >
          {children}
        </div>
      </button>
    ) : (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
