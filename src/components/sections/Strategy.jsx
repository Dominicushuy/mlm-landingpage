import React, { forwardRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import PieChartComponent from "../charts/PieChartComponent";
import {
  implementationPhases,
  benefitsPieChartData,
  CHART_COLORS,
} from "../../data/siteData";
import { Check } from "lucide-react";

const Strategy = forwardRef(({ isVisible }, ref) => {
  return (
    <section
      id="strategy"
      ref={ref}
      className={`py-24 bg-white transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Chiến lược"
          title="Chiến lược cho thị trường Việt Nam"
          description="Đề xuất chiến lược triển khai Marketing Automation cho doanh nghiệp MLM tại Việt Nam"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Yếu tố cần thiết
              </h3>
              <ul className="space-y-3 mt-4">
                <RequirementItem text="Cá nhân hoá trải nghiệm khách hàng" />
                <RequirementItem text="Tích hợp hệ thống quản lý CRM" />
                <RequirementItem text="Áp dụng công cụ tự động hóa đa kênh" />
                <RequirementItem text="Tuân thủ quy định pháp lý hiện hành" />
              </ul>
            </div>
          </div>

          <div className="bg-blue-700 shadow-lg rounded-xl overflow-hidden text-white md:col-span-2">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                Quy trình triển khai Marketing Automation
              </h3>
              <div className="space-y-6">
                {implementationPhases.map((phase, index) => (
                  <ImplementationStep
                    key={index}
                    number={index + 1}
                    name={phase.name}
                    description={phase.description}
                    isLast={index === implementationPhases.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Đề xuất cụ thể
            </h3>

            <div className="space-y-4">
              <RecommendationCard
                number="01"
                title="Đầu tư vào hệ thống CRM hiện đại"
                description="Tích hợp dữ liệu khách hàng từ nhiều nguồn để tạo ra một hồ sơ toàn diện. Sử dụng dữ liệu này để cá nhân hoá nội dung tiếp thị."
              />

              <RecommendationCard
                number="02"
                title="Xây dựng nền tảng tự động hóa tiếp thị đa kênh"
                description="Áp dụng các giải pháp tự động hóa email marketing, SMS, và push notification để tiếp cận khách hàng kịp thời."
              />

              <RecommendationCard
                number="03"
                title="Tích hợp phân tích dữ liệu và báo cáo"
                description="Sử dụng các công cụ phân tích BI để thu thập và xử lý dữ liệu kinh doanh theo thời gian thực."
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Lợi ích kỳ vọng
            </h3>

            <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl shadow-lg overflow-hidden text-white">
              <div className="p-6">
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-2">
                    Phân bổ lợi ích
                  </h4>
                  <div className="h-64">
                    <PieChartComponent
                      data={benefitsPieChartData}
                      colors={CHART_COLORS}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Helper components
const RequirementItem = ({ text }) => (
  <li className="flex items-start">
    <Check className="h-5 w-5 text-blue-500 mt-1 mr-2" />
    <span className="text-gray-600">{text}</span>
  </li>
);

const ImplementationStep = ({ number, name, description, isLast }) => (
  <div className="relative pl-8">
    <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-white text-blue-700 font-bold">
      {number}
    </div>
    <div>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-blue-100 mt-1">{description}</p>
    </div>
    {!isLast && (
      <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-white h-10"></div>
    )}
  </div>
);

const RecommendationCard = ({ number, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
    <h4 className="font-bold text-lg text-gray-900 mb-2">
      <span className="text-blue-600 mr-2">{number}</span>
      {title}
    </h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

Strategy.displayName = "Strategy";

export default Strategy;
