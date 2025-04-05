import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Enhanced FeatureCard component with variants
 *
 * @example
 * <FeatureCard
 *   icon={<Users />}
 *   title="User Management"
 *   description="Manage your team members and their account permissions."
 *   variant="primary"
 *   size="lg"
 * />
 */

const featureCardVariants = cva("rounded-xl transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-white dark:bg-gray-800 shadow-md hover:shadow-lg",
      primary:
        "bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800",
      secondary:
        "bg-secondary-50 dark:bg-secondary-900/10 border border-secondary-100 dark:border-secondary-800",
      outline:
        "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700",
      filled:
        "bg-gray-50 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800",
      gradient:
        "bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900",
    },
    size: {
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
    interactive: {
      true: "hover:transform hover:scale-105 cursor-pointer",
      false: "",
    },
    iconPosition: {
      left: "flex items-start",
      top: "flex flex-col items-start",
    },
    iconSize: {
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-12 w-12",
    },
    iconBg: {
      none: "",
      light:
        "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400",
      solid: "bg-primary-600 dark:bg-primary-700 text-white",
      outline:
        "border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    interactive: false,
    iconPosition: "left",
    iconSize: "default",
    iconBg: "light",
  },
});

const iconWrapperVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "h-10 w-10 p-2",
        default: "h-12 w-12 p-2.5",
        lg: "h-14 w-14 p-3",
      },
      bg: {
        none: "",
        light: "bg-primary-50 dark:bg-primary-900/20",
        solid: "bg-primary-600 dark:bg-primary-700",
        outline: "border-2 border-primary-600 dark:border-primary-400",
      },
    },
    defaultVariants: {
      size: "default",
      bg: "light",
    },
  }
);

const FeatureCard = React.forwardRef(
  (
    {
      icon: Icon,
      title,
      description,
      variant,
      size,
      interactive,
      iconPosition,
      iconSize,
      iconBg,
      className,
      titleClassName,
      descriptionClassName,
      iconClassName,
      iconWrapperClassName,
      contentClassName,
      onClick,
      ...props
    },
    ref
  ) => {
    const iconSizeMap = {
      sm: "h-5 w-5",
      default: "h-6 w-6",
      lg: "h-7 w-7",
    };

    const iconColorMap = {
      none: "text-primary-600 dark:text-primary-400",
      light: "text-primary-600 dark:text-primary-400",
      solid: "text-white",
      outline: "text-primary-600 dark:text-primary-400",
    };

    return (
      <div
        ref={ref}
        className={cn(
          featureCardVariants({
            variant,
            size,
            interactive,
            iconPosition,
            className,
          })
        )}
        onClick={onClick}
        {...props}
      >
        {iconPosition === "left" ? (
          <div className="flex">
            {Icon && (
              <div
                className={cn(
                  iconWrapperVariants({
                    size: iconSize,
                    bg: iconBg,
                  }),
                  "mr-4",
                  iconWrapperClassName
                )}
              >
                <Icon
                  className={cn(
                    iconSizeMap[iconSize],
                    iconColorMap[iconBg],
                    iconClassName
                  )}
                />
              </div>
            )}
            <div className={cn("flex-1", contentClassName)}>
              {title && (
                <h3
                  className={cn(
                    "text-xl font-bold text-gray-900 dark:text-white mb-2",
                    titleClassName
                  )}
                >
                  {title}
                </h3>
              )}
              {description && (
                <p
                  className={cn(
                    "text-gray-600 dark:text-gray-300",
                    descriptionClassName
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            {Icon && (
              <div
                className={cn(
                  iconWrapperVariants({
                    size: iconSize,
                    bg: iconBg,
                  }),
                  "mb-4",
                  iconWrapperClassName
                )}
              >
                <Icon
                  className={cn(
                    iconSizeMap[iconSize],
                    iconColorMap[iconBg],
                    iconClassName
                  )}
                />
              </div>
            )}
            <div className={cn(contentClassName)}>
              {title && (
                <h3
                  className={cn(
                    "text-xl font-bold text-gray-900 dark:text-white mb-2",
                    titleClassName
                  )}
                >
                  {title}
                </h3>
              )}
              {description && (
                <p
                  className={cn(
                    "text-gray-600 dark:text-gray-300",
                    descriptionClassName
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

// More specific feature card types

const InfoCard = React.forwardRef(
  ({ icon, title, description, className, ...props }, ref) => {
    return (
      <FeatureCard
        ref={ref}
        icon={icon}
        title={title}
        description={description}
        variant="outline"
        iconBg="light"
        className={cn("hover:border-blue-300", className)}
        {...props}
      />
    );
  }
);

InfoCard.displayName = "InfoCard";

const StatCard = React.forwardRef(
  (
    {
      icon,
      title,
      value,
      trend,
      trendLabel,
      description,
      className,
      valueClassName,
      trendClassName,
      ...props
    },
    ref
  ) => {
    const getTrendColor = () => {
      if (trend === 0) return "text-gray-500 dark:text-gray-400";
      return trend > 0
        ? "text-success-500 dark:text-success-400"
        : "text-error-500 dark:text-error-400";
    };

    const getTrendIcon = () => {
      if (trend === 0) return null;
      return trend > 0 ? "↑" : "↓";
    };

    return (
      <FeatureCard
        ref={ref}
        icon={icon}
        title={title}
        description={
          <div>
            <div className="flex items-baseline mt-1">
              <p
                className={cn(
                  "text-3xl font-semibold text-gray-900 dark:text-white",
                  valueClassName
                )}
              >
                {value}
              </p>
              {trend !== undefined && (
                <p
                  className={cn(
                    "ml-2 text-sm",
                    getTrendColor(),
                    trendClassName
                  )}
                >
                  {getTrendIcon()} {Math.abs(trend)}%
                  {trendLabel && (
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      ({trendLabel})
                    </span>
                  )}
                </p>
              )}
            </div>
            {description && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        }
        variant="default"
        iconBg="light"
        className={className}
        descriptionClassName="!p-0"
        {...props}
      />
    );
  }
);

StatCard.displayName = "StatCard";

const CalloutCard = React.forwardRef(
  (
    { title, description, action, variant = "primary", className, ...props },
    ref
  ) => {
    const variantStyles = {
      primary:
        "bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800",
      warning:
        "bg-warning-50 dark:bg-warning-900/10 border border-warning-100 dark:border-warning-800",
      error:
        "bg-error-50 dark:bg-error-900/10 border border-error-100 dark:border-error-800",
      success:
        "bg-success-50 dark:bg-success-900/10 border border-success-100 dark:border-success-800",
    };

    const titleStyles = {
      primary: "text-primary-800 dark:text-primary-200",
      warning: "text-warning-800 dark:text-warning-200",
      error: "text-error-800 dark:text-error-200",
      success: "text-success-800 dark:text-success-200",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-xl p-6", variantStyles[variant], className)}
        {...props}
      >
        <h3 className={cn("text-lg font-semibold mb-2", titleStyles[variant])}>
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
        {action}
      </div>
    );
  }
);

CalloutCard.displayName = "CalloutCard";

export { FeatureCard, InfoCard, StatCard, CalloutCard, featureCardVariants };
