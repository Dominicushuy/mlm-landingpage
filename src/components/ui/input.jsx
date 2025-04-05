import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Input component with variants
 *
 * @example
 * <Input placeholder="Default input" />
 * <Input variant="filled" placeholder="Filled input" />
 */

const inputVariants = cva(
  "flex w-full rounded-md border text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800",
        filled:
          "border-transparent bg-gray-100 dark:bg-gray-700 focus-visible:bg-white dark:focus-visible:bg-gray-800",
        flushed:
          "rounded-none border-x-0 border-t-0 border-b-2 px-0 focus-visible:border-b-primary-500",
        outline: "border-gray-300 dark:border-gray-600 bg-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1 text-xs",
        lg: "h-12 px-5 py-3 text-base",
      },
      state: {
        default: "",
        error:
          "border-error-500 focus-visible:ring-error-500 dark:border-error-400",
        success:
          "border-success-500 focus-visible:ring-success-500 dark:border-success-400",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

const Input = React.forwardRef(
  ({ className, variant, size, state, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, size, state, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});

FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none text-gray-700 dark:text-gray-300",
        className
      )}
      {...props}
    />
  );
});

FormLabel.displayName = "FormLabel";

const FormError = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-xs font-medium text-error-500", className)}
      {...props}
    />
  );
});

FormError.displayName = "FormError";

export { Input, inputVariants, FormItem, FormLabel, FormError };
