import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-blue-500',
        outline: 'border-white/20 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-primary-500',
        ghost: 'border-transparent bg-white/5 text-white placeholder:text-gray-400 focus-visible:ring-primary-500',
      },
      size: {
        default: 'min-h-[80px] px-3 py-2',
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        lg: 'min-h-[120px] px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };