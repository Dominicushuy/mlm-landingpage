import React, { createContext, useContext, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Tabs component với active state cải tiến
 *
 * @example
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 */

const TabsContext = createContext(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      "Tabs compound components must be used within a Tabs component"
    );
  }
  return context;
};

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-md p-1",
  {
    variants: {
      variant: {
        default: "bg-gray-100 dark:bg-gray-800",
        outline: "border border-gray-200 dark:border-gray-700",
        pills: "space-x-1 bg-transparent",
        underline:
          "space-x-1 bg-transparent border-b border-gray-200 dark:border-gray-700 w-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-gray-600 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50 data-[state=active]:shadow-sm rounded-md",
        outline:
          "text-gray-600 dark:text-gray-400 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50 data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-700 data-[state=active]:border",
        pills:
          "text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:hover:bg-blue-700 dark:data-[state=active]:hover:bg-blue-700",
        underline:
          "text-gray-600 dark:text-gray-400 border-b-2 border-transparent rounded-none hover:text-gray-900 dark:hover:text-gray-300 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Tabs = React.forwardRef(
  (
    {
      value,
      defaultValue,
      onValueChange,
      variant = "default",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [tabValue, setTabValue] = useState(value || defaultValue || "");

    const handleValueChange = (newValue) => {
      if (value === undefined) {
        setTabValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider
        value={{
          value: value !== undefined ? value : tabValue,
          onValueChange: handleValueChange,
          variant,
        }}
      >
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

const TabsList = React.forwardRef(({ className, variant, ...props }, ref) => {
  const { variant: contextVariant } = useTabsContext();
  return (
    <div
      ref={ref}
      className={cn(
        tabsListVariants({ variant: variant || contextVariant }),
        className
      )}
      {...props}
    />
  );
});

const TabsTrigger = React.forwardRef(
  ({ className, value, variant, ...props }, ref) => {
    const {
      value: selectedValue,
      onValueChange,
      variant: contextVariant,
    } = useTabsContext();
    const isActive = selectedValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          tabsTriggerVariants({ variant: variant || contextVariant }),
          className
        )}
        onClick={() => onValueChange(value)}
        {...props}
      />
    );
  }
);

const TabsContent = React.forwardRef(
  ({ className, value, forceMount, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext();
    const isSelected = selectedValue === value;

    if (!isSelected && !forceMount) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-hidden={!isSelected}
        hidden={!isSelected}
        data-state={isSelected ? "active" : "inactive"}
        className={cn(
          "mt-4 p-2",
          isSelected ? "animate-in fade-in-75 duration-200" : "",
          className
        )}
        {...props}
      />
    );
  }
);

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
