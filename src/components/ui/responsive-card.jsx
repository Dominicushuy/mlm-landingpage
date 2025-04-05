import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import { cn } from "../../lib/utils";

const ResponsiveCard = ({
  title,
  children,
  footer,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  variant = "default",
  withBorder = false,
  interactive = false,
  ...props
}) => {
  return (
    <Card
      variant={variant}
      className={cn(
        "transition-all duration-300",
        withBorder && "border border-gray-200 dark:border-gray-700",
        interactive && "hover:shadow-lg hover:scale-[1.01] cursor-pointer",
        className
      )}
      {...props}
    >
      {title && (
        <CardHeader
          className={cn(
            withBorder && "border-b border-gray-100 dark:border-gray-800",
            headerClassName
          )}
        >
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("p-4 md:p-6", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter
          className={cn(
            withBorder && "border-t border-gray-100 dark:border-gray-800",
            "p-4 md:p-6",
            footerClassName
          )}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export { ResponsiveCard };
