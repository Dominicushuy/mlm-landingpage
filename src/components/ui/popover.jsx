import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";

// PopoverContent Variants
const popoverContentVariants = cva(
  "z-50 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700 p-4 animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800",
      },
      size: {
        default: "w-72",
        sm: "w-48",
        lg: "w-96",
        auto: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Main Popover Component
const Popover = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverContext = { isOpen, setIsOpen };

  return (
    <PopoverContext.Provider value={popoverContext}>
      <div className="relative inline-block" {...props}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

// Context for sharing state between Popover components
const PopoverContext = React.createContext({
  isOpen: false,
  setIsOpen: () => {},
});

// Trigger Component
const PopoverTrigger = React.forwardRef(
  ({ children, asChild, ...props }, ref) => {
    const { isOpen, setIsOpen } = React.useContext(PopoverContext);

    const handleClick = (e) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
      if (props.onClick) props.onClick(e);
    };

    // If asChild is true, we clone the children and add our props
    // This is useful for cases where you want to use a custom component as the trigger
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        onClick: handleClick,
        "aria-expanded": isOpen,
        "aria-haspopup": true,
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-haspopup={true}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = "PopoverTrigger";

// Content Component
const PopoverContent = React.forwardRef(
  (
    {
      children,
      className,
      variant,
      size,
      align = "center",
      sideOffset = 4,
      alignOffset = 0,
      avoidCollisions = true,
      side = "bottom",
      hideArrow = false,
      onClose,
      ...props
    },
    ref
  ) => {
    const { isOpen, setIsOpen } = React.useContext(PopoverContext);
    const triggerRef = useRef(null);
    const contentRef = useRef(null);
    const arrowRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });

    // Function to position the popover
    const updatePosition = () => {
      if (!isOpen || !triggerRef.current || !contentRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top, left;

      // Calculate position based on side
      switch (side) {
        case "top":
          top = triggerRect.top - contentRect.height - sideOffset;
          break;
        case "bottom":
          top = triggerRect.bottom + sideOffset;
          break;
        case "left":
          left = triggerRect.left - contentRect.width - sideOffset;
          top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
          break;
        case "right":
          left = triggerRect.right + sideOffset;
          top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
          break;
        default:
          top = triggerRect.bottom + sideOffset;
      }

      // Calculate horizontal position for top and bottom
      if (side === "top" || side === "bottom") {
        switch (align) {
          case "start":
            left = triggerRect.left + alignOffset;
            break;
          case "end":
            left = triggerRect.right - contentRect.width - alignOffset;
            break;
          default: // center
            left =
              triggerRect.left +
              (triggerRect.width - contentRect.width) / 2 +
              alignOffset;
        }
      }

      // Avoid collisions if enabled
      if (avoidCollisions) {
        // Make sure the popover doesn't go outside the viewport
        if (left < 0) left = 4;
        if (left + contentRect.width > viewportWidth)
          left = viewportWidth - contentRect.width - 4;
        if (top < 0) top = 4;
        if (top + contentRect.height > viewportHeight) {
          // If it's on the bottom, move it to the top of the trigger
          if (side === "bottom") {
            top = triggerRect.top - contentRect.height - sideOffset;
          }
        }
      }

      // Position the arrow
      if (!hideArrow && arrowRef.current) {
        const arrowWidth = arrowRef.current.offsetWidth;
        const arrowHeight = arrowRef.current.offsetHeight;

        let arrowTop = 0,
          arrowLeft = 0;

        switch (side) {
          case "top":
            arrowTop = contentRect.height - 1;
            arrowLeft =
              align === "start"
                ? arrowWidth
                : align === "end"
                ? contentRect.width - arrowWidth * 2
                : contentRect.width / 2 - arrowWidth / 2;
            break;
          case "bottom":
            arrowTop = -arrowHeight + 1;
            arrowLeft =
              align === "start"
                ? arrowWidth
                : align === "end"
                ? contentRect.width - arrowWidth * 2
                : contentRect.width / 2 - arrowWidth / 2;
            break;
          case "left":
            arrowLeft = contentRect.width - 1;
            arrowTop = contentRect.height / 2 - arrowHeight / 2;
            break;
          case "right":
            arrowLeft = -arrowWidth + 1;
            arrowTop = contentRect.height / 2 - arrowHeight / 2;
            break;
        }

        setArrowPosition({ top: arrowTop, left: arrowLeft });
      }

      setPosition({ top, left });
    };

    // Get reference to the trigger element
    useEffect(() => {
      // Find the trigger by traversing up to the Popover parent
      // and then finding the first button or element with aria-haspopup
      if (contentRef.current) {
        const parent = contentRef.current.parentElement;
        if (parent) {
          const trigger = parent.querySelector('[aria-haspopup="true"]');
          if (trigger) {
            triggerRef.current = trigger;
          }
        }
      }
    }, [isOpen]);

    // Add click outside handler
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          isOpen &&
          contentRef.current &&
          !contentRef.current.contains(event.target) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target)
        ) {
          setIsOpen(false);
          if (onClose) onClose();
        }
      };

      const handleEscape = (event) => {
        if (isOpen && event.key === "Escape") {
          setIsOpen(false);
          if (onClose) onClose();
        }
      };

      // Update position when content is rendered
      if (isOpen) {
        requestAnimationFrame(updatePosition);
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
      }

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [isOpen, onClose, setIsOpen]);

    if (!isOpen) return null;

    // Using portals to render popover in body to avoid containment issues
    return createPortal(
      <div
        ref={contentRef}
        className={cn(popoverContentVariants({ variant, size, className }))}
        style={{
          position: "fixed",
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 50,
        }}
        data-side={side}
        data-align={align}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {children}

        {!hideArrow && (
          <div
            ref={arrowRef}
            className="absolute w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45 border border-gray-200 dark:border-gray-700"
            style={{
              top: `${arrowPosition.top}px`,
              left: `${arrowPosition.left}px`,
              [side]: "-4px",
              borderRight: side === "left" ? "none" : undefined,
              borderBottom: side === "top" ? "none" : undefined,
              borderLeft: side === "right" ? "none" : undefined,
              borderTop: side === "bottom" ? "none" : undefined,
            }}
          />
        )}
      </div>,
      document.body
    );
  }
);

PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent, popoverContentVariants };
