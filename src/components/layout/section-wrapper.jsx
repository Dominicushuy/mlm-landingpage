// src/components/layout/section-wrapper.jsx
import React from "react";
import { cn } from "../../lib/utils";

/**
 * Enhanced SectionWrapper component with seamless transitions between sections
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.id - Section ID (should match the navigation item ID)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.padding - Padding size (none, small, medium, large, xlarge)
 * @param {string} props.variant - Background style (CSS classes)
 * @returns {JSX.Element}
 */
const SectionWrapper = ({
  children,
  id,
  className = "",
  padding = "large",
  variant = "bg-white dark:bg-gray-900",
}) => {
  // Padding classes based on size
  const paddingClasses = {
    none: "",
    small: "py-8 md:py-12",
    medium: "py-12 md:py-16",
    large: "py-16 md:py-24",
    xlarge: "py-24 md:py-32",
  };

  return (
    <div
      id={id}
      className={cn(
        "relative w-full",
        variant,
        paddingClasses[padding] || padding,
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
