import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * ChartWrapper component for consistent styling of chart containers
 *
 * @example
 * <ChartWrapper title="Monthly Revenue" caption="Last 12 months of revenue data">
 *   <LineChart data={data} />
 * </ChartWrapper>
 */

const chartWrapperVariants = cva("rounded-xl overflow-hidden", {
  variants: {
    variant: {
      default: "bg-white dark:bg-gray-800",
      outline:
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
      filled: "bg-gray-50 dark:bg-gray-800/80",
      primary: "bg-primary-50 dark:bg-primary-900/10",
    },
    shadow: {
      none: "",
      sm: "shadow-sm",
      default: "shadow",
      md: "shadow-md",
      lg: "shadow-lg",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    shadow: "default",
    padding: "default",
  },
});

const ChartWrapper = React.forwardRef(
  (
    {
      title,
      subtitle,
      caption,
      className,
      titleClassName,
      subtitleClassName,
      captionClassName,
      contentClassName,
      headerClassName,
      footerClassName,
      variant,
      shadow,
      padding,
      height,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          chartWrapperVariants({ variant, shadow, padding, className })
        )}
        {...props}
      >
        {(title || subtitle) && (
          <div className={cn("mb-4", headerClassName)}>
            {title && (
              <h3
                className={cn(
                  "text-xl font-bold text-gray-900 dark:text-white",
                  titleClassName
                )}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-sm text-gray-500 dark:text-gray-400 mt-1",
                  subtitleClassName
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div
          className={cn("relative", contentClassName)}
          style={height ? { height } : undefined}
        >
          {children}
        </div>

        {caption && (
          <div
            className={cn(
              "mt-4 text-center text-sm text-gray-500 dark:text-gray-400",
              footerClassName
            )}
          >
            <p className={captionClassName}>{caption}</p>
          </div>
        )}
      </div>
    );
  }
);

ChartWrapper.displayName = "ChartWrapper";

/**
 * ChartGrid component for creating responsive chart layouts
 */
const ChartGrid = React.forwardRef(
  ({ className, cols = 2, gap = "default", children, ...props }, ref) => {
    const colsMap = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      "1-2": "grid-cols-1 md:grid-cols-3", // 1/3 + 2/3
      "2-1": "grid-cols-1 md:grid-cols-3", // 2/3 + 1/3
    };

    const gapMap = {
      none: "gap-0",
      sm: "gap-4",
      default: "gap-6",
      lg: "gap-8",
      xl: "gap-10",
    };

    return (
      <div
        ref={ref}
        className={cn("grid", colsMap[cols], gapMap[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChartGrid.displayName = "ChartGrid";

/**
 * ChartGridItem component for controlling chart layout within a grid
 */
const ChartGridItem = React.forwardRef(
  ({ className, colSpan = 1, rowSpan = 1, children, ...props }, ref) => {
    const colSpanMap = {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      full: "col-span-full",
    };

    const rowSpanMap = {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
    };

    return (
      <div
        ref={ref}
        className={cn(colSpanMap[colSpan], rowSpanMap[rowSpan], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChartGridItem.displayName = "ChartGridItem";

/**
 * ChartLegend component for consistent chart legends
 */
const ChartLegend = React.forwardRef(
  ({ className, items = [], orientation = "horizontal", ...props }, ref) => {
    const orientationClasses = {
      horizontal: "flex flex-wrap",
      vertical: "flex flex-col space-y-2",
    };

    return (
      <div
        ref={ref}
        className={cn(orientationClasses[orientation], "mt-4", className)}
        {...props}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center mr-4 last:mr-0",
              orientation === "vertical" && "mr-0"
            )}
          >
            <div
              className="h-3 w-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  }
);

ChartLegend.displayName = "ChartLegend";

export {
  ChartWrapper,
  ChartGrid,
  ChartGridItem,
  ChartLegend,
  chartWrapperVariants,
};
