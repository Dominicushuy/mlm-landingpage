import React, { forwardRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import PricingCard from "../ui/PricingCard";
import { pricingPlans } from "../../data/siteData";
import { ArrowRight } from "lucide-react";

const Investment = forwardRef(({ isVisible }, ref) => {
  return (
    <section
      id="invest"
      ref={ref}
      className={`py-24 bg-gradient-to-r from-blue-700 to-blue-500 text-white transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Cơ hội đầu tư"
          title="Tham gia cùng chúng tôi"
          description="Đầu tư vào tương lai của Marketing Automation trong ngành MLM tại Việt Nam"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              features={plan.features}
              buttonText={plan.buttonText}
              popular={plan.popular}
              buttonVariant={plan.buttonVariant}
            />
          ))}
        </div>

        <CallToAction />
      </div>
    </section>
  );
});

const CallToAction = () => (
  <div className="mt-16 text-center">
    <p className="mb-6 text-xl text-blue-100">
      Chúng tôi đang tìm kiếm các đối tác chiến lược để cùng xây dựng tương lai
      của Marketing Automation trong lĩnh vực MLM tại Việt Nam.
    </p>
    <a
      href="#"
      className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200 transition-colors shadow-lg"
    >
      Liên hệ đội ngũ đầu tư
      <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
    </a>
  </div>
);

Investment.displayName = "Investment";

export default Investment;
