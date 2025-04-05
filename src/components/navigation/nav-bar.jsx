import React, { useState, useEffect, useRef } from "react";
import { cva } from "class-variance-authority";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Enhanced Navbar component with improved UI/UX and smooth scrolling
 */

const navbarVariants = cva(
  "relative z-50 transition-all duration-300 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-900",
        transparent: "bg-transparent",
        translucent: "bg-white/90 dark:bg-gray-900/90",
        filled: "bg-primary-600 text-white",
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
        lg: "shadow-lg",
      },
      border: {
        none: "border-none",
        bottom: "border-b border-gray-200 dark:border-gray-800",
        color: "border-b-2 border-primary-500 dark:border-primary-400",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "sticky",
      shadow: "default",
      border: "bottom",
    },
  }
);

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
    const mobileMenuRef = useRef(null);
    const menuButtonRef = useRef(null);

    // Handle scroll effect if scrollBehavior is true
    useEffect(() => {
      if (!scrollBehavior) return;

      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollBehavior]);

    // Handle clicks outside mobile menu to close it
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          mobileMenuOpen &&
          mobileMenuRef.current &&
          !mobileMenuRef.current.contains(event.target) &&
          menuButtonRef.current &&
          !menuButtonRef.current.contains(event.target)
        ) {
          setMobileMenuOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [mobileMenuOpen]);

    const navVariant = scrolled && scrollBehavior ? "translucent" : variant;
    const navShadow = scrolled && scrollBehavior ? "default" : shadow;
    const navBorder = scrolled && scrollBehavior ? "color" : border;

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
            border: navBorder,
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
            <div className="flex items-center">
              <a
                href="#"
                className="transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {logo}
              </a>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-1">
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
                ref={menuButtonRef}
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
                aria-expanded={mobileMenuOpen ? "true" : "false"}
                aria-label="Toggle menu"
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
          ref={mobileMenuRef}
          className={cn(
            "md:hidden bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 overflow-hidden",
            mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
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
        e.preventDefault();
        onClick(item);
      }}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group",
        active
          ? "text-primary-600 dark:text-primary-400"
          : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400",
        className,
        active && activeClassName
      )}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
      <span
        className={cn(
          "absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transform transition-transform duration-200 rounded-t-md",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      ></span>
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
        e.preventDefault();
        onClick(item);
      }}
      className={cn(
        "block px-3 py-2 rounded-md text-base font-medium transition-all duration-200",
        active
          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400",
        className,
        active && activeClassName
      )}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
    </a>
  );
};

// Desktop NavDropdown with improved animations
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
          "px-3 py-2 rounded-md text-sm font-medium inline-flex items-center transition-all duration-200 relative group",
          isChildActive || isOpen
            ? "text-primary-600 dark:text-primary-400"
            : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400",
          itemClassName,
          isChildActive && activeItemClassName
        )}
        aria-expanded={isOpen ? "true" : "false"}
      >
        {item.label}
        <span className="ml-1 transition-transform duration-200">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
        <span
          className={cn(
            "absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 transform transition-transform duration-200 rounded-t-md",
            isChildActive || isOpen
              ? "scale-x-100"
              : "scale-x-0 group-hover:scale-x-100"
          )}
        ></span>
      </button>

      <div
        className={cn(
          "absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-left z-50 overflow-hidden",
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
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
                "block px-4 py-2 text-sm transition-colors duration-150",
                activeItem === child.href || activeItem === child.id
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400",
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
    </div>
  );
};

// Improved Mobile NavDropdown
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
          "w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200",
          isChildActive || isOpen
            ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400"
        )}
        aria-expanded={isOpen ? "true" : "false"}
      >
        {item.label}
        <span className="transition-transform duration-200">
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>

      <div
        className={cn(
          "pl-4 mt-1 space-y-1 overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {item.children.map((child, idx) => (
          <a
            key={idx}
            href={child.href}
            onClick={(e) => {
              e.preventDefault();
              onItemClick(child);
            }}
            className={cn(
              "block px-3 py-2 rounded-md text-sm font-medium border-l-2 transition-all duration-200",
              activeItem === child.href || activeItem === child.id
                ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-primary-300 dark:hover:border-primary-700",
              dropdownItemClassName,
              (activeItem === child.href || activeItem === child.id) &&
                activeDropdownItemClassName
            )}
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export { Navbar, navbarVariants };
