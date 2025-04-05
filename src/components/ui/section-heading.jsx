import React from "react";
import { cn } from "../../lib/utils";

const SectionHeading = ({
  subtitle,
  title,
  description,
  className,
  align = "center",
}) => {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto" : "text-left",
        align === "center" ? "max-w-3xl" : "",
        className
      )}
    >
      <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase mb-2">
        {subtitle}
      </h2>
      <p className="mt-1 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white sm:tracking-tight leading-tight">
        {title}
      </p>
      {description && (
        <p className="max-w-3xl mt-4 md:mt-5 text-lg md:text-xl text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
