import React, { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Section component with animation variants
 *
 * @example
 * <Section
 *   id="features"
 *   variant="gradient"
 *   animation="fade-in"
 *   className="py-24"
 *   isVisible={visibilityState.features}
 * >
 *   Content goes here
 * </Section>
 */

const sectionVariants = cva("transition-opacity duration-1000", {
  variants: {
    variant: {
      default: "bg-white dark:bg-gray-900",
      gray: "bg-gray-50 dark:bg-gray-800",
      primary: "bg-primary-50 dark:bg-primary-900/20",
      gradient:
        "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900/30",
      gradientVertical:
        "bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20",
      gradientPrimary: "bg-gradient-to-r from-blue-700 to-blue-500 text-white",
    },
    rounded: {
      none: "",
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
    },
    shadow: {
      none: "",
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-lg",
    },
    container: {
      true: "mx-auto px-4 sm:px-6 lg:px-8",
      false: "",
    },
    animation: {
      none: "",
      "fade-in": "animate-fade-in",
      "slide-up": "animate-slide-up",
      "slide-down": "animate-slide-down",
      "slide-right": "animate-slide-right",
      "slide-left": "animate-slide-left",
      "zoom-in": "animate-zoom-in",
    },
  },
  defaultVariants: {
    variant: "default",
    rounded: "none",
    shadow: "none",
    container: false,
    animation: "none",
  },
});

const Section = forwardRef(
  (
    {
      id,
      className,
      variant,
      rounded,
      shadow,
      container,
      animation,
      isVisible = true,
      maxWidth = "max-w-7xl",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn(
          sectionVariants({
            variant,
            rounded,
            shadow,
            container,
            animation,
            className,
          }),
          isVisible ? "opacity-100" : "opacity-50"
        )}
        {...props}
      >
        {container ? (
          <div className={cn("mx-auto", maxWidth)}>{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = "Section";

const SectionHeader = forwardRef(
  ({ className, align = "center", spacing = "mb-16", ...props }, ref) => {
    const alignmentClasses = {
      left: "text-left",
      center: "text-center mx-auto",
      right: "text-right ml-auto",
    };

    return (
      <div
        ref={ref}
        className={cn(alignmentClasses[align], spacing, "max-w-3xl", className)}
        {...props}
      />
    );
  }
);

SectionHeader.displayName = "SectionHeader";

const SectionTitle = forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "text-gray-900 dark:text-white",
      primary: "text-primary-600 dark:text-primary-400",
      white: "text-white",
    };

    const sizeClasses = {
      default: "text-4xl font-extrabold sm:text-5xl sm:tracking-tight",
      sm: "text-3xl font-bold",
      lg: "text-5xl font-extrabold sm:text-6xl sm:tracking-tight",
    };

    return (
      <h2
        ref={ref}
        className={cn(variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

SectionTitle.displayName = "SectionTitle";

const SectionSubtitle = forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default:
        "text-base font-semibold text-primary-600 dark:text-primary-400 tracking-wide uppercase",
      muted:
        "text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
      white: "text-sm font-medium text-white uppercase tracking-wider",
    };

    return (
      <h3
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

SectionSubtitle.displayName = "SectionSubtitle";

const SectionDescription = forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default:
        "mt-5 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400",
      primary:
        "mt-5 max-w-3xl mx-auto text-xl text-primary-700 dark:text-primary-300",
      white: "mt-5 max-w-3xl mx-auto text-xl text-white/80",
    };

    return (
      <p
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

SectionDescription.displayName = "SectionDescription";

const SectionContent = forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn(className)} {...props} />;
});

SectionContent.displayName = "SectionContent";

export {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
  SectionContent,
  sectionVariants,
};
