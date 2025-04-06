import React, { useRef, useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Slider component for selecting values from a range
 *
 * @example
 * <Slider
 *   min={0}
 *   max={100}
 *   step={1}
 *   defaultValue={50}
 *   onChange={(value) => console.log(value)}
 * />
 */

const sliderVariants = cva("relative w-full touch-none select-none", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "full",
  },
});

const sliderTrackVariants = cva(
  "relative w-full h-2 rounded-full overflow-hidden cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-gray-200 dark:bg-gray-700",
        blue: "bg-blue-100 dark:bg-blue-900/30",
        green: "bg-green-100 dark:bg-green-900/30",
        red: "bg-red-100 dark:bg-red-900/30",
        amber: "bg-amber-100 dark:bg-amber-900/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const sliderRangeVariants = cva("absolute h-full", {
  variants: {
    variant: {
      default: "bg-gray-500 dark:bg-gray-400",
      blue: "bg-blue-500 dark:bg-blue-400",
      green: "bg-green-500 dark:bg-green-400",
      red: "bg-red-500 dark:bg-red-400",
      amber: "bg-amber-500 dark:bg-amber-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const sliderThumbVariants = cva(
  "block absolute top-0 w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-gray-500 dark:bg-gray-400 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900",
        blue: "bg-blue-500 dark:bg-blue-400 focus:ring-blue-400 dark:focus:ring-blue-500 focus:ring-offset-blue-100 dark:focus:ring-offset-blue-900",
        green:
          "bg-green-500 dark:bg-green-400 focus:ring-green-400 dark:focus:ring-green-500 focus:ring-offset-green-100 dark:focus:ring-offset-green-900",
        red: "bg-red-500 dark:bg-red-400 focus:ring-red-400 dark:focus:ring-red-500 focus:ring-offset-red-100 dark:focus:ring-offset-red-900",
        amber:
          "bg-amber-500 dark:bg-amber-400 focus:ring-amber-400 dark:focus:ring-amber-500 focus:ring-offset-amber-100 dark:focus:ring-offset-amber-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Slider = React.forwardRef(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onChange,
      disabled = false,
      showValue = false,
      valuePosition = "top",
      className,
      size,
      variant = "default",
      thumbClassName,
      trackClassName,
      rangeClassName,
      valueLabelClassName,
      onDragStart,
      onDragEnd,
      formatValue,
      ...props
    },
    ref
  ) => {
    const trackRef = useRef(null);
    const thumbRef = useRef(null);
    const [innerValue, setInnerValue] = useState(
      defaultValue !== undefined ? defaultValue : min
    );
    const [isDragging, setIsDragging] = useState(false);

    // Use controlled or uncontrolled value
    const currentValue = value !== undefined ? value : innerValue;
    const percentage = ((currentValue - min) / (max - min)) * 100;

    // Format value if function is provided
    const displayValue = formatValue ? formatValue(currentValue) : currentValue;

    // Update value when dragging
    const updateValue = (clientX) => {
      if (disabled || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const position = clientX - rect.left;
      const percentage = position / rect.width;

      let newValue = min + percentage * (max - min);

      // Apply step constraints
      if (step > 0) {
        newValue = Math.round(newValue / step) * step;
      }

      // Ensure value is within range
      newValue = Math.max(min, Math.min(max, newValue));

      if (value === undefined) {
        setInnerValue(newValue);
      }

      if (onChange) {
        onChange(newValue);
      }
    };

    // Handle mouse events
    const handleMouseDown = (e) => {
      if (disabled) return;

      // Prevent text selection during drag
      e.preventDefault();

      setIsDragging(true);
      if (onDragStart) onDragStart();
      updateValue(e.clientX);

      // Attach to window to handle cases where mouse leaves the slider area
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        updateValue(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (onDragEnd) onDragEnd();

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // Handle touch events
    const handleTouchStart = (e) => {
      if (disabled) return;

      setIsDragging(true);
      if (onDragStart) onDragStart();
      updateValue(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      if (isDragging) {
        updateValue(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      if (onDragEnd) onDragEnd();
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (disabled) return;

      let newValue = currentValue;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          newValue = Math.min(max, currentValue + step);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          newValue = Math.max(min, currentValue - step);
          break;
        case "Home":
          newValue = min;
          break;
        case "End":
          newValue = max;
          break;
        default:
          return;
      }

      if (value === undefined) {
        setInnerValue(newValue);
      }

      if (onChange) {
        onChange(newValue);
      }

      e.preventDefault();
    };

    // Track click
    const handleTrackClick = (e) => {
      if (disabled) return;

      // Don't double-trigger if the click is on the thumb
      if (e.target === thumbRef.current) return;

      updateValue(e.clientX);
    };

    // Clean up event listeners
    useEffect(() => {
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, []);

    return (
      <div className={cn(sliderVariants({ size }), className)} {...props}>
        {/* Value label - conditionally shown */}
        {showValue && valuePosition === "top" && (
          <div
            className={cn(
              "mb-2 text-xs font-medium",
              valueLabelClassName,
              disabled
                ? "text-gray-400 dark:text-gray-600"
                : "text-gray-700 dark:text-gray-300"
            )}
            style={{ marginLeft: `${percentage}%` }}
          >
            {displayValue}
          </div>
        )}

        {/* Track and range */}
        <div
          ref={trackRef}
          className={cn(
            sliderTrackVariants({ variant }),
            trackClassName,
            disabled ? "opacity-50 cursor-not-allowed" : ""
          )}
          onClick={handleTrackClick}
        >
          <div
            className={cn(sliderRangeVariants({ variant }), rangeClassName)}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb */}
        <div
          ref={Object.assign(thumbRef, ref)}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-disabled={disabled}
          aria-orientation="horizontal"
          style={{
            left: `${percentage}%`,
            top: "1px", // Center on the track
          }}
          className={cn(
            sliderThumbVariants({ variant }),
            thumbClassName,
            disabled ? "opacity-50 cursor-not-allowed" : "",
            isDragging ? "scale-110" : ""
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
        />

        {/* Value label - conditionally shown */}
        {showValue && valuePosition === "bottom" && (
          <div
            className={cn(
              "mt-2 text-xs font-medium",
              valueLabelClassName,
              disabled
                ? "text-gray-400 dark:text-gray-600"
                : "text-gray-700 dark:text-gray-300"
            )}
            style={{ marginLeft: `${percentage}%` }}
          >
            {displayValue}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";

export {
  Slider,
  sliderVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
};
