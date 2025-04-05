import React from "react";

const StatCard = ({ title, value, icon: Icon, trend, description }) => {
  const getTrendColor = () => {
    if (!trend) return "text-gray-500";
    return trend > 0 ? "text-green-500" : "text-red-500";
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend > 0 ? "↑" : "↓";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start">
        {Icon && (
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          <div className="flex items-baseline mt-1">
            <p className="text-3xl font-semibold text-gray-900">{value}</p>
            {trend !== undefined && (
              <p className={`ml-2 text-sm ${getTrendColor()}`}>
                {getTrendIcon()} {Math.abs(trend)}%
              </p>
            )}
          </div>
          {description && (
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
