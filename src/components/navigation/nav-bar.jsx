import React, { useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

/**
 * Navbar component with responsive mobile menu
 *
 * @example
 * <Navbar
 *   logo={<Logo />}
 *   items={[
 *     { label: "Home", href: "#home" },
 *     { label: "Features", href: "#features" },
 *     { label: "Pricing", href: "#pricing" },
 *     {
 *       label: "Resources",
 *       children: [
 *         { label: "Documentation", href: "#docs" },
 *         { label: "API", href: "#api" }
 *       ]
 *     }
 *   ]}
 *   actions={[
 *     <Button variant="outline">Sign In</Button>,
 *     <Button>Sign Up</Button>
 *   ]}
 * />
 */

const navbarVariants = cva("relative z-50 transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-white dark:bg-gray-900",
      transparent: "bg-transparent",
      translucent: "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md",
    },
    position: {
      static: "relative",
      sticky: "sticky top-0",
      fixed: "fixed top-0 left-0 right-0",
    },
    shadow: {
      none: "",
      sm: "shadow-sm",
      default: "shadow",
    },
    border: {
      none: "border-none",
      bottom: "border-b border-gray-200 dark:border-gray-800",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "sticky",
    shadow: "default",
    border: "bottom",
  },
});

const Navbar = React.forwardRef(
  (
    {
      logo,
      items = [],
      actions = [],
      activeItem,
      variant,
      position,
      shadow,
      border,
      containerClassName,
      itemClassName,
      activeItemClassName,
      dropdownItemClassName,
      activeDropdownItemClassName,
      mobileMenuClassName,
      className,
      scrollBehavior = true,
      onNavItemClick,
      ...props
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect if scrollBehavior is true
    useEffect(() => {
      if (!scrollBehavior) return;

      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollBehavior]);

    const navVariant = scrolled && scrollBehavior ? "translucent" : variant;
    const navShadow = scrolled && scrollBehavior ? "default" : shadow;

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleItemClick = (item) => {
      if (onNavItemClick) {
        onNavItemClick(item);
      }
      setMobileMenuOpen(false);
    };

    return (
      <nav
        ref={ref}
        className={cn(
          navbarVariants({
            variant: navVariant,
            position,
            shadow: navShadow,
            border,
            className,
          })
        )}
        {...props}
      >
        <div
          className={cn(
            "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            containerClassName
          )}
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div className="flex items-center">{logo}</div>

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {items.map((item, index) =>
                  item.children ? (
                    <NavDropdown
                      key={index}
                      item={item}
                      activeItem={activeItem}
                      itemClassName={itemClassName}
                      activeItemClassName={activeItemClassName}
                      dropdownItemClassName={dropdownItemClassName}
                      activeDropdownItemClassName={activeDropdownItemClassName}
                      onItemClick={handleItemClick}
                    />
                  ) : (
                    <NavItem
                      key={index}
                      item={item}
                      active={
                        activeItem === item.href || activeItem === item.id
                      }
                      className={itemClassName}
                      activeClassName={activeItemClassName}
                      onClick={() => handleItemClick(item)}
                    />
                  )
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {actions.map((action, index) => (
                <React.Fragment key={index}>{action}</React.Fragment>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out transform",
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none",
            mobileMenuClassName
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.children ? (
                  <MobileNavDropdown
                    item={item}
                    activeItem={activeItem}
                    dropdownItemClassName={dropdownItemClassName}
                    activeDropdownItemClassName={activeDropdownItemClassName}
                    onItemClick={handleItemClick}
                  />
                ) : (
                  <MobileNavItem
                    item={item}
                    active={activeItem === item.href || activeItem === item.id}
                    className={itemClassName}
                    activeClassName={activeItemClassName}
                    onClick={() => handleItemClick(item)}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile actions */}
          {actions.length > 0 && (
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
              <div className="px-2 space-y-3">
                {actions.map((action, index) => (
                  <div key={index} className="w-full">
                    {React.cloneElement(action, {
                      className: cn(
                        "w-full justify-center",
                        action.props.className
                      ),
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";

// Desktop NavItem
const NavItem = ({ item, active, className, activeClassName, onClick }) => {
  return (
    <a
      href={item.href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(item);
        }
      }}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
        className,
        active && activeClassName
      )}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
    </a>
  );
};

// Mobile NavItem
const MobileNavItem = ({
  item,
  active,
  className,
  activeClassName,
  onClick,
}) => {
  return (
    <a
      href={item.href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(item);
        }
      }}
      className={cn(
        "block px-3 py-2 rounded-md text-base font-medium",
        active
          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
        className,
        active && activeClassName
      )}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
    </a>
  );
};

// Desktop NavDropdown
const NavDropdown = ({
  item,
  activeItem,
  itemClassName,
  activeItemClassName,
  dropdownItemClassName,
  activeDropdownItemClassName,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isChildActive = item.children?.some(
    (child) => activeItem === child.href || activeItem === child.id
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium inline-flex items-center transition-colors",
          isChildActive
            ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
          itemClassName,
          isChildActive && activeItemClassName
        )}
      >
        {item.label}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {item.children.map((child, idx) => (
              <a
                key={idx}
                href={child.href}
                onClick={(e) => {
                  e.preventDefault();
                  onItemClick(child);
                  setIsOpen(false);
                }}
                className={cn(
                  "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                  activeItem === child.href || activeItem === child.id
                    ? "bg-gray-100 dark:bg-gray-700 text-primary-700 dark:text-primary-300"
                    : "",
                  dropdownItemClassName,
                  (activeItem === child.href || activeItem === child.id) &&
                    activeDropdownItemClassName
                )}
                role="menuitem"
              >
                {child.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile NavDropdown
const MobileNavDropdown = ({
  item,
  activeItem,
  dropdownItemClassName,
  activeDropdownItemClassName,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isChildActive = item.children?.some(
    (child) => activeItem === child.href || activeItem === child.id
  );

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium",
          isChildActive
            ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        )}
      >
        {item.label}
        <ChevronRight
          className={cn(
            "h-5 w-5 transition-transform",
            isOpen && "transform rotate-90"
          )}
        />
      </button>

      {isOpen && (
        <div className="pl-4 mt-1 space-y-1">
          {item.children.map((child, idx) => (
            <a
              key={idx}
              href={child.href}
              onClick={(e) => {
                e.preventDefault();
                onItemClick(child);
              }}
              className={cn(
                "block px-3 py-2 rounded-md text-sm font-medium border-l-2",
                activeItem === child.href || activeItem === child.id
                  ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                dropdownItemClassName,
                (activeItem === child.href || activeItem === child.id) &&
                  activeDropdownItemClassName
              )}
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export { Navbar, navbarVariants };
