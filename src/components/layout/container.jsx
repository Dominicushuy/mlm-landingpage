import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Container component for layout structure
 *
 * @example
 * <Container>
 *   <p>Content goes here</p>
 * </Container>
 *
 * <Container size="sm" className="my-8">
 *   <p>Narrow content</p>
 * </Container>
 */

const containerVariants = cva("mx-auto px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      default: "max-w-7xl",
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
    },
    padding: {
      default: "px-4 sm:px-6 lg:px-8",
      none: "px-0",
      sm: "px-2 sm:px-4",
      lg: "px-6 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: {
    size: "default",
    padding: "default",
  },
});

const Container = React.forwardRef(
  ({ className, size, padding, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ size, padding, className }))}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

/**
 * Grid component for layout structure
 */
const Grid = React.forwardRef(
  (
    {
      className,
      children,
      cols = 1,
      gap = "default",
      items = "start", // align-items
      justify = "start", // justify-content
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const colsMap = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
      6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-6",
      "1-2": "grid-cols-1 md:grid-cols-3", // 1/3 + 2/3
      "2-1": "grid-cols-1 md:grid-cols-3", // 2/3 + 1/3
    };

    const gapMap = {
      none: "gap-0",
      xs: "gap-2",
      sm: "gap-4",
      default: "gap-6",
      md: "gap-8",
      lg: "gap-10",
      xl: "gap-12",
    };

    const itemsMap = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    };

    const justifyMap = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "grid",
          colsMap[cols],
          gapMap[gap],
          itemsMap[items],
          justifyMap[justify],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = "Grid";

/**
 * GridItem component for layout structure
 */
const GridItem = React.forwardRef(
  (
    {
      className,
      children,
      colSpan = "full",
      rowSpan = 1,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const colSpanMap = {
      auto: "col-auto",
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
      full: "col-span-full",
    };

    const rowSpanMap = {
      auto: "row-auto",
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
      4: "row-span-4",
      5: "row-span-5",
      6: "row-span-6",
      full: "row-span-full",
    };

    return (
      <Component
        ref={ref}
        className={cn(colSpanMap[colSpan], rowSpanMap[rowSpan], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GridItem.displayName = "GridItem";

/**
 * Flex component for layout structure
 */
const Flex = React.forwardRef(
  (
    {
      className,
      children,
      direction = "row",
      wrap = "nowrap",
      justify = "start",
      items = "start",
      gap = "default",
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const directionMap = {
      row: "flex-row",
      col: "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse",
    };

    const wrapMap = {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    };

    const justifyMap = {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    const itemsMap = {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    };

    const gapMap = {
      none: "gap-0",
      xs: "gap-2",
      sm: "gap-4",
      default: "gap-6",
      md: "gap-8",
      lg: "gap-10",
      xl: "gap-12",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "flex",
          directionMap[direction],
          wrapMap[wrap],
          justifyMap[justify],
          itemsMap[items],
          gapMap[gap],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Flex.displayName = "Flex";

export { Container, Grid, GridItem, Flex, containerVariants };
