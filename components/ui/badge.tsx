import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary-600 text-white hover:bg-primary-700',
        secondary:
          'border-transparent bg-secondary-700 text-white hover:bg-secondary-600',
        destructive:
          'border-transparent bg-red-600 text-white hover:bg-red-700',
        outline: 'text-gray-300 border-white/20 hover:bg-white/10',
        success:
          'border-transparent bg-green-600 text-white hover:bg-green-700',
        warning:
          'border-transparent bg-yellow-600 text-white hover:bg-yellow-700',
        glass: 'glass border-white/20 text-white hover:bg-white/20',
        gradient:
          'border-transparent bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
