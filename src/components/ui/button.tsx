import React, { JSX } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { buttonVariants } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Button component with various styles and variants
 * @interface ButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 * @extends {VariantProps<typeof buttonVariants>}
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Whether to render as a child component using Radix UI Slot */
  asChild?: boolean;
}

/**
 * A versatile button component that supports various styles and variants
 * @param {ButtonProps} props - The component props
 * @param {React.Ref<HTMLButtonElement>} ref - The forwarded ref
 * @returns {JSX.Element} A button element with the specified styles and variants
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref): JSX.Element => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);

Button.displayName = 'Button';

export { Button };
