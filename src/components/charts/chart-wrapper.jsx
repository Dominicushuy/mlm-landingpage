import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Download,
  ExternalLink,
  Info,
  Maximize,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

/**
 * Enhanced ChartWrapper component with animations, download options, and more interaction features
 *
 * @example
 * <EnhancedChartWrapper
 *   title="Monthly Revenue"
 *   caption="Last 12 months of revenue data"
 *   downloadOptions={{
 *     csv: true,
 *     png: true,
 *     onDownload: (format) => handleDownload(format)
 *   }}
 * >
 *   <LineChart data={data} />
 * </EnhancedChartWrapper>
 */

const chartWrapperVariants = cva("rounded-xl overflow-hidden", {
  variants: {
    variant: {
      default: "bg-white dark:bg-gray-800",
      outline:
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
      filled: "bg-gray-50 dark:bg-gray-800/80",
      primary: "bg-primary-50 dark:bg-primary-900/10",
      glass:
        "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/20 dark:border-gray-700/20",
    },
    shadow: {
      none: "",
      sm: "shadow-sm",
      default: "shadow",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
    animation: {
      none: "",
      fadeIn: "animate-fade-in",
      slideUp: "animate-slide-up",
      zoomIn: "animate-zoom-in",
    },
    hover: {
      none: "",
      translate:
        "transition-transform duration-300 hover:-translate-y-1 hover:shadow-md",
      scale:
        "transition-transform duration-300 hover:scale-[1.02] hover:shadow-md",
      glow: "transition-all duration-300 hover:shadow-glow-blue dark:hover:shadow-glow-blue",
    },
  },
  defaultVariants: {
    variant: "default",
    shadow: "default",
    padding: "default",
    animation: "none",
    hover: "none",
  },
});

const EnhancedChartWrapper = React.forwardRef(
  (
    {
      title,
      subtitle,
      caption,
      info,
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
      animation,
      hover,
      height,
      children,
      downloadOptions,
      expandable = false,
      onExpand,
      loading = false,
      loadingMessage = "Loading chart data...",
      actions,
      ...props
    },
    ref
  ) => {
    const handleDownload = (format) => {
      if (downloadOptions?.onDownload) {
        downloadOptions.onDownload(format);
      } else {
        console.warn("Download functionality not implemented");
      }
    };

    // Motion variants for animations
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className={cn(
          chartWrapperVariants({
            variant,
            shadow,
            padding,
            animation,
            hover,
            className,
          })
        )}
        {...props}
      >
        {(title || subtitle || downloadOptions || actions) && (
          <div
            className={cn(
              "mb-4 flex justify-between items-start",
              headerClassName
            )}
          >
            <div>
              {title && (
                <h3
                  className={cn(
                    "text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2",
                    titleClassName
                  )}
                >
                  {typeof title === "string" ? title : title}

                  {info && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                        >
                          <Info className="h-4 w-4 text-gray-400" />
                          <span className="sr-only">Chart information</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-2">
                          <h3 className="font-medium">
                            {typeof title === "string"
                              ? title
                              : "Chart Information"}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {info}
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
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

            <div className="flex items-center gap-2">
              {actions}

              {(downloadOptions || expandable) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {expandable && (
                      <DropdownMenuItem onClick={onExpand}>
                        <Maximize className="h-4 w-4 mr-2" />
                        <span>Expand</span>
                      </DropdownMenuItem>
                    )}

                    {downloadOptions && (
                      <>
                        {expandable && <DropdownMenuSeparator />}

                        {downloadOptions.csv && (
                          <DropdownMenuItem
                            onClick={() => handleDownload("csv")}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            <span>Download CSV</span>
                          </DropdownMenuItem>
                        )}

                        {downloadOptions.png && (
                          <DropdownMenuItem
                            onClick={() => handleDownload("png")}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            <span>Download PNG</span>
                          </DropdownMenuItem>
                        )}

                        {downloadOptions.excel && (
                          <DropdownMenuItem
                            onClick={() => handleDownload("excel")}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            <span>Download Excel</span>
                          </DropdownMenuItem>
                        )}

                        {downloadOptions.json && (
                          <DropdownMenuItem
                            onClick={() => handleDownload("json")}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            <span>Download JSON</span>
                          </DropdownMenuItem>
                        )}
                      </>
                    )}

                    {downloadOptions?.shareUrl && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(downloadOptions.shareUrl, "_blank")
                          }
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          <span>Share Chart</span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        )}

        <div
          className={cn("relative", contentClassName)}
          style={height ? { height } : undefined}
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-10 rounded-lg">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {loadingMessage}
                </p>
              </div>
            </div>
          ) : null}

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
      </motion.div>
    );
  }
);

EnhancedChartWrapper.displayName = "EnhancedChartWrapper";

/**
 * Enhanced version of ChartLegend with interaction capabilities
 */
const EnhancedChartLegend = React.forwardRef(
  (
    {
      className,
      items = [],
      orientation = "horizontal",
      onClick,
      activeIndex,
      ...props
    },
    ref
  ) => {
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
          <motion.div
            key={index}
            className={cn(
              "flex items-center mr-4 last:mr-0 py-1 px-2 rounded-md cursor-pointer",
              orientation === "vertical" && "mr-0",
              activeIndex === index && "bg-gray-100 dark:bg-gray-800"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick && onClick(item, index)}
          >
            <div
              className="h-3 w-3 rounded-full mr-2 shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              {item.label}
            </span>
            {item.value && (
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                {item.value}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    );
  }
);

EnhancedChartLegend.displayName = "EnhancedChartLegend";

/**
 * ChartGrid component for creating responsive chart layouts
 */
const EnhancedChartGrid = React.forwardRef(
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
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1,
          },
        }}
        className={cn("grid", colsMap[cols], gapMap[gap], className)}
        {...props}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                delay: index * 0.1,
              },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }
);

EnhancedChartGrid.displayName = "EnhancedChartGrid";

/**
 * ChartGridItem component for controlling chart layout within a grid
 */
const EnhancedChartGridItem = React.forwardRef(
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

EnhancedChartGridItem.displayName = "EnhancedChartGridItem";

export {
  EnhancedChartWrapper,
  EnhancedChartLegend,
  EnhancedChartGrid,
  EnhancedChartGridItem,
  chartWrapperVariants,
};
