import React from "react";
import { Check } from "lucide-react";

const PricingCard = ({
  name,
  price,
  features,
  buttonText,
  popular = false,
  buttonVariant = "outline",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-105 ${
        popular ? "relative" : ""
      }`}
    >
      {popular && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Phổ biến nhất
          </span>
        </div>
      )}
      <div className="p-6">
        <div className="w-full h-1 bg-blue-500 mb-6"></div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{name}</h3>
        <p className="text-4xl font-bold text-blue-600 mb-6">{price}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="text-center">
          <button
            className={`inline-flex items-center px-4 py-2 border ${
              buttonVariant === "solid"
                ? "border-transparent text-white bg-blue-600 hover:bg-blue-700"
                : "border-blue-600 text-blue-600 bg-white hover:bg-blue-50"
            } text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
