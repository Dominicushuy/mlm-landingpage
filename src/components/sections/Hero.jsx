import React, { forwardRef, useEffect, useState } from "react";
import { Check, ArrowRight, PlusCircle } from "lucide-react";

const Hero = forwardRef(({ isVisible, scrollToSection, darkMode }, ref) => {
  const [typedText, setTypedText] = useState("");
  const fullText = "dành cho MLM";
  const [showDemo, setShowDemo] = useState(false);

  // Typing effect
  useEffect(() => {
    if (isVisible) {
      let i = 0;
      const typing = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
        }
      }, 100);
      return () => clearInterval(typing);
    }
  }, [isVisible]);

  return (
    <section
      id="intro"
      ref={ref}
      className={`min-h-screen flex items-center relative overflow-hidden transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-50"
      } ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 to-blue-900/30"
          : "bg-gradient-to-b from-white to-blue-50"
      }`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-72 h-72 bg-indigo-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 transform transition-all duration-700 translate-y-0">
            <div className="inline-block">
              <div className="flex items-center space-x-2 mb-4 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span>Kỷ nguyên mới của Marketing Automation</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 dark:text-blue-300 leading-tight">
              Marketing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Automation
              </span>
              <br />
              <span className="relative">
                <span className="mr-1">{typedText}</span>
                <span
                  className={`absolute w-0.5 h-8 bg-blue-600 dark:bg-blue-400 -right-1 bottom-1 ${
                    typedText === fullText ? "animate-blink" : "opacity-0"
                  }`}
                ></span>
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl">
              Chuyển đổi số và tự động hóa tiếp thị cho mô hình kinh doanh đa
              cấp trong kỷ nguyên thương mại điện tử.
            </p>

            <div className="space-y-4 pt-2">
              <FeatureCheckItem text="Tăng hiệu quả hoạt động và doanh thu" />
              <FeatureCheckItem text="Cá nhân hoá trải nghiệm khách hàng" />
              <FeatureCheckItem text="Tăng cường minh bạch trong quản lý" />
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection("invest")}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Tìm hiểu về đầu tư
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </button>

              <button
                onClick={() => setShowDemo(!showDemo)}
                className="inline-flex items-center px-6 py-3 border border-blue-600 dark:border-blue-400 text-base font-medium rounded-md text-blue-600 dark:text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                Xem demo
                <PlusCircle className="ml-2 -mr-1 h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="rounded-lg shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-105">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-800 dark:to-blue-600 p-8 text-white">
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
            <div className="bg-white dark:bg-gray-800 p-8">
              <ProgressBar label="Tiết kiệm thời gian & nguồn lực" value={85} />
              <ProgressBar label="Tăng hiệu quả marketing" value={78} />
              <ProgressBar
                label="Cải thiện trải nghiệm khách hàng"
                value={82}
              />
            </div>
          </div>
        </div>

        {/* Demo Modal */}
        {showDemo && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-6 relative">
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Demo Marketing Automation
              </h3>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-gray-700 dark:text-gray-300">
                  Nhập email của bạn để xem cách Marketing Automation hoạt động.
                  Bạn sẽ nhận được một chuỗi email tự động thể hiện quy trình
                  nuôi dưỡng khách hàng.
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Địa chỉ email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Bắt đầu Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

// Helper components for cleaner code
const FeatureCheckItem = ({ text }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
      <Check className="h-4 w-4" />
    </div>
    <p className="text-lg text-gray-600 dark:text-gray-300">{text}</p>
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
    <p className="text-gray-500 dark:text-gray-400 mb-2">{label}</p>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <div
        className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${value}%` }}
      ></div>
    </div>
    <p className="text-sm text-right text-gray-500 dark:text-gray-400 mt-1">
      {value}%
    </p>
  </div>
);

Hero.displayName = "Hero";

export default Hero;
