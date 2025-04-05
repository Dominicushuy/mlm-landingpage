import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const App = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = {
    intro: useRef(null),
    market: useRef(null),
    ecommerce: useRef(null),
    casestudy: useRef(null),
    solutions: useRef(null),
    tools: useRef(null),
    strategy: useRef(null),
    invest: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));

          // Update active section based on which section is most visible
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current.scrollIntoView({ behavior: "smooth" });
  };

  const amwayRevenueData = [
    { year: "2019", revenue: 8.2 },
    { year: "2020", revenue: 8.0 },
    { year: "2021", revenue: 7.9 },
    { year: "2022", revenue: 8.1 },
    { year: "2023", revenue: 7.7 },
  ];

  const marketGrowthData = [
    { year: "2019", mlm: 190, ecommerce: 3500 },
    { year: "2020", mlm: 185, ecommerce: 4200 },
    { year: "2021", mlm: 180, ecommerce: 5100 },
    { year: "2022", mlm: 188, ecommerce: 5800 },
    { year: "2023", mlm: 182, ecommerce: 6500 },
  ];

  const automationBenefitsData = [
    { name: "Tiết kiệm thời gian", value: 85 },
    { name: "Tăng hiệu suất", value: 78 },
    { name: "Cá nhân hóa", value: 82 },
    { name: "Minh bạch", value: 75 },
    { name: "Tăng doanh thu", value: 80 },
  ];

  const toolsComparisonData = [
    { name: "Quản lý hoa hồng", epixel: 90, global: 80, bi: 50 },
    { name: "CRM", epixel: 85, global: 90, bi: 60 },
    { name: "Email Marketing", epixel: 80, global: 85, bi: 40 },
    { name: "Phân tích dữ liệu", epixel: 75, global: 70, bi: 95 },
    { name: "Tích hợp đa kênh", epixel: 85, global: 80, bi: 50 },
  ];

  const implementationPhases = [
    { name: "Khởi tạo", description: "Xác định mục tiêu và phạm vi dự án" },
    {
      name: "Thu thập dữ liệu",
      description: "Phân loại khách hàng và phân tích thị trường",
    },
    {
      name: "Tích hợp hệ thống",
      description: "Kết nối CRM và nền tảng tự động hóa",
    },
    {
      name: "Triển khai",
      description: "Triển khai chiến dịch và theo dõi kết quả",
    },
    {
      name: "Đánh giá và cải tiến",
      description: "Phân tích hiệu quả và tối ưu hóa",
    },
  ];

  const COLORS = ["#1e40af", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* Sticky navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-700">
                MA<span className="text-blue-500">MLM</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {Object.keys(sectionRefs).map((key) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                      activeSection === key
                        ? "text-blue-700 bg-blue-50"
                        : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    {key === "intro" && "Giới thiệu"}
                    {key === "market" && "Thị trường"}
                    {key === "ecommerce" && "Tác động TMĐT"}
                    {key === "casestudy" && "Case Study"}
                    {key === "solutions" && "Giải pháp"}
                    {key === "tools" && "Công cụ"}
                    {key === "strategy" && "Chiến lược"}
                    {key === "invest" && "Đầu tư"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section
        id="intro"
        ref={sectionRefs.intro}
        className={`min-h-screen flex items-center transition-opacity duration-1000 ${
          isVisible.intro ? "opacity-100" : "opacity-50"
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
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-600">
                    Tăng hiệu quả hoạt động và doanh thu
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-600">
                    Cá nhân hoá trải nghiệm khách hàng
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-600">
                    Tăng cường minh bạch trong quản lý
                  </p>
                </div>
              </div>
              <button
                onClick={() => scrollToSection("invest")}
                className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Tìm hiểu về đầu tư
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
            <div className="rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">
                  Chúng tôi mang đến giải pháp
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 mr-3">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p>Tự động hóa quản lý liên hệ và CRM</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 mr-3">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p>Tự động hóa Email Marketing và nuôi dưỡng khách hàng</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 mr-3">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p>Tự động hóa quản lý hoa hồng và lợi ích</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 mr-3">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p>Tích hợp công cụ phân tích dữ liệu (BI) và báo cáo</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 mr-3">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p>Tự động hóa phân phối thông báo qua đa kênh</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">
                    Tiết kiệm thời gian & nguồn lực
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-right text-gray-500">85%</p>
                </div>
                <div className="text-center mt-4">
                  <p className="text-gray-500 mb-2">Tăng hiệu quả marketing</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-right text-gray-500">78%</p>
                </div>
                <div className="text-center mt-4">
                  <p className="text-gray-500 mb-2">
                    Cải thiện trải nghiệm khách hàng
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-right text-gray-500">82%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section
        id="market"
        ref={sectionRefs.market}
        className={`py-24 bg-white transition-opacity duration-1000 ${
          isVisible.market ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Phân tích thị trường
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Thị trường MLM và xu hướng
            </p>
            <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
              Tìm hiểu về sự phát triển của thị trường MLM toàn cầu và tại Việt
              Nam, cùng với các xu hướng mới nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Thị trường toàn cầu
                </h3>
                <p className="text-gray-600 mb-6">
                  Mô hình MLM góp phần đáng kể vào tổng doanh thu toàn cầu với
                  các công ty lớn như Amway, Herbalife và Natura &Co. Tuy nhiên,
                  thị trường đang đối mặt với sự cạnh tranh mạnh mẽ từ thương
                  mại điện tử.
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="mlm"
                        name="Doanh thu MLM (tỷ USD)"
                        fill="#3b82f6"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Thị trường Việt Nam
                </h3>
                <p className="text-gray-600 mb-6">
                  Tại Việt Nam, mô hình MLM đang có nhiều tiềm năng phát triển
                  với dân số trẻ, tiếp cận công nghệ cao và sự thay đổi về thói
                  quen tiêu dùng.
                </p>
                <div className="space-y-4 mt-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">
                      Tiềm năng tăng trưởng
                    </h4>
                    <p className="text-gray-600">
                      Thị trường Việt Nam có tiềm năng tăng trưởng rất lớn với
                      dân số trẻ, am hiểu công nghệ.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">
                      Thách thức pháp lý
                    </h4>
                    <p className="text-gray-600">
                      Cần tuân thủ các quy định pháp luật và đảm bảo tính minh
                      bạch trong hoạt động.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900">
                      Nhu cầu số hóa
                    </h4>
                    <p className="text-gray-600">
                      Việc ứng dụng công nghệ trong quản lý và tiếp thị đang trở
                      thành nhu cầu thiết yếu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce impact */}
      <section
        id="ecommerce"
        ref={sectionRefs.ecommerce}
        className={`py-24 bg-gradient-to-r from-blue-50 to-indigo-50 transition-opacity duration-1000 ${
          isVisible.ecommerce ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Tác động TMĐT
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Thương mại điện tử thay đổi MLM
            </p>
            <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
              Tác động của thương mại điện tử đến mô hình kinh doanh đa cấp
              truyền thống
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="mlm"
                      name="Thị trường MLM (tỷ USD)"
                      stroke="#3b82f6"
                    />
                    <Line
                      type="monotone"
                      dataKey="ecommerce"
                      name="Thương mại điện tử (tỷ USD)"
                      stroke="#ef4444"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 text-center text-gray-500 italic">
                So sánh tăng trưởng thị trường MLM và thương mại điện tử toàn
                cầu
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Những thách thức mới
              </h3>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      Mất đi yếu tố tương tác trực tiếp
                    </h4>
                    <p className="mt-2 text-gray-600">
                      Mô hình MLM vốn dựa vào sự tương tác trực tiếp giữa người
                      bán hàng và khách hàng, điều này có thể bị suy yếu khi
                      dịch chuyển sang nền tảng trực tuyến.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      Sự cạnh tranh tăng cao
                    </h4>
                    <p className="mt-2 text-gray-600">
                      Khi thị trường chuyển sang hình thức bán hàng trực tuyến,
                      số lượng các đối thủ cạnh tranh tăng lên rõ rệt, đặc biệt
                      là từ các doanh nghiệp chuyên nghiệp.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      Thay đổi hành vi người tiêu dùng
                    </h4>
                    <p className="mt-2 text-gray-600">
                      Người tiêu dùng ngày nay ưa chuộng sự tiện lợi và cá nhân
                      hoá trong trải nghiệm mua sắm, đòi hỏi các mô hình MLM
                      phải thích nghi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section
        id="casestudy"
        ref={sectionRefs.casestudy}
        className={`py-24 bg-white transition-opacity duration-1000 ${
          isVisible.casestudy ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Case Study
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Amway: Thách thức trong kỷ nguyên số
            </p>
            <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
              Phân tích tình hình doanh thu và những thách thức của Amway - một
              biểu tượng trong ngành MLM
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Doanh thu Amway (2019-2023)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={amwayRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[7.5, 8.5]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        name="Doanh thu (tỷ USD)"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 bg-white p-4 rounded-lg border border-blue-100">
                  <p className="text-gray-700">
                    Doanh thu toàn cầu của Amway năm 2023 đạt khoảng 7,7 tỷ USD,
                    giảm 5% so với năm 2022. Thông tin này cho thấy một dấu hiệu
                    cảnh báo rằng mô hình kinh doanh truyền thống đang gặp khó
                    khăn.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-blue-700 text-white">
                <h3 className="text-2xl font-bold mb-6">
                  Nguyên nhân sụt giảm
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-white text-blue-700 mt-1">
                      <span className="font-bold">1</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium">
                        Thay đổi hành vi người tiêu dùng
                      </h4>
                      <p className="mt-1 text-blue-100">
                        Người tiêu dùng ngày nay ưa chuộng sự tiện lợi và cá
                        nhân hoá trong trải nghiệm mua sắm.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-white text-blue-700 mt-1">
                      <span className="font-bold">2</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium">
                        Áp lực cạnh tranh từ TMĐT
                      </h4>
                      <p className="mt-1 text-blue-100">
                        Sự ra đời của các nền tảng bán hàng trực tuyến đã làm
                        tăng tính cạnh tranh, khiến các công ty MLM không thể
                        dựa vào mối quan hệ cá nhân truyền thống.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-white text-blue-700 mt-1">
                      <span className="font-bold">3</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium">
                        Thiếu sự đổi mới công nghệ
                      </h4>
                      <p className="mt-1 text-blue-100">
                        Các công ty MLM chưa tích hợp đầy đủ các giải pháp
                        Marketing Automation và các công cụ số hoá khác, dẫn đến
                        quản lý mạng lưới phân phối trở nên lỗi thời.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Biến động doanh thu Amway (2019-2023)
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Dựa trên dữ liệu từ các báo cáo kinh doanh
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Năm
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Doanh thu (tỷ USD)
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tỷ lệ tăng trưởng (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          2019
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          8,2
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          -
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          2020
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          8,0
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                          -2,44%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          2021
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          7,9
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                          -1,25%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          2022
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          8,1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                          +2,53%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          2023
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          7,7
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                          -4,94%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section
        id="solutions"
        ref={sectionRefs.solutions}
        className={`py-24 bg-gradient-to-b from-white to-blue-50 transition-opacity duration-1000 ${
          isVisible.solutions ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Giải pháp
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Marketing Automation cho MLM
            </p>
            <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
              Các giải pháp công nghệ tự động hóa giúp nâng cao hiệu quả hoạt
              động và chuyển đổi số cho mô hình MLM
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={automationBenefitsData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Hiệu quả (%)" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Lợi ích của Marketing Automation
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Giảm tải khối lượng công việc thủ công
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Tăng hiệu quả kinh doanh và tính chính xác
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Cá nhân hoá trải nghiệm khách hàng
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Tăng cường minh bạch trong quản lý hoa hồng
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Hỗ trợ ra quyết định dựa trên dữ liệu thực tế
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Tự động hóa quản lý liên hệ và CRM
                  </h3>
                </div>
                <p className="text-gray-600">
                  Tích hợp hệ thống CRM giúp lưu trữ, phân loại và theo dõi
                  thông tin khách hàng một cách khoa học. Tự động cập nhật các
                  thông tin tương tác, giúp phân tích hành vi khách hàng để đưa
                  ra các giải pháp tiếp thị cá nhân hoá.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Tự động hóa Email Marketing
                  </h3>
                </div>
                <p className="text-gray-600">
                  Sử dụng các công cụ như MailChimp, Marketo để tự động gửi
                  email theo lịch trình, phân chia danh sách theo nhóm khách
                  hàng nhằm gửi thông điệp phù hợp vào thời điểm thích hợp.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Tự động hóa quản lý hoa hồng
                  </h3>
                </div>
                <p className="text-gray-600">
                  Các hệ thống tự động tính toán và phân phối hoa hồng dựa trên
                  hiệu suất của mạng lưới phân phối, giảm thiểu sai sót và đảm
                  bảo tính minh bạch.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Tích hợp phân tích dữ liệu (BI)
                  </h3>
                </div>
                <p className="text-gray-600">
                  Sử dụng các nền tảng BI như Tableau, Sisense để theo dõi và
                  phân tích dữ liệu kinh doanh theo thời gian thực, từ đó đưa ra
                  các dự báo chính xác và hỗ trợ quyết định chiến lược.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section
        id="tools"
        ref={sectionRefs.tools}
        className={`py-24 bg-blue-50 transition-opacity duration-1000 ${
          isVisible.tools ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Công cụ
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              So sánh công cụ tự động hóa
            </p>
            <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
              Phân tích và so sánh các công cụ tự động hóa tiếp thị hiện có cho
              mô hình MLM
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                So sánh chức năng các công cụ
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={toolsComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="epixel"
                      name="Epixel MLM Software"
                      fill="#3b82f6"
                    />
                    <Bar
                      dataKey="global"
                      name="Global MLM Software"
                      fill="#60a5fa"
                    />
                    <Bar
                      dataKey="bi"
                      name="Công cụ BI (Tableau/Sisense)"
                      fill="#93c5fd"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white shadow-lg rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tiêu chí
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Epixel MLM Software
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Global MLM Software
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Công cụ BI (Tableau, Sisense)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Quản lý Hoa hồng
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Tự động hóa tính toán hoa hồng, báo cáo minh bạch
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Tự động tính toán và phân phối hoa hồng
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Không áp dụng trực tiếp
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    CRM
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Quản lý mạng lưới phân phối đầy đủ, CRM tích hợp
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Quản lý thông tin liên hệ, tự động cập nhật CRM
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Hỗ trợ phân tích dữ liệu phân phối
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Email Marketing
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Hỗ trợ các chiến dịch email tự động
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Hỗ trợ tự động nuôi dưỡng khách hàng qua email
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Không áp dụng trực tiếp
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Phân tích Dữ liệu
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Báo cáo tự động, tích hợp BI
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Tích hợp các công cụ phân tích và báo cáo
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Phân tích chuyên sâu
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Tích hợp Đa kênh
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Tích hợp thông báo qua SMS, email và mạng xã hội
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Tích hợp tương tác đa kênh
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    Không áp dụng trực tiếp
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Strategy */}
      <section
        id="strategy"
        ref={sectionRefs.strategy}
        className={`py-24 bg-white transition-opacity duration-1000 ${
          isVisible.strategy ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Chiến lược
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Chiến lược cho thị trường Việt Nam
            </p>
            <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
              Đề xuất chiến lược triển khai Marketing Automation cho doanh
              nghiệp MLM tại Việt Nam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Yếu tố cần thiết
                </h3>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-blue-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Cá nhân hoá trải nghiệm khách hàng
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-blue-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Tích hợp hệ thống quản lý CRM
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-blue-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Áp dụng công cụ tự động hóa đa kênh
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-blue-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Tuân thủ quy định pháp lý hiện hành
                    </span>
                  </li>
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
                    <div key={index} className="relative pl-8">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-white text-blue-700 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{phase.name}</h4>
                        <p className="text-blue-100 mt-1">
                          {phase.description}
                        </p>
                      </div>
                      {index < implementationPhases.length - 1 && (
                        <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-white h-10"></div>
                      )}
                    </div>
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
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    <span className="text-blue-600 mr-2">01</span>
                    Đầu tư vào hệ thống CRM hiện đại
                  </h4>
                  <p className="text-gray-600">
                    Tích hợp dữ liệu khách hàng từ nhiều nguồn để tạo ra một hồ
                    sơ toàn diện. Sử dụng dữ liệu này để cá nhân hoá nội dung
                    tiếp thị.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    <span className="text-blue-600 mr-2">02</span>
                    Xây dựng nền tảng tự động hóa tiếp thị đa kênh
                  </h4>
                  <p className="text-gray-600">
                    Áp dụng các giải pháp tự động hóa email marketing, SMS, và
                    push notification để tiếp cận khách hàng kịp thời.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    <span className="text-blue-600 mr-2">03</span>
                    Tích hợp phân tích dữ liệu và báo cáo
                  </h4>
                  <p className="text-gray-600">
                    Sử dụng các công cụ phân tích BI để thu thập và xử lý dữ
                    liệu kinh doanh theo thời gian thực.
                  </p>
                </div>
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
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Tăng hiệu quả hoạt động", value: 30 },
                              { name: "Cá nhân hoá trải nghiệm", value: 25 },
                              { name: "Tăng cường minh bạch", value: 20 },
                              { name: "Tăng doanh thu", value: 25 },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {[0, 1, 2, 3].map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment CTA */}
      <section
        id="invest"
        ref={sectionRefs.invest}
        className={`py-24 bg-gradient-to-r from-blue-700 to-blue-500 text-white transition-opacity duration-1000 ${
          isVisible.invest ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-blue-100 tracking-wide uppercase">
              Cơ hội đầu tư
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight">
              Tham gia cùng chúng tôi
            </p>
            <p className="max-w-3xl mt-5 mx-auto text-xl text-blue-100">
              Đầu tư vào tương lai của Marketing Automation trong ngành MLM tại
              Việt Nam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-105">
              <div className="p-6">
                <div className="w-full h-1 bg-blue-500 mb-6"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Gói Startup
                </h3>
                <p className="text-4xl font-bold text-blue-600 mb-6">
                  ₫500 triệu
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Phát triển nền tảng cơ bản
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">Tích hợp CRM đơn giản</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">Đào tạo nhóm cốt lõi</span>
                  </li>
                </ul>
                <div className="text-center">
                  <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Tìm hiểu thêm
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-105 relative">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Phổ biến nhất
                </span>
              </div>
              <div className="p-6">
                <div className="w-full h-1 bg-blue-600 mb-6"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Gói Doanh nghiệp
                </h3>
                <p className="text-4xl font-bold text-blue-600 mb-6">₫2 tỷ</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Nền tảng đầy đủ tính năng
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Tự động hóa tiếp thị đa kênh
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Phân tích dữ liệu và báo cáo BI
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Đào tạo toàn diện đội ngũ
                    </span>
                  </li>
                </ul>
                <div className="text-center">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Liên hệ ngay
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-105">
              <div className="p-6">
                <div className="w-full h-1 bg-blue-500 mb-6"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Gói Enterprise
                </h3>
                <p className="text-4xl font-bold text-blue-600 mb-6">Liên hệ</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Giải pháp tùy chỉnh hoàn toàn
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">AI và học máy dự đoán</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Tư vấn chiến lược toàn diện
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Phát triển hệ sinh thái
                    </span>
                  </li>
                </ul>
                <div className="text-center">
                  <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Đặt lịch tư vấn
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="mb-6 text-xl text-blue-100">
              Chúng tôi đang tìm kiếm các đối tác chiến lược để cùng xây dựng
              tương lai của Marketing Automation trong lĩnh vực MLM tại Việt
              Nam.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200 transition-colors shadow-lg"
            >
              Liên hệ đội ngũ đầu tư
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                MA<span className="text-blue-400">MLM</span>
              </div>
              <p className="text-gray-400">
                Nền tảng Marketing Automation toàn diện cho mô hình kinh doanh
                đa cấp trong kỷ nguyên số.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Giải pháp</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Quản lý liên hệ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Email Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Quản lý hoa hồng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Phân tích dữ liệu
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Công ty</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Đối tác
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tin tức
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-400 mt-1 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-400">+84 123 456 789</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-400 mt-1 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-400">info@mamlm.vn</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-400 mt-1 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-400">
                    Tầng 15, Tòa nhà Landmark 81, TP HCM
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 MAMLM. Tất cả các quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
