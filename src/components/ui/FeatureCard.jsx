import React from "react";

const FeatureCard = ({ icon: Icon, title, description, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 rounded-full p-3 mr-4">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
