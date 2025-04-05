import React from "react";

const SectionHeading = ({ subtitle, title, description }) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
        {subtitle}
      </h2>
      <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
        {title}
      </p>
      {description && (
        <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
