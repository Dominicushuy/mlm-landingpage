import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button component with multiple variants
 *
 * @example
 * <Button>Default Button</Button>
 * <Button variant="outline">Outline Button</Button>
 * <Button variant="secondary" size="lg">Large Secondary Button</Button>
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700 shadow",
        destructive: "bg-error-500 text-white hover:bg-error-600 shadow-sm",
        outline:
          "border border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900/20",
        secondary:
          "bg-secondary-500 text-white hover:bg-secondary-600 shadow-sm",
        ghost:
          "text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20",
        link: "text-primary-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-sm",
        lg: "h-12 rounded-md px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
