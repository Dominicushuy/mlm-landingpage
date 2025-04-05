import React, { forwardRef } from "react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, Check } from "lucide-react";
import { pricingPlans } from "../../data/siteData";

const Investment = forwardRef(({ isVisible }, ref) => {
  return (
    <Section
      id="invest"
      ref={ref}
      variant="gradientPrimary"
      isVisible={isVisible}
      animation="fade-in"
      container
      className="text-white"
    >
      <SectionHeader>
        <SectionSubtitle variant="white">Cơ hội đầu tư</SectionSubtitle>
        <SectionTitle variant="white">Tham gia cùng chúng tôi</SectionTitle>
        <SectionDescription variant="white">
          Đầu tư vào tương lai của Marketing Automation trong ngành MLM tại Việt
          Nam
        </SectionDescription>
      </SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div key={index}>
            <PricingCard
              name={plan.name}
              price={plan.price}
              features={plan.features}
              buttonText={plan.buttonText}
              popular={plan.popular}
              buttonVariant={plan.buttonVariant}
            />
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="mb-6 text-xl text-blue-100">
          Chúng tôi đang tìm kiếm các đối tác chiến lược để cùng xây dựng tương
          lai của Marketing Automation trong lĩnh vực MLM tại Việt Nam.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="inline-flex items-center px-8 py-4 border border-white text-white bg-transparent hover:bg-white/10 focus:ring-offset-blue-500"
        >
          Liên hệ đội ngũ đầu tư
          <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
        </Button>
      </div>
    </Section>
  );
});

const PricingCard = ({
  name,
  price,
  features,
  buttonText,
  popular = false,
  buttonVariant = "outline",
}) => {
  return (
    <Card
      variant="default"
      className="bg-white text-gray-900 rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-105 h-full"
    >
      {popular && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Phổ biến nhất
          </span>
        </div>
      )}
      <CardContent className="p-6">
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
          <Button
            variant={buttonVariant === "solid" ? "default" : "outline"}
            className={
              buttonVariant === "solid"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "border-blue-600 text-blue-600 hover:bg-blue-50"
            }
          >
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

Investment.displayName = "Investment";

export default Investment;
