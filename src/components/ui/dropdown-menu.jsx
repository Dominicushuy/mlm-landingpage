import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";
import { ChevronRight } from "lucide-react";

/**
 * Dropdown Menu component for displaying menu options
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Options</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuItem>Settings</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>Logout</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */

// Dropdown Content Variants
const dropdownMenuContentVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700 p-1 animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
  {
    variants: {
      variant: {
        default: "",
        contextMenu: "min-w-[10rem]",
      },
      size: {
        default: "w-56",
        sm: "w-48",
        lg: "w-64",
        auto: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Dropdown Menu Item Variants
const dropdownMenuItemVariants = cva(
  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800 dark:focus:text-gray-50",
  {
    variants: {
      variant: {
        default:
          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
        destructive:
          "text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20",
      },
      inset: {
        true: "pl-8",
      },
    },
    defaultVariants: {
      variant: "default",
      inset: false,
    },
  }
);

// Main DropdownMenu Component
const DropdownMenu = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownContext = { isOpen, setIsOpen };

  return (
    <DropdownMenuContext.Provider value={dropdownContext}>
      <div className="relative inline-block" {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

// Context for sharing state between DropdownMenu components
const DropdownMenuContext = React.createContext({
  isOpen: false,
  setIsOpen: () => {},
});

// Trigger Component
const DropdownMenuTrigger = React.forwardRef(
  ({ children, asChild, ...props }, ref) => {
    const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);

    const handleClick = (e) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
      if (props.onClick) props.onClick(e);
    };

    // If asChild is true, we clone the children and add our props
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
        aria-haspopup="menu"
        {...props}
      >
        {children}
      </button>
    );
  }
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// Content Component
const DropdownMenuContent = React.forwardRef(
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
      hideArrow = true,
      onClose,
      ...props
    },
    ref
  ) => {
    const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);
    const triggerRef = useRef(null);
    const contentRef = useRef(null);
    const arrowRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });

    // Function to position the dropdown
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
        // Make sure the dropdown doesn't go outside the viewport
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
      // Find the trigger by traversing up to the DropdownMenu parent
      // and then finding the first button or element with aria-haspopup
      if (contentRef.current) {
        const parent = contentRef.current.parentElement;
        if (parent) {
          const trigger = parent.querySelector('[aria-haspopup="menu"]');
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

    // Keyboard navigation
    useEffect(() => {
      if (!isOpen || !contentRef.current) return;

      const menuItems =
        contentRef.current.querySelectorAll('[role="menuitem"]');
      if (!menuItems.length) return;

      let currentFocus = -1;

      const handleKeyDown = (e) => {
        // Don't handle if dropdown isn't open
        if (!isOpen) return;

        // Handle arrow navigation
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();

          // Update focus based on arrow direction
          if (e.key === "ArrowDown") {
            currentFocus =
              currentFocus < menuItems.length - 1 ? currentFocus + 1 : 0;
          } else {
            currentFocus =
              currentFocus > 0 ? currentFocus - 1 : menuItems.length - 1;
          }

          // Set focus on the item
          if (menuItems[currentFocus]) {
            menuItems[currentFocus].focus();
          }
        }

        // Handle Enter or Space to click the item
        if ((e.key === "Enter" || e.key === " ") && currentFocus !== -1) {
          e.preventDefault();
          menuItems[currentFocus].click();
        }

        // Home key jumps to first item
        if (e.key === "Home") {
          e.preventDefault();
          if (menuItems[0]) {
            menuItems[0].focus();
            currentFocus = 0;
          }
        }

        // End key jumps to last item
        if (e.key === "End") {
          e.preventDefault();
          if (menuItems[menuItems.length - 1]) {
            menuItems[menuItems.length - 1].focus();
            currentFocus = menuItems.length - 1;
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    if (!isOpen) return null;

    // Using portals to render dropdown in body to avoid containment issues
    return createPortal(
      <div
        ref={contentRef}
        className={cn(
          dropdownMenuContentVariants({ variant, size, className })
        )}
        style={{
          position: "fixed",
          top: `${position.top}px`,
          left: `${position.left}px`,
          zIndex: 50,
        }}
        data-side={side}
        data-align={align}
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
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

DropdownMenuContent.displayName = "DropdownMenuContent";

// MenuItem Component
const DropdownMenuItem = React.forwardRef(
  (
    {
      children,
      className,
      variant,
      inset,
      onSelect,
      disabled,
      icon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const { setIsOpen } = React.useContext(DropdownMenuContext);

    const handleClick = (e) => {
      if (!disabled) {
        if (onSelect) onSelect(e);
        setIsOpen(false);
        if (props.onClick) props.onClick(e);
      }
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        className={cn(dropdownMenuItemVariants({ variant, inset, className }))}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e);
          }
        }}
        {...props}
      >
        {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
        {children}
        {rightIcon && <span className="ml-auto">{rightIcon}</span>}
      </div>
    );
  }
);

DropdownMenuItem.displayName = "DropdownMenuItem";

// Separator Component
const DropdownMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("h-px my-1 bg-gray-200 dark:bg-gray-700", className)}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  )
);

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// Dropdown Label Component
const DropdownMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
);

DropdownMenuLabel.displayName = "DropdownMenuLabel";

// Dropdown Group Component
const DropdownMenuGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-1", className)} role="group" {...props} />
));

DropdownMenuGroup.displayName = "DropdownMenuGroup";

// Checkbox Item Component
const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, onCheckedChange, ...props }, ref) => {
    const { setIsOpen } = React.useContext(DropdownMenuContext);

    const handleClick = (e) => {
      if (onCheckedChange) {
        onCheckedChange(!checked);
      }
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        className={cn(
          dropdownMenuItemVariants({ className }),
          "flex items-center"
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-gray-300 dark:border-gray-600">
          {checked ? (
            <Check className="h-3 w-3 text-gray-900 dark:text-gray-100" />
          ) : null}
        </div>
        <span>{children}</span>
      </div>
    );
  }
);

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// Radio Group Component
const DropdownMenuRadioGroup = React.forwardRef(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-1", className)}
        role="radiogroup"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              checked: child.props.value === value,
              onSelect: () => {
                if (onValueChange) {
                  onValueChange(child.props.value);
                }
              },
            });
          }
          return child;
        })}
      </div>
    );
  }
);

DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

// Radio Item Component
const DropdownMenuRadioItem = React.forwardRef(
  ({ className, children, value, checked, onSelect, ...props }, ref) => {
    const { setIsOpen } = React.useContext(DropdownMenuContext);

    const handleClick = (e) => {
      if (onSelect) {
        onSelect(value);
      }
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={checked}
        className={cn(
          dropdownMenuItemVariants({ className }),
          "flex items-center"
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="mr-2 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600">
          {checked ? (
            <div className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-gray-100" />
          ) : null}
        </div>
        <span>{children}</span>
      </div>
    );
  }
);

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// Sub Menu Components
const DropdownMenuSubTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          dropdownMenuItemVariants({ className }),
          "flex items-center justify-between"
        )}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto h-4 w-4" />
      </div>
    );
  }
);

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSubTrigger,
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
};
