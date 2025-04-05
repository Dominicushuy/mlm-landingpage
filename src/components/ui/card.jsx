import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card component with variants
 * Includes Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter
 */

const cardVariants = cva(
  "rounded-xl overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-800 shadow-md",
        outline:
          "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        elevated: "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl",
        filled: "bg-primary-50 dark:bg-gray-900",
        gradient:
          "bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      },
      interactive: {
        true: "hover:scale-[1.02] cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
);

const Card = React.forwardRef(
  ({ className, variant, size, interactive, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, size, interactive, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

const CardHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  );
});

const CardTitle = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-bold leading-none tracking-tight text-gray-900 dark:text-white",
        className
      )}
      {...props}
    />
  );
});

const CardDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
      {...props}
    />
  );
});

const CardContent = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("pt-4", className)} {...props} />;
});

const CardFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  );
});

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
