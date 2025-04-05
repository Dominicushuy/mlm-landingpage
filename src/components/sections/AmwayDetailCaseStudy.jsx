import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Database,
  BarChart2,
  Lock,
  Smartphone,
  Zap,
} from "lucide-react";
import SectionHeading from "../ui/section-heading";

const AmwayDetailCaseStudy = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("tech");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section
      id="amway-detail"
      className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Chi tiết Case Study"
          title="Amway - Chuyển đổi số trong MLM"
          description="Phân tích chuyên sâu về cách Amway ứng dụng công nghệ số, marketing tự động, CRM và phân tích dữ liệu để tối ưu hóa mô hình MLM"
        />

        {/* Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm bg-white dark:bg-gray-800">
            <button
              onClick={() => handleTabChange("tech")}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                activeTab === "tech"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Tích hợp công nghệ
            </button>
            <button
              onClick={() => handleTabChange("crm")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "crm"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              CRM & Marketing Automation
            </button>
            <button
              onClick={() => handleTabChange("data")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "data"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Phân tích dữ liệu
            </button>
            <button
              onClick={() => handleTabChange("trends")}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                activeTab === "trends"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Xu hướng tương lai
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="mt-8">
          {activeTab === "tech" && <TechIntegrationTab darkMode={darkMode} />}

          {activeTab === "crm" && <CrmMarketingTab darkMode={darkMode} />}

          {activeTab === "data" && <DataAnalyticsTab darkMode={darkMode} />}

          {activeTab === "trends" && <TrendsTab darkMode={darkMode} />}
        </div>

        {/* FAQs */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Câu hỏi thường gặp
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <button
                  className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white py-2"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-500" />
                  )}
                </button>

                {expandedFaq === index && (
                  <div className="mt-2 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Tab components
const TechIntegrationTab = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Vai trò của công nghệ số trong MLM
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Trong những năm gần đây, công nghệ số đã trở thành động lực chính
            giúp các doanh nghiệp mở rộng quy mô và tối ưu hóa hoạt động kinh
            doanh. Đối với Amway, việc tích hợp công nghệ số không chỉ giúp quản
            lý hệ thống nhà phân phối rộng khắp toàn cầu mà còn nâng cao hiệu
            quả quản lý lượt tương tác với khách hàng.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
            Ứng dụng phần mềm CRM trong Amway
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Phần mềm CRM chuyên dụng trong ngành MLM là một thành phần không thể
            thiếu để theo dõi và quản lý các hoạt động của nhà phân phối cũng
            như tương tác với khách hàng.
          </p>

          <div className="mt-8 space-y-4">
            <FeatureItem
              icon={<Database />}
              title="Tập trung hóa dữ liệu"
              description="Qua việc lưu trữ thông tin tập trung, Amway có thể theo dõi lịch sử giao dịch, phân tích dữ liệu hành vi và tối ưu hóa cơ cấu tổ chức của hệ thống MLM."
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-600 dark:bg-blue-800 rounded-xl shadow-lg overflow-hidden text-white">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-6">
            Hệ sinh thái kỹ thuật số trong Amway
          </h3>

          <div className="space-y-6">
            <TechFeatureItem
              title="Ứng dụng di động và nền tảng trực tuyến"
              description="Hệ thống di động giúp các nhà phân phối cập nhật thông tin, đặt hàng và theo dõi hoạt động bán hàng mọi lúc mọi nơi."
            />

            <TechFeatureItem
              title="Tích hợp công nghệ blockchain"
              description="Để tăng cường tính minh bạch và an toàn trong giao dịch, Amway tiên phong ứng dụng blockchain nhằm theo dõi quá trình giao dịch."
            />

            <TechFeatureItem
              title="Marketing liên kết (Affiliate Marketing)"
              description="Hệ thống tích hợp chiến lược marketing liên kết giúp Amway mở rộng thị trường thông qua việc hợp tác với các blogger, influencer."
            />
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            So sánh mô hình truyền thống và mô hình kỹ thuật số
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Phương pháp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Mô hình truyền thống
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Mô hình kỹ thuật số
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Quản lý dữ liệu
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
                    Lưu trữ rời rạc, sử dụng sổ tay và bảng tính → cập nhật thủ
                    công
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
                    Hệ thống CRM tập trung, tự động cập nhật và phân tích dữ
                    liệu theo thời gian thực
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Liên lạc và hỗ trợ
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
                    Giao tiếp qua điện thoại, họp mặt trực tiếp → hạn chế vùng
                    địa lý
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
                    Email, SMS, ứng dụng di động và mạng xã hội tạo sự tương tác
                    liên tục rộng khắp toàn cầu
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Tính minh bạch trong giao dịch
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
                    Rủi ro sai sót, thiếu tính minh bạch trong giao dịch
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
                    Công nghệ blockchain đảm bảo giao dịch an toàn và minh bạch
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Chiến lược marketing
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
                    Quảng cáo truyền hình, báo in → chi phí cao, tiếp cận hạn
                    chế
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
                    Marketing trực tuyến kết hợp SEO, PPC, mạng xã hội → tiếp
                    cận mục tiêu, chi phí hiệu quả
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const CrmMarketingTab = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Tự động hóa marketing trong hoạt động MLM
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Marketing tự động là một trong những xu thế đột phá, giúp các doanh
            nghiệp giảm thiểu tối đa thời gian và công sức cho các chiến dịch
            quảng cáo và tiếp thị. Đối với Amway, tự động hóa marketing được
            thực hiện qua các công cụ:
          </p>

          <div className="space-y-4 mt-6">
            <AutomationFeature
              title="Email Marketing tự động"
              description="Tạo chiến dịch quảng cáo cá nhân hóa dựa trên dữ liệu khách hàng, từ đó thúc đẩy tỷ lệ chuyển đổi và tương tác."
            />

            <AutomationFeature
              title="Chiến dịch SMS và thông báo đẩy"
              description="Thông qua các dịch vụ tự động gửi tin nhắn, Amway đảm bảo các thông tin cập nhật, khuyến mãi và hỗ trợ được truyền tải kịp thời đến khách hàng."
            />

            <AutomationFeature
              title="Phân khúc thị trường"
              description="Công cụ tự động giúp phân chia khách hàng thành các nhóm dựa trên hành vi mua sắm, sở thích và lịch sử giao dịch, giúp tối ưu hóa chiến lược marketing."
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quản lý quan hệ khách hàng (CRM) trong Amway
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Quản lý quan hệ khách hàng không chỉ hỗ trợ việc chăm sóc khách hàng
            chuyên nghiệp mà còn là công cụ đắc lực giúp theo dõi hiệu suất của
            nhà phân phối.
          </p>

          <div className="space-y-4 mt-6">
            <CrmFeature
              title="Theo dõi quy trình bán hàng"
              description="Từ khâu tiếp cận khách hàng tiềm năng, chuyển đổi thành khách hàng thực sự đến việc theo dõi hậu mãi. Hệ thống ghi nhận các tương tác và đưa ra báo cáo chi tiết."
            />

            <CrmFeature
              title="Phân tích hiệu suất nhà phân phối"
              description="Các bảng biểu, dashboard hiển thị các chỉ số hiệu suất chính (KPIs) giúp cấp quản lý theo dõi sát sao doanh số và năng lực của từng nhà phân phối."
            />

            <CrmFeature
              title="Tích hợp công cụ tự động tính hoa hồng"
              description="Hệ thống tự động tính toán hoa hồng dựa trên doanh số và số lượng tuyển dụng của nhà phân phối, giảm bớt công việc thủ công và đảm bảo tính chính xác."
            />
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-blue-700 dark:bg-blue-900 rounded-xl shadow-lg overflow-hidden text-white">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-6">
            Quy trình quản lý nhà phân phối
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ProcessStep
              number="01"
              title="Thu thập dữ liệu khách hàng"
              description="Tổng hợp thông tin từ nhiều nguồn và tích hợp vào hệ thống CRM trung tâm."
            />

            <ProcessStep
              number="02"
              title="Phân khúc thị trường"
              description="Phân chia khách hàng thành các nhóm dựa trên hành vi và nhu cầu."
            />

            <ProcessStep
              number="03"
              title="Tự động marketing"
              description="Triển khai chiến dịch email, SMS và thông báo được cá nhân hóa."
            />

            <ProcessStep
              number="04"
              title="Phân tích và tối ưu"
              description="Giám sát hiệu suất và điều chỉnh chiến lược dựa trên kết quả phân tích."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DataAnalyticsTab = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Vai trò của phân tích dữ liệu trong kinh doanh MLM
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Trong kỷ nguyên số, dữ liệu được xem là nguồn tài nguyên quý giá để
            đưa ra các quyết định chiến lược. Các doanh nghiệp MLM như Amway đã
            ứng dụng phân tích dữ liệu để:
          </p>

          <div className="space-y-4 mt-6">
            <AnalyticsFeature
              title="Theo dõi hiệu suất bán hàng"
              description="Thu thập và phân tích dữ liệu về doanh số, hoạt động bán hàng của các nhà phân phối để đánh giá hiệu suất kinh doanh."
            />

            <AnalyticsFeature
              title="Dự báo xu hướng thị trường"
              description="Sử dụng các công cụ phân tích dự đoán xu hướng tiêu dùng, từ đó đưa ra các chiến lược marketing và phát triển sản phẩm kịp thời."
            />

            <AnalyticsFeature
              title="Nâng cao chất lượng chăm sóc khách hàng"
              description="Đánh giá phản hồi và hành vi mua sắm của khách hàng để cải thiện dịch vụ và tạo ra các chương trình khuyến mãi phù hợp."
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-600 dark:bg-blue-800 rounded-xl shadow-lg overflow-hidden text-white">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">
            Công cụ và phương pháp phân tích dữ liệu
          </h3>

          <p className="text-blue-100 mb-4">
            Các công cụ phân tích hiện đại được tích hợp vào hệ thống MLM giúp
            Amway có cái nhìn chi tiết và tức thời về:
          </p>

          <div className="space-y-6 mt-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white text-blue-600 flex items-center justify-center mr-4">
                <BarChart2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-medium">
                  Báo cáo hiệu suất theo thời gian thực
                </h4>
                <p className="mt-1 text-blue-100">
                  Dashboard hiển thị các chỉ số quan trọng như doanh số, số
                  lượng nhà phân phối hoạt động, và mức độ tương tác với khách
                  hàng.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white text-blue-600 flex items-center justify-center mr-4">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-medium">
                  Phân tích dự đoán (Predictive Analytics)
                </h4>
                <p className="mt-1 text-blue-100">
                  Sử dụng các thuật toán Machine Learning để dự đoán xu hướng
                  tiêu dùng và hiệu suất tuyển dụng trong tương lai.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white text-blue-600 flex items-center justify-center mr-4">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-medium">
                  Báo cáo hành vi khách hàng
                </h4>
                <p className="mt-1 text-blue-100">
                  Phân tích dữ liệu từ các kênh trực tuyến như website, ứng dụng
                  di động và mạng xã hội giúp xác định các hành vi tiêu dùng và
                  đưa ra các khuyến nghị cá nhân hóa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Lợi ích từ việc phân tích dữ liệu
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <BenefitCard
              title="Tăng cường năng lực cạnh tranh"
              description="Cung cấp thông tin nhanh chóng và chính xác giúp Amway điều chỉnh chiến lược kịp thời, vượt qua đối thủ."
              darkMode={darkMode}
            />

            <BenefitCard
              title="Cải thiện trải nghiệm khách hàng"
              description="Qua việc theo dõi liên tục hành vi khách hàng, Amway có thể đưa ra những chương trình khuyến mãi và chăm sóc khách hàng phù hợp."
              darkMode={darkMode}
            />

            <BenefitCard
              title="Tối ưu hóa quy trình hoạt động"
              description="Nhờ dữ liệu phân tích, các quyết định về tuyển dụng, đào tạo và hỗ trợ nhà phân phối được cải thiện vượt trội."
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendsTab = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Thách thức hiện tại
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Mặc dù các công nghệ số và hệ thống tự động đã mở ra nhiều cơ hội,
            Amway – cùng với các doanh nghiệp MLM khác – cũng phải đối mặt với
            một số thách thức khó khăn:
          </p>

          <div className="space-y-4 mt-6">
            <ChallengeItem
              title="Vấn đề đào tạo và chuyển đổi số"
              description="Nhiều nhà phân phối truyền thống còn gặp khó khăn trong việc làm quen với hệ thống tự động và công nghệ hiện đại."
              darkMode={darkMode}
            />

            <ChallengeItem
              title="Chi phí đầu tư ban đầu cao"
              description="Triển khai các hệ thống CRM tiên tiến, tự động hoá marketing và phân tích dữ liệu đòi hỏi một khoản đầu tư lớn."
              darkMode={darkMode}
            />

            <ChallengeItem
              title="Đảm bảo an ninh và bảo mật"
              description="Khi dữ liệu khách hàng và giao dịch được số hóa, việc bảo vệ thông tin trước các mối đe dọa từ bên ngoài trở nên cấp bách."
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Xu hướng phát triển trong tương lai
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Để vượt qua những thách thức trên, Amway và các doanh nghiệp MLM
            khác cần theo kịp các xu hướng công nghệ hiện đại:
          </p>

          <div className="space-y-4 mt-6">
            <TrendItem
              icon={<Zap className="h-5 w-5 text-blue-600" />}
              title="Ứng dụng trí tuệ nhân tạo (AI) và Big Data"
              description="Việc áp dụng AI vào quá trình phân tích dữ liệu sẽ giúp cải thiện khả năng dự báo xu hướng và tối ưu hóa quy trình quản lý."
            />

            <TrendItem
              icon={<Smartphone className="h-5 w-5 text-blue-600" />}
              title="Phát triển ứng dụng di động và nền tảng đám mây"
              description="Giúp nhà phân phối và khách hàng truy cập dịch vụ mọi lúc, mọi nơi, đồng thời hỗ trợ việc cập nhật thông tin và giao tiếp liên tục."
            />

            <TrendItem
              icon={<Lock className="h-5 w-5 text-blue-600" />}
              title="Nâng cao tính minh bạch qua blockchain"
              description="Công nghệ blockchain sẽ tiếp tục được cải tiến để cung cấp mức độ bảo mật và minh bạch cao hơn cho các giao dịch."
            />
          </div>
        </div>
      </div>

      <div className="md:col-span-2 bg-blue-700 dark:bg-blue-900 rounded-xl shadow-lg overflow-hidden text-white">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-6">Kết luận</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Qua việc ứng dụng công nghệ số, tự động hóa marketing, CRM và
                phân tích dữ liệu, Amway đã tạo ra những thay đổi căn bản trong
                hoạt động của doanh nghiệp. Những điểm nổi bật của quá trình
                chuyển đổi số bao gồm:
              </p>

              <ul className="list-disc pl-5 space-y-2 text-blue-100">
                <li>Tăng cường quản lý và phân tích dữ liệu khách hàng</li>
                <li>Tự động hóa quy trình marketing hiệu quả</li>
                <li>Ứng dụng các công nghệ tiên tiến như blockchain và AI</li>
                <li>Định hướng phát triển bền vững dựa trên nền tảng số</li>
              </ul>
            </div>

            <div>
              <p className="mb-4">
                Việc dẫn dắt sự thay đổi thông qua các yếu tố công nghệ như CRM,
                tự động hóa marketing và phân tích dữ liệu được xem là chìa khóa
                để xây dựng mô hình kinh doanh linh hoạt, đáp ứng nhanh chóng
                những biến đổi của thị trường.
              </p>

              <p className="mt-4">
                Với sự phát triển không ngừng của công nghệ, các doanh nghiệp
                như Amway sẽ tiếp tục đẩy mạnh quá trình chuyển đổi số, ứng dụng
                các giải pháp tự động hóa và phân tích dữ liệu tiên tiến, từ đó
                tối ưu hóa hiệu quả hoạt động và khẳng định vị thế hàng đầu
                trong ngành tiếp thị trực tiếp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const FeatureItem = ({ icon, title, description }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h4>
      <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);

const TechFeatureItem = ({ title, description }) => (
  <div className="border-l-4 border-blue-300 pl-4">
    <h4 className="font-medium text-lg">{title}</h4>
    <p className="mt-1 text-blue-100">{description}</p>
  </div>
);

const AutomationFeature = ({ title, description }) => (
  <div className="border-l-4 border-blue-500 pl-4 py-2">
    <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
    <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const CrmFeature = ({ title, description }) => (
  <div className="border-l-4 border-green-500 pl-4 py-2">
    <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
    <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const ProcessStep = ({ number, title, description }) => (
  <div className="bg-blue-800 dark:bg-blue-950 p-4 rounded-lg relative">
    <div className="absolute -top-3 -left-3 flex items-center justify-center w-8 h-8 rounded-full bg-white text-blue-700 font-bold text-sm">
      {number}
    </div>
    <h4 className="font-medium mt-2 text-lg">{title}</h4>
    <p className="mt-2 text-blue-100 text-sm">{description}</p>
  </div>
);

const AnalyticsFeature = ({ title, description }) => (
  <div className="border-l-4 border-indigo-500 pl-4 py-2">
    <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
    <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const BenefitCard = ({ title, description, darkMode }) => (
  <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
    <h4
      className={`font-medium text-lg ${
        darkMode ? "text-white" : "text-blue-700"
      }`}
    >
      {title}
    </h4>
    <p
      className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
    >
      {description}
    </p>
  </div>
);

const ChallengeItem = ({ title, description, darkMode }) => (
  <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-red-50"}`}>
    <h4 className={`font-medium ${darkMode ? "text-white" : "text-red-700"}`}>
      {title}
    </h4>
    <p
      className={`mt-1 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
    >
      {description}
    </p>
  </div>
);

const TrendItem = ({ icon, title, description }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mr-3">{icon}</div>
    <div>
      <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  </div>
);

// FAQs Data
const faqs = [
  {
    question:
      "Làm thế nào Amway quản lý hoa hồng cho nhà phân phối qua công nghệ?",
    answer:
      "Amway sử dụng hệ thống tự động tính toán hoa hồng dựa trên dữ liệu doanh số của từng nhà phân phối và cả hệ thống downline. Thông qua công nghệ blockchain, các giao dịch và hoa hồng được ghi nhận minh bạch và an toàn, giúp nhà phân phối có thể theo dõi thu nhập của mình theo thời gian thực.",
  },
  {
    question:
      "Các công cụ CRM hiện đại giúp Amway cải thiện hoạt động kinh doanh như thế nào?",
    answer:
      "Các công cụ CRM hiện đại giúp Amway tập trung hóa dữ liệu khách hàng, theo dõi lịch sử giao dịch, phân tích hành vi mua sắm và tự động hóa các chiến dịch marketing. Điều này giúp nhà phân phối tiếp cận đúng khách hàng tiềm năng, cá nhân hóa trải nghiệm khách hàng và tăng tỷ lệ chuyển đổi.",
  },
  {
    question:
      "Vai trò của phân tích dữ liệu lớn (Big Data) trong mô hình MLM của Amway?",
    answer:
      "Phân tích dữ liệu lớn giúp Amway dự đoán xu hướng tiêu dùng, phân tích hiệu suất của từng nhà phân phối, tối ưu hóa chiến lược marketing và cải thiện trải nghiệm khách hàng. Việc ứng dụng các thuật toán Machine Learning còn cho phép dự báo doanh số và xác định các cơ hội tăng trưởng mới.",
  },
  {
    question:
      "Làm thế nào Amway đảm bảo an ninh dữ liệu trong quá trình số hóa?",
    answer:
      "Amway đảm bảo an ninh dữ liệu thông qua việc triển khai các hệ thống bảo mật đa lớp, mã hóa thông tin nhạy cảm, sử dụng công nghệ blockchain cho các giao dịch quan trọng và tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu cá nhân như GDPR. Công ty cũng thường xuyên cập nhật và đánh giá hệ thống bảo mật để chống lại các mối đe dọa mới.",
  },
  {
    question:
      "Xu hướng công nghệ nào sẽ định hình tương lai của mô hình MLM trong 5 năm tới?",
    answer:
      "Trong 5 năm tới, các xu hướng công nghệ như AI và Machine Learning, phân tích dữ liệu thời gian thực, ứng dụng di động với AR/VR, thanh toán không tiếp xúc qua blockchain và tự động hóa marketing cá nhân hóa sẽ định hình tương lai của mô hình MLM. Các công nghệ này sẽ giúp tối ưu hóa quy trình bán hàng, cải thiện trải nghiệm khách hàng và tăng cường tính minh bạch trong toàn bộ hệ thống.",
  },
];

export default AmwayDetailCaseStudy;
