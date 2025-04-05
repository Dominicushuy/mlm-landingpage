import React, { forwardRef } from "react";
import { Check, ArrowRight } from "lucide-react";

const Hero = forwardRef(({ isVisible, scrollToSection }, ref) => {
  return (
    <section
      id="intro"
      ref={ref}
      className={`min-h-screen flex items-center transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-6 leading-tight">
              Marketing <span className="text-blue-600">Automation</span> dành
              cho MLM
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Chuyển đổi số và tự động hóa tiếp thị cho mô hình kinh doanh đa
              cấp trong kỷ nguyên thương mại điện tử.
            </p>
            <div className="space-y-4">
              <FeatureCheckItem text="Tăng hiệu quả hoạt động và doanh thu" />
              <FeatureCheckItem text="Cá nhân hoá trải nghiệm khách hàng" />
              <FeatureCheckItem text="Tăng cường minh bạch trong quản lý" />
            </div>
            <button
              onClick={() => scrollToSection("invest")}
              className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Tìm hiểu về đầu tư
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </button>
          </div>
          <div className="rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Chúng tôi mang đến giải pháp
              </h2>
              <div className="space-y-3">
                <SolutionItem text="Tự động hóa quản lý liên hệ và CRM" />
                <SolutionItem text="Tự động hóa Email Marketing và nuôi dưỡng khách hàng" />
                <SolutionItem text="Tự động hóa quản lý hoa hồng và lợi ích" />
                <SolutionItem text="Tích hợp công cụ phân tích dữ liệu (BI) và báo cáo" />
                <SolutionItem text="Tự động hóa phân phối thông báo qua đa kênh" />
              </div>
            </div>
            <div className="bg-white p-8">
              <ProgressBar label="Tiết kiệm thời gian & nguồn lực" value={85} />
              <ProgressBar label="Tăng hiệu quả marketing" value={78} />
              <ProgressBar
                label="Cải thiện trải nghiệm khách hàng"
                value={82}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Helper components for cleaner code
const FeatureCheckItem = ({ text }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800">
      <Check className="h-4 w-4" />
    </div>
    <p className="text-lg text-gray-600">{text}</p>
  </div>
);

const SolutionItem = ({ text }) => (
  <div className="flex items-center">
    <div className="flex-shrink-0 h-5 w-5 mr-3">
      <Check />
    </div>
    <p>{text}</p>
  </div>
);

const ProgressBar = ({ label, value }) => (
  <div className="text-center mt-4 first:mt-0">
    <p className="text-gray-500 mb-2">{label}</p>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
    <p className="text-sm text-right text-gray-500">{value}%</p>
  </div>
);

Hero.displayName = "Hero";

export default Hero;
