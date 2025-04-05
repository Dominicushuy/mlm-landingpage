// import React, { useState } from "react";
// import {
//   ChevronDown,
//   ChevronUp,
//   Database,
//   BarChart2,
//   Lock,
//   Smartphone,
//   Zap,
// } from "lucide-react";
// import SectionHeading from "../ui/section-heading";

// const AmwayDetailCaseStudy = ({ darkMode }) => {
//   const [activeTab, setActiveTab] = useState("tech");
//   const [expandedFaq, setExpandedFaq] = useState(null);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const toggleFaq = (index) => {
//     setExpandedFaq(expandedFaq === index ? null : index);
//   };

//   return (
//     <section
//       id="amway-detail"
//       className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900/30"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           subtitle="Chi tiết Case Study"
//           title="Amway - Chuyển đổi số trong MLM"
//           description="Phân tích chuyên sâu về cách Amway ứng dụng công nghệ số, marketing tự động, CRM và phân tích dữ liệu để tối ưu hóa mô hình MLM"
//         />

//         {/* Tabs */}
//         <div className="mb-8 flex justify-center">
//           <div className="inline-flex rounded-md shadow-sm bg-white dark:bg-gray-800">
//             <button
//               onClick={() => handleTabChange("tech")}
//               className={`px-4 py-2 text-sm font-medium rounded-l-md ${
//                 activeTab === "tech"
//                   ? "bg-blue-600 text-white"
//                   : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
//               }`}
//             >
//               Tích hợp công nghệ
//             </button>
//             <button
//               onClick={() => handleTabChange("crm")}
//               className={`px-4 py-2 text-sm font-medium ${
//                 activeTab === "crm"
//                   ? "bg-blue-600 text-white"
//                   : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
//               }`}
//             >
//               CRM & Marketing Automation
//             </button>
//             <button
//               onClick={() => handleTabChange("data")}
//               className={`px-4 py-2 text-sm font-medium ${
//                 activeTab === "data"
//                   ? "bg-blue-600 text-white"
//                   : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
//               }`}
//             >
//               Phân tích dữ liệu
//             </button>
//             <button
//               onClick={() => handleTabChange("trends")}
//               className={`px-4 py-2 text-sm font-medium rounded-r-md ${
//                 activeTab === "trends"
//                   ? "bg-blue-600 text-white"
//                   : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
//               }`}
//             >
//               Xu hướng tương lai
//             </button>
//           </div>
//         </div>

//         {/* Content based on active tab */}
//         <div className="mt-8">
//           {activeTab === "tech" && <TechIntegrationTab darkMode={darkMode} />}

//           {activeTab === "crm" && <CrmMarketingTab darkMode={darkMode} />}

//           {activeTab === "data" && <DataAnalyticsTab darkMode={darkMode} />}

//           {activeTab === "trends" && <TrendsTab darkMode={darkMode} />}
//         </div>

//         {/* FAQs */}
//         <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6">
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//             Câu hỏi thường gặp
//           </h3>

//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className="border-b border-gray-200 dark:border-gray-700 pb-4"
//               >
//                 <button
//                   className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white py-2"
//                   onClick={() => toggleFaq(index)}
//                 >
//                   <span>{faq.question}</span>
//                   {expandedFaq === index ? (
//                     <ChevronUp className="h-5 w-5 text-blue-500" />
//                   ) : (
//                     <ChevronDown className="h-5 w-5 text-blue-500" />
//                   )}
//                 </button>

//                 {expandedFaq === index && (
//                   <div className="mt-2 text-gray-600 dark:text-gray-300">
//                     {faq.answer}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Tab components
// const TechIntegrationTab = ({ darkMode }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Vai trò của công nghệ số trong MLM
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             Trong những năm gần đây, công nghệ số đã trở thành động lực chính
//             giúp các doanh nghiệp mở rộng quy mô và tối ưu hóa hoạt động kinh
//             doanh. Đối với Amway, việc tích hợp công nghệ số không chỉ giúp quản
//             lý hệ thống nhà phân phối rộng khắp toàn cầu mà còn nâng cao hiệu
//             quả quản lý lượt tương tác với khách hàng.
//           </p>

//           <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
//             Ứng dụng phần mềm CRM trong Amway
//           </h4>
//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             Phần mềm CRM chuyên dụng trong ngành MLM là một thành phần không thể
//             thiếu để theo dõi và quản lý các hoạt động của nhà phân phối cũng
//             như tương tác với khách hàng.
//           </p>

//           <div className="mt-8 space-y-4">
//             <FeatureItem
//               icon={<Database />}
//               title="Tập trung hóa dữ liệu"
//               description="Qua việc lưu trữ thông tin tập trung, Amway có thể theo dõi lịch sử giao dịch, phân tích dữ liệu hành vi và tối ưu hóa cơ cấu tổ chức của hệ thống MLM."
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-blue-600 dark:bg-blue-800 rounded-xl shadow-lg overflow-hidden text-white">
//         <div className="p-6">
//           <h3 className="text-xl font-bold mb-6">
//             Hệ sinh thái kỹ thuật số trong Amway
//           </h3>

//           <div className="space-y-6">
//             <TechFeatureItem
//               title="Ứng dụng di động và nền tảng trực tuyến"
//               description="Hệ thống di động giúp các nhà phân phối cập nhật thông tin, đặt hàng và theo dõi hoạt động bán hàng mọi lúc mọi nơi."
//             />

//             <TechFeatureItem
//               title="Tích hợp công nghệ blockchain"
//               description="Để tăng cường tính minh bạch và an toàn trong giao dịch, Amway tiên phong ứng dụng blockchain nhằm theo dõi quá trình giao dịch."
//             />

//             <TechFeatureItem
//               title="Marketing liên kết (Affiliate Marketing)"
//               description="Hệ thống tích hợp chiến lược marketing liên kết giúp Amway mở rộng thị trường thông qua việc hợp tác với các blogger, influencer."
//             />
//           </div>
//         </div>
//       </div>

//       <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
//             So sánh mô hình truyền thống và mô hình kỹ thuật số
//           </h3>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead className="bg-gray-50 dark:bg-gray-900">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Phương pháp
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Mô hình truyền thống
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                     Mô hình kỹ thuật số
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
//                     Quản lý dữ liệu
//                   </td>
//                   <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
//                     Lưu trữ rời rạc, sử dụng sổ tay và bảng tính → cập nhật thủ
//                     công
//                   </td>
//                   <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
//                     Hệ thống CRM tập trung, tự động cập nhật và phân tích dữ
//                     liệu theo thời gian thực
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
//                     Liên lạc và hỗ trợ
//                   </td>
//                   <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
//                     Giao tiếp qua điện thoại, họp mặt trực tiếp → hạn chế vùng
//                     địa lý
//                   </td>
//                   <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
//                     Email, SMS, ứng dụng di động và mạng xã hội tạo sự tương tác
//                     liên tục rộng khắp toàn cầu
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
//                     Tính minh bạch trong giao dịch
//                   </td>
//                   <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
//                     Rủi ro sai sót, thiếu tính minh bạch trong giao dịch
//                   </td>
//                   <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
//                     Công nghệ blockchain đảm bảo giao dịch an toàn và minh bạch
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
//                     Chiến lược marketing
//                   </td>
//                   <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
//                     Quảng cáo truyền hình, báo in → chi phí cao, tiếp cận hạn
//                     chế
//                   </td>
//                   <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
//                     Marketing trực tuyến kết hợp SEO, PPC, mạng xã hội → tiếp
//                     cận mục tiêu, chi phí hiệu quả
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CrmMarketingTab = ({ darkMode }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Tự động hóa marketing trong hoạt động MLM
//           </h3>

//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             Marketing tự động là một trong những xu thế đột phá, giúp các doanh
//             nghiệp giảm thiểu tối đa thời gian và công sức cho các chiến dịch
//             quảng cáo và tiếp thị. Đối với Amway, tự động hóa marketing được
//             thực hiện qua các công cụ:
//           </p>

//           <div className="space-y-4 mt-6">
//             <AutomationFeature
//               title="Email Marketing tự động"
//               description="Tạo chiến dịch quảng cáo cá nhân hóa dựa trên dữ liệu khách hàng, từ đó thúc đẩy tỷ lệ chuyển đổi và tương tác."
//             />

//             <AutomationFeature
//               title="Chiến dịch SMS và thông báo đẩy"
//               description="Thông qua các dịch vụ tự động gửi tin nhắn, Amway đảm bảo các thông tin cập nhật, khuyến mãi và hỗ trợ được truyền tải kịp thời đến khách hàng."
//             />

//             <AutomationFeature
//               title="Phân khúc thị trường"
//               description="Công cụ tự động giúp phân chia khách hàng thành các nhóm dựa trên hành vi mua sắm, sở thích và lịch sử giao dịch, giúp tối ưu hóa chiến lược marketing."
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Quản lý quan hệ khách hàng (CRM) trong Amway
//           </h3>

//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             Quản lý quan hệ khách hàng không chỉ hỗ trợ việc chăm sóc khách hàng
//             chuyên nghiệp mà còn là công cụ đắc lực giúp theo dõi hiệu suất của
//             nhà phân phối.
//           </p>

//           <div className="space-y-4 mt-6">
//             <CrmFeature
//               title="Theo dõi quy trình bán hàng"
//               description="Từ khâu tiếp cận khách hàng tiềm năng, chuyển đổi thành khách hàng thực sự đến việc theo dõi hậu mãi. Hệ thống ghi nhận các tương tác và đưa ra báo cáo chi tiết."
//             />

//             <CrmFeature
//               title="Phân tích hiệu suất nhà phân phối"
//               description="Các bảng biểu, dashboard hiển thị các chỉ số hiệu suất chính (KPIs) giúp cấp quản lý theo dõi sát sao doanh số và năng lực của từng nhà phân phối."
//             />

//             <CrmFeature
//               title="Tích hợp công cụ tự động tính hoa hồng"
//               description="Hệ thống tự động tính toán hoa hồng dựa trên doanh số và số lượng tuyển dụng của nhà phân phối, giảm bớt công việc thủ công và đảm bảo tính chính xác."
//             />
//           </div>
//         </div>
//       </div>

//       <div className="md:col-span-2 bg-blue-700 dark:bg-blue-900 rounded-xl shadow-lg overflow-hidden text-white">
//         <div className="p-6">
//           <h3 className="text-xl font-bold mb-6">
//             Quy trình quản lý nhà phân phối
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <ProcessStep
//               number="01"
//               title="Thu thập dữ liệu khách hàng"
//               description="Tổng hợp thông tin từ nhiều nguồn và tích hợp vào hệ thống CRM trung tâm."
//             />

//             <ProcessStep
//               number="02"
//               title="Phân khúc thị trường"
//               description="Phân chia khách hàng thành các nhóm dựa trên hành vi và nhu cầu."
//             />

//             <ProcessStep
//               number="03"
//               title="Tự động marketing"
//               description="Triển khai chiến dịch email, SMS và thông báo được cá nhân hóa."
//             />

//             <ProcessStep
//               number="04"
//               title="Phân tích và tối ưu"
//               description="Giám sát hiệu suất và điều chỉnh chiến lược dựa trên kết quả phân tích."
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DataAnalyticsTab = ({ darkMode }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Vai trò của phân tích dữ liệu trong kinh doanh MLM
//           </h3>

//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             Trong kỷ nguyên số, dữ liệu được xem là nguồn tài nguyên quý giá để
//             đưa ra các quyết định chiến lược. Các doanh nghiệp MLM như Amway đã
//             ứng dụng phân tích dữ liệu để:
//           </p>

//           <div className="space-y-4 mt-6">
//             <AnalyticsFeature
//               title="Theo dõi hiệu suất bán hàng"
//               description="Thu thập và phân tích dữ liệu về doanh số, hoạt động bán hàng của các nhà phân phối để đánh giá hiệu suất kinh doanh."
//             />

//             <AnalyticsFeature
//               title="Dự báo xu hướng thị trường"
//               description="Sử dụng các công cụ phân tích dự đoán xu hướng tiêu dùng, từ đó đưa ra các chiến lược marketing và phát triển sản phẩm kịp thời."
//             />

//             <AnalyticsFeature
//               title="Nâng cao chất lượng chăm sóc khách hàng"
//               description="Đánh giá phản hồi và hành vi mua sắm của khách hàng để cải thiện dịch vụ và tạo ra các chương trình khuyến mãi phù hợp."
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-blue-600 dark:bg-blue-800 rounded-xl shadow-lg overflow-hidden text-white">
//         <div className="p-6">
//           <h3 className="text-xl font-bold mb-4">
//             Công cụ và phương pháp phân tích dữ liệu
//           </h3>

//           <p className="text-blue-100 mb-4">
//             Các công cụ phân tích hiện đại được tích hợp vào hệ thống MLM giúp
//             Amway có cái nhìn chi tiết và tức thời về:
//           </p>

//           <div className="space-y-6 mt-8">
//             <div className="flex items-start">
//               <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white text-blue-600 flex items-center justify-center mr-4">
//                 <BarChart2 className="h-5 w-5" />
//               </div>
//               <div>
//                 <h4 className="text-lg font-medium">
//                   Báo cáo hiệu suất theo thời gian thực
//                 </h4>
//                 <p className="mt-1 text-blue-100">
//                   Dashboard hiển thị các chỉ số quan trọng như doanh số, số
//                   lượng nhà phân phối hoạt động, và mức độ tương tác với khách
//                   hàng.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start">
//               <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white text-blue-600 flex items-center justify-center mr-4">
//                 <Zap className="h-5 w-5" />
//               </div>
//               <div>
//                 <h4 className="text-lg font-medium">
//                   Phân tích dự đoán (Predictive Analytics)
//                 </h4>
//                 <p className="mt-1 text-blue-100">
//                   Sử dụng các thuật toán Machine Learning để dự đoán xu hướng
//                   tiêu dùng và hiệu suất tuyển dụng trong tương lai.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start">
//               <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white text-blue-600 flex items-center justify-center mr-4">
//                 <Database className="h-5 w-5" />
//               </div>
//               <div>
//                 <h4 className="text-lg font-medium">
//                   Báo cáo hành vi khách hàng
//                 </h4>
//                 <p className="mt-1 text-blue-100">
//                   Phân tích dữ liệu từ các kênh trực tuyến như website, ứng dụng
//                   di động và mạng xã hội giúp xác định các hành vi tiêu dùng và
//                   đưa ra các khuyến nghị cá nhân hóa.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Lợi ích từ việc phân tích dữ liệu
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//             <BenefitCard
//               title="Tăng cường năng lực cạnh tranh"
//               description="Cung cấp thông tin nhanh chóng và chính xác giúp Amway điều chỉnh chiến lược kịp thời, vượt qua đối thủ."
//               darkMode={darkMode}
//             />

//             <BenefitCard
//               title="Cải thiện trải nghiệm khách hàng"
//               description="Qua việc theo dõi liên tục hành vi khách hàng, Amway có thể đưa ra những chương trình khuyến mãi và chăm sóc khách hàng phù hợp."
//               darkMode={darkMode}
//             />

//             <BenefitCard
//               title="Tối ưu hóa quy trình hoạt động"
//               description="Nhờ dữ liệu phân tích, các quyết định về tuyển dụng, đào tạo và hỗ trợ nhà phân phối được cải thiện vượt trội."
//               darkMode={darkMode}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TrendsTab = ({ darkMode }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Thách thức hiện tại
//           </h3>

//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             Mặc dù các công nghệ số và hệ thống tự động đã mở ra nhiều cơ hội,
//             Amway – cùng với các doanh nghiệp MLM khác – cũng phải đối mặt với
//             một số thách thức khó khăn:
//           </p>

//           <div className="space-y-4 mt-6">
//             <ChallengeItem
//               title="Vấn đề đào tạo và chuyển đổi số"
//               description="Nhiều nhà phân phối truyền thống còn gặp khó khăn trong việc làm quen với hệ thống tự động và công nghệ hiện đại."
//               darkMode={darkMode}
//             />

//             <ChallengeItem
//               title="Chi phí đầu tư ban đầu cao"
//               description="Triển khai các hệ thống CRM tiên tiến, tự động hoá marketing và phân tích dữ liệu đòi hỏi một khoản đầu tư lớn."
//               darkMode={darkMode}
//             />

//             <ChallengeItem
//               title="Đảm bảo an ninh và bảo mật"
//               description="Khi dữ liệu khách hàng và giao dịch được số hóa, việc bảo vệ thông tin trước các mối đe dọa từ bên ngoài trở nên cấp bách."
//               darkMode={darkMode}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//             Xu hướng phát triển trong tương lai
//           </h3>

//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             Để vượt qua những thách thức trên, Amway và các doanh nghiệp MLM
//             khác cần theo kịp các xu hướng công nghệ hiện đại:
//           </p>

//           <div className="space-y-4 mt-6">
//             <TrendItem
//               icon={<Zap className="h-5 w-5 text-blue-600" />}
//               title="Ứng dụng trí tuệ nhân tạo (AI) và Big Data"
//               description="Việc áp dụng AI vào quá trình phân tích dữ liệu sẽ giúp cải thiện khả năng dự báo xu hướng và tối ưu hóa quy trình quản lý."
//             />

//             <TrendItem
//               icon={<Smartphone className="h-5 w-5 text-blue-600" />}
//               title="Phát triển ứng dụng di động và nền tảng đám mây"
//               description="Giúp nhà phân phối và khách hàng truy cập dịch vụ mọi lúc, mọi nơi, đồng thời hỗ trợ việc cập nhật thông tin và giao tiếp liên tục."
//             />

//             <TrendItem
//               icon={<Lock className="h-5 w-5 text-blue-600" />}
//               title="Nâng cao tính minh bạch qua blockchain"
//               description="Công nghệ blockchain sẽ tiếp tục được cải tiến để cung cấp mức độ bảo mật và minh bạch cao hơn cho các giao dịch."
//             />
//           </div>
//         </div>
//       </div>

//       <div className="md:col-span-2 bg-blue-700 dark:bg-blue-900 rounded-xl shadow-lg overflow-hidden text-white">
//         <div className="p-6">
//           <h3 className="text-xl font-bold mb-6">Kết luận</h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <p className="mb-4">
//                 Qua việc ứng dụng công nghệ số, tự động hóa marketing, CRM và
//                 phân tích dữ liệu, Amway đã tạo ra những thay đổi căn bản trong
//                 hoạt động của doanh nghiệp. Những điểm nổi bật của quá trình
//                 chuyển đổi số bao gồm:
//               </p>

//               <ul className="list-disc pl-5 space-y-2 text-blue-100">
//                 <li>Tăng cường quản lý và phân tích dữ liệu khách hàng</li>
//                 <li>Tự động hóa quy trình marketing hiệu quả</li>
//                 <li>Ứng dụng các công nghệ tiên tiến như blockchain và AI</li>
//                 <li>Định hướng phát triển bền vững dựa trên nền tảng số</li>
//               </ul>
//             </div>

//             <div>
//               <p className="mb-4">
//                 Việc dẫn dắt sự thay đổi thông qua các yếu tố công nghệ như CRM,
//                 tự động hóa marketing và phân tích dữ liệu được xem là chìa khóa
//                 để xây dựng mô hình kinh doanh linh hoạt, đáp ứng nhanh chóng
//                 những biến đổi của thị trường.
//               </p>

//               <p className="mt-4">
//                 Với sự phát triển không ngừng của công nghệ, các doanh nghiệp
//                 như Amway sẽ tiếp tục đẩy mạnh quá trình chuyển đổi số, ứng dụng
//                 các giải pháp tự động hóa và phân tích dữ liệu tiên tiến, từ đó
//                 tối ưu hóa hiệu quả hoạt động và khẳng định vị thế hàng đầu
//                 trong ngành tiếp thị trực tiếp.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper Components
// const FeatureItem = ({ icon, title, description }) => (
//   <div className="flex items-start">
//     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
//       {icon}
//     </div>
//     <div>
//       <h4 className="text-lg font-medium text-gray-900 dark:text-white">
//         {title}
//       </h4>
//       <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
//     </div>
//   </div>
// );

// const TechFeatureItem = ({ title, description }) => (
//   <div className="border-l-4 border-blue-300 pl-4">
//     <h4 className="font-medium text-lg">{title}</h4>
//     <p className="mt-1 text-blue-100">{description}</p>
//   </div>
// );

// const AutomationFeature = ({ title, description }) => (
//   <div className="border-l-4 border-blue-500 pl-4 py-2">
//     <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
//     <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
//   </div>
// );

// const CrmFeature = ({ title, description }) => (
//   <div className="border-l-4 border-green-500 pl-4 py-2">
//     <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
//     <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
//   </div>
// );

// const ProcessStep = ({ number, title, description }) => (
//   <div className="bg-blue-800 dark:bg-blue-950 p-4 rounded-lg relative">
//     <div className="absolute -top-3 -left-3 flex items-center justify-center w-8 h-8 rounded-full bg-white text-blue-700 font-bold text-sm">
//       {number}
//     </div>
//     <h4 className="font-medium mt-2 text-lg">{title}</h4>
//     <p className="mt-2 text-blue-100 text-sm">{description}</p>
//   </div>
// );

// const AnalyticsFeature = ({ title, description }) => (
//   <div className="border-l-4 border-indigo-500 pl-4 py-2">
//     <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
//     <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
//   </div>
// );

// const BenefitCard = ({ title, description, darkMode }) => (
//   <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
//     <h4
//       className={`font-medium text-lg ${
//         darkMode ? "text-white" : "text-blue-700"
//       }`}
//     >
//       {title}
//     </h4>
//     <p
//       className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//     >
//       {description}
//     </p>
//   </div>
// );

// const ChallengeItem = ({ title, description, darkMode }) => (
//   <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-red-50"}`}>
//     <h4 className={`font-medium ${darkMode ? "text-white" : "text-red-700"}`}>
//       {title}
//     </h4>
//     <p
//       className={`mt-1 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
//     >
//       {description}
//     </p>
//   </div>
// );

// const TrendItem = ({ icon, title, description }) => (
//   <div className="flex items-start">
//     <div className="flex-shrink-0 mr-3">{icon}</div>
//     <div>
//       <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
//       <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
//         {description}
//       </p>
//     </div>
//   </div>
// );

// // FAQs Data
// const faqs = [
//   {
//     question:
//       "Làm thế nào Amway quản lý hoa hồng cho nhà phân phối qua công nghệ?",
//     answer:
//       "Amway sử dụng hệ thống tự động tính toán hoa hồng dựa trên dữ liệu doanh số của từng nhà phân phối và cả hệ thống downline. Thông qua công nghệ blockchain, các giao dịch và hoa hồng được ghi nhận minh bạch và an toàn, giúp nhà phân phối có thể theo dõi thu nhập của mình theo thời gian thực.",
//   },
//   {
//     question:
//       "Các công cụ CRM hiện đại giúp Amway cải thiện hoạt động kinh doanh như thế nào?",
//     answer:
//       "Các công cụ CRM hiện đại giúp Amway tập trung hóa dữ liệu khách hàng, theo dõi lịch sử giao dịch, phân tích hành vi mua sắm và tự động hóa các chiến dịch marketing. Điều này giúp nhà phân phối tiếp cận đúng khách hàng tiềm năng, cá nhân hóa trải nghiệm khách hàng và tăng tỷ lệ chuyển đổi.",
//   },
//   {
//     question:
//       "Vai trò của phân tích dữ liệu lớn (Big Data) trong mô hình MLM của Amway?",
//     answer:
//       "Phân tích dữ liệu lớn giúp Amway dự đoán xu hướng tiêu dùng, phân tích hiệu suất của từng nhà phân phối, tối ưu hóa chiến lược marketing và cải thiện trải nghiệm khách hàng. Việc ứng dụng các thuật toán Machine Learning còn cho phép dự báo doanh số và xác định các cơ hội tăng trưởng mới.",
//   },
//   {
//     question:
//       "Làm thế nào Amway đảm bảo an ninh dữ liệu trong quá trình số hóa?",
//     answer:
//       "Amway đảm bảo an ninh dữ liệu thông qua việc triển khai các hệ thống bảo mật đa lớp, mã hóa thông tin nhạy cảm, sử dụng công nghệ blockchain cho các giao dịch quan trọng và tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu cá nhân như GDPR. Công ty cũng thường xuyên cập nhật và đánh giá hệ thống bảo mật để chống lại các mối đe dọa mới.",
//   },
//   {
//     question:
//       "Xu hướng công nghệ nào sẽ định hình tương lai của mô hình MLM trong 5 năm tới?",
//     answer:
//       "Trong 5 năm tới, các xu hướng công nghệ như AI và Machine Learning, phân tích dữ liệu thời gian thực, ứng dụng di động với AR/VR, thanh toán không tiếp xúc qua blockchain và tự động hóa marketing cá nhân hóa sẽ định hình tương lai của mô hình MLM. Các công nghệ này sẽ giúp tối ưu hóa quy trình bán hàng, cải thiện trải nghiệm khách hàng và tăng cường tính minh bạch trong toàn bộ hệ thống.",
//   },
// ];

// export default AmwayDetailCaseStudy;

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  Database, 
  BarChart2, 
  Lock, 
  Smartphone, 
  Zap, 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  TrendingDown, 
  PieChart, 
  Mail, 
  Filter, 
  Users, 
  ChevronRight, 
  Download, 
  Play, 
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { MainSection } from "../layout/main-layout";
import { Grid, GridItem, Flex } from "../layout/container";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const AmwayDetailCaseStudy = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("tech");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [highlightedPoint, setHighlightedPoint] = useState(null);
  const [showCase1, setShowCase1] = useState(false);
  const [showCase2, setShowCase2] = useState(false);
  const [hoveredChart, setHoveredChart] = useState(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  
  // Technology integration tab features
  const techFeatures = [
    {
      id: "crm",
      title: "CRM Integration",
      icon: Database,
      description: "Advanced customer management & distribution network tracking",
      stats: { effectiveness: 86, adoption: 78, roi: 92 }
    },
    {
      id: "mobile",
      title: "Mobile Applications",
      icon: Smartphone,
      description: "Seamless ordering and network management on-the-go",
      stats: { effectiveness: 91, adoption: 85, roi: 88 }
    },
    {
      id: "blockchain",
      title: "Blockchain Technology",
      icon: Lock,
      description: "Enhanced transparency in transactions and commissions",
      stats: { effectiveness: 79, adoption: 62, roi: 74 }
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      icon: BarChart2,
      description: "Data-driven insights for performance optimization",
      stats: { effectiveness: 94, adoption: 76, roi: 89 }
    }
  ];

  // CRM features
  const crmFeatures = [
    {
      id: "automation",
      title: "Marketing Automation",
      icon: Zap,
      description: "Automated campaign execution across multiple channels",
      color: "blue"
    },
    {
      id: "email",
      title: "Email Campaigns",
      icon: Mail,
      description: "Personalized drip campaigns for customer nurturing",
      color: "indigo"
    },
    {
      id: "segmentation",
      title: "Customer Segmentation",
      icon: Filter,
      description: "Advanced audience targeting based on behavior & demographics",
      color: "purple"
    },
    {
      id: "network",
      title: "Network Management",
      icon: Users,
      description: "Comprehensive distributor relationship and performance tracking",
      color: "pink"
    }
  ];

  // Data analytics integration
  const dataPoints = [
    {
      title: "Sales Performance",
      value: "$7.7B",
      change: "-4.9%",
      prediction: "Forecasted to stabilize by 2026",
      color: "blue"
    },
    {
      title: "Customer Retention",
      value: "68%",
      change: "+2.3%",
      prediction: "Continued improvement with personalization",
      color: "green"
    },
    {
      title: "Distributor Growth",
      value: "2.4M",
      change: "-1.8%",
      prediction: "Expected to rise with digital transformation",
      color: "purple"
    },
    {
      title: "Digital Engagement",
      value: "43%",
      change: "+15.6%",
      prediction: "Rapid growth as digital initiatives expand",
      color: "orange"
    }
  ];

  // Future trends data
  const futureImpact = [
    { trend: "AI & Machine Learning", impact: 9.2, readiness: 6.8, timeframe: "1-2 years" },
    { trend: "Virtual Sales Experiences", impact: 8.7, readiness: 7.2, timeframe: "Now" },
    { trend: "Blockchain Integration", impact: 7.9, readiness: 5.4, timeframe: "2-3 years" },
    { trend: "Personalization at Scale", impact: 9.5, readiness: 7.8, timeframe: "Now" },
    { trend: "Augmented Reality Product Demos", impact: 8.3, readiness: 6.1, timeframe: "1-2 years" }
  ];

  // FAQ items
  const faqs = [
    {
      question: "How does Amway manage distributor commissions through technology?",
      answer: "Amway uses an integrated blockchain-based commission system that automatically calculates and distributes earnings based on sales data and network performance. This system provides real-time transparency, allowing distributors to track their earnings through mobile apps and web dashboards. The technology has reduced commission processing time by 74% while increasing accuracy to 99.8%."
    },
    {
      question: "What CRM features have delivered the highest ROI for Amway?",
      answer: "Amway's highest ROI CRM features include personalized customer journey orchestration (215% ROI), predictive analytics for purchase recommendations (187% ROI), and automated multi-channel campaign management (163% ROI). These features have significantly improved customer retention rates and increased average order values by creating seamless, personalized experiences across all touchpoints."
    },
    {
      question: "How is Big Data analytics transforming Amway's MLM operations?",
      answer: "Big Data analytics has revolutionized Amway's operations by enabling predictive demand forecasting (reducing inventory costs by 23%), identifying high-potential distributors through behavioral pattern recognition, optimizing product development through customer feedback analysis, and creating territory-specific strategies based on regional performance data. These insights have transformed decision-making from reactive to proactive."
    },
    {
      question: "What security measures protect Amway's digital systems?",
      answer: "Amway implements enterprise-grade security through multi-layered protection including end-to-end encryption for all transactions, multi-factor authentication for system access, regular penetration testing and security audits, advanced threat detection systems, and strict compliance with international data protection regulations including GDPR. Their security infrastructure is continuously updated to address emerging threats."
    },
    {
      question: "Which emerging technologies will shape Amway's future?",
      answer: "Key technologies shaping Amway's future include AI-powered personalization engines that tailor recommendations at individual levels, augmented reality product demonstrations allowing virtual product testing, blockchain-based product authentication to combat counterfeiting, voice commerce integration for frictionless ordering, and IoT-enabled products that enhance customer experience while generating valuable usage data for continuous improvement."
    }
  ];

  // Timeline data
  const timeline = [
    { year: 2018, event: "Digital Transformation Initiative Launched", description: "Comprehensive overhaul of legacy systems" },
    { year: 2019, event: "Global CRM Implementation", description: "Unified customer data across 100+ markets" },
    { year: 2020, event: "Mobile App Relaunch", description: "Enhanced distributor tools and customer interface" },
    { year: 2021, event: "Advanced Analytics Platform", description: "Predictive insights for distributors and management" },
    { year: 2022, event: "Blockchain Pilot Program", description: "Transparent commission structure and payments" },
    { year: 2023, event: "AI-Powered Marketing Automation", description: "Personalized campaigns at scale with machine learning" },
    { year: 2024, event: "Immersive AR Product Experiences", description: "Virtual product demonstrations and training" },
    { year: 2025, event: "Planned: Full Digital Integration", description: "Seamless omnichannel presence and operations" }
  ];

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const windowScroll = scrollTop;
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Only update if section is in view
      if (containerRect.top < clientHeight && containerRect.bottom > 0) {
        const scrolled = (windowScroll - (containerRect.top + windowScroll - clientHeight)) / 
                        (containerRect.height + clientHeight);
        setScrollProgress(Math.min(Math.max(scrolled, 0), 1));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse position for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track section visibility
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  // Auto-reveal case studies
  useEffect(() => {
    if (scrollProgress > 0.3 && !showCase1) {
      setShowCase1(true);
    }
    if (scrollProgress > 0.6 && !showCase2) {
      setShowCase2(true);
    }
  }, [scrollProgress, showCase1, showCase2]);

  // Toggle FAQ expansion
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div
      id="amway-detail"
      ref={containerRef}
      className="relative overflow-hidden"
    >
      {/* Progress indicator */}
      <div className="fixed top-1/2 right-6 w-1 h-64 bg-gray-200 dark:bg-gray-700 rounded-full transform -translate-y-1/2 z-50 hidden lg:block">
        <motion.div 
          className="w-1 bg-blue-500 dark:bg-blue-400 rounded-full"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-800 via-indigo-900 to-purple-900 overflow-hidden">
          {/* Grid pattern overlay */}
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 opacity-10"
          >
            <defs>
              <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          
          {/* Animated glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 filter blur-[100px] opacity-20 animate-float"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-indigo-500 filter blur-[120px] opacity-20 animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-purple-500 filter blur-[80px] opacity-15 animate-float-slow"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-sm font-medium mb-4">
              Case Study Analysis
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Amway<span className="text-blue-300">:</span> Digital Transformation
              <br />
              in<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"> Network Marketing</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-blue-100 mb-8">
              An in-depth analysis of how Amway integrates technology, automation, and data analytics to revolutionize its MLM business model
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8"
            >
              <Button 
                onClick={() => {
                  const element = document.getElementById("study-content");
                  element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-indigo-700 hover:bg-blue-50 px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg"
              >
                Explore the Study
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 flex flex-col items-center"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </div>

      {/* Main Content */}
      <section 
        id="study-content" 
        ref={sectionRef} 
        className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/10"
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Introduction & Key Performance Indicators */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="mb-20"
          >
            <motion.div 
              variants={itemVariants}
              className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8"
            >
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4">
                  Executive Summary
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Digital Transformation Journey
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Amway, a global leader in direct selling with annual revenue of $7.7 billion, has embarked on a comprehensive digital transformation to modernize its MLM business model. This case study examines how technology integration, marketing automation, and data analytics have reshaped the company's approach to distributor management and customer engagement.
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <Button 
                    variant="outline" 
                    className="rounded-full flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
                  >
                    <Download className="h-4 w-4" />
                    Download Full Report
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="rounded-full flex items-center gap-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Amway Digital Hub
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2 rounded-xl overflow-hidden relative">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden rounded-xl shadow-xl">
                  {/* Video thumbnail with play button */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40">
                    <img 
                      src="/api/placeholder/800/450" 
                      alt="Amway Digital Transformation Video" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVideoPlaying(true)}
                    className="z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  >
                    <Play className="h-8 w-8 text-blue-600 ml-1" />
                  </motion.button>
                  
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-white text-sm">
                    4:26
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Key Statistics Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            >
              {[
                { 
                  label: "Annual Revenue", 
                  value: "$7.7B", 
                  change: "-4.9%", 
                  icon: <DollarSign className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
                  description: "2023 fiscal year"
                },
                { 
                  label: "Digital Engagement", 
                  value: "43%", 
                  change: "+15.6%", 
                  icon: <Smartphone className="h-5 w-5 text-purple-500 dark:text-purple-400" />,
                  description: "Orders via digital channels"
                },
                { 
                  label: "Active Distributors", 
                  value: "2.4M", 
                  change: "-1.8%", 
                  icon: <Users className="h-5 w-5 text-green-500 dark:text-green-400" />,
                  description: "Across 100+ markets"
                },
                { 
                  label: "Tech Investment", 
                  value: "$380M", 
                  change: "+24.2%", 
                  icon: <Zap className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
                  description: "Digital infrastructure spend"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={staggerCardVariants}
                  whileHover="hover"
                  variants={cardHoverVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                      {stat.icon}
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.change.startsWith('+') 
                        ? 'text-green-500 dark:text-green-400' 
                        : 'text-red-500 dark:text-red-400'
                    } flex items-center`}>
                      {stat.change.startsWith('+') 
                        ? <TrendingUp className="h-3 w-3 mr-1" /> 
                        : <TrendingDown className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </h3>
                  <div className="mt-1">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Digital Transformation Timeline */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={controls}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 text-sm font-medium mb-4">
                Transformation Journey
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Amway's Digital Evolution Timeline
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Tracking the key milestones in Amway's transition from traditional MLM to a technology-driven business model
              </p>
            </div>
            
            <div className="relative">
              {/* Main timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-800/50 rounded-full"></div>
              
              <div className="relative">
                {timeline.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: scrollProgress > (index / timeline.length * 0.7) ? 1 : 0,
                      y: scrollProgress > (index / timeline.length * 0.7) ? 0 : 20
                    }}
                    transition={{ duration: 0.5 }}
                    className={`relative z-10 flex items-center justify-center mb-12 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline content */}
                    <div className="w-full md:w-5/12 px-4">
                      <div className={`p-6 rounded-xl shadow-md transform transition-all duration-500 h-full
                        ${index % 2 === 0 
                          ? 'md:translate-x-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' 
                          : 'md:-translate-x-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                        } border border-gray-100 dark:border-gray-700/50`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center
                            ${index % 2 === 0 
                              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300' 
                              : 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300'
                            }`}
                          >
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {item.year}
                          </div>
                          {item.year <= 2023 && (
                            <div className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 px-2 py-0.5 rounded-full text-xs">
                              Completed
                            </div>
                          )}
                          {item.year > 2023 && (
                            <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs">
                              Planned
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {item.event}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Center point */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center z-10
                        ${index % 2 === 0 
                          ? 'bg-blue-500 dark:bg-blue-400' 
                          : 'bg-purple-500 dark:bg-purple-400'
                        }`}
                      >
                        <span className="text-white text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Empty space on the other side for balance */}
                    <div className="w-full md:w-5/12 px-4"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Interactive Tabs Section */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-4">
                Digital Transformation Analysis
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Technology Integration & Strategy
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Explore the technological pillars of Amway's digital transformation strategy
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-1 bg-gray-100 dark:bg-gray-700">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid grid-cols-4 bg-transparent">
                    <TabsTrigger 
                      value="tech" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                    >
                      <Database className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Tech Integration</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="crm" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                    >
                      <Users className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">CRM & Marketing</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="data" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                    >
                      <BarChart2 className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Data Analytics</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="trends" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                    >
                      <Zap className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Future Trends</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Tab Content */}
              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "tech" && <TechnologyIntegrationTab techFeatures={techFeatures} />}
                    {activeTab === "crm" && <CrmMarketingTab crmFeatures={crmFeatures} />}
                    {activeTab === "data" && <DataAnalyticsTab dataPoints={dataPoints} />}
                    {activeTab === "trends" && <FutureTrendsTab futureImpact={futureImpact} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Case Studies Section - Reveal on scroll */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 text-sm font-medium mb-4">
                Success Stories
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Real-World Impact
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Examining the results of Amway's digital transformation initiatives across markets
              </p>
            </div>
            
            <div className="space-y-12">
              <AnimatePresence>
                {showCase1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl overflow-hidden shadow-xl border border-blue-100 dark:border-blue-800/30"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                      <div className="col-span-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-800">
                          <img 
                            src="/api/placeholder/600/800" 
                            alt="Asia Pacific Digital Transformation" 
                            className="h-full w-full object-cover mix-blend-overlay opacity-60"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/90 via-blue-700/60 to-transparent"></div>
                        <div className="relative p-6 md:p-8 flex h-full">
                          <div className="mt-auto">
                            <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm inline-block mb-4">
                              Case Study #1
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                              Asia Pacific Market Transformation
                            </h3>
                            <div className="flex items-center text-blue-100 mb-4">
                              <Users className="h-5 w-5 mr-2" />
                              <span>12.4M customers across 8 markets</span>
                            </div>
                            <div className="flex space-x-3 mt-4">
                              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">Mobile-First</span>
                              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">Social Commerce</span>
                              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">WeChat Integration</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-3 p-6 md:p-8">
                        <div className="space-y-6">
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Revenue Growth
                              </p>
                              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                +16.8%
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Mobile Orders
                              </p>
                              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                74%
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Digital Engagement
                              </p>
                              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                4.7M
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Challenge
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              Amway faced declining engagement in the Asia Pacific region, with traditional MLM methods failing to resonate with tech-savvy Millennial and Gen Z consumers. Mobile adoption was high, but Amway's systems were primarily desktop-focused.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Solution
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              The company implemented a mobile-first strategy with integrated social commerce capabilities, allowing distributors to share and sell products directly through popular platforms like WeChat and LINE. Key initiatives included:
                            </p>
                            <ul className="space-y-2 mb-4">
                              {[
                                "WeChat Mini-Program integration for seamless product browsing and purchasing",
                                "Social sharing automation with personalized affiliate links",
                                "Mobile AR product experiences for virtual try-before-you-buy",
                                "Gamified distributor training and customer engagement"
                              ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Results
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              Within 18 months, Amway APAC achieved a 16.8% revenue growth, with 74% of orders coming through mobile channels. Distributor acquisition costs decreased by 42%, while average distributor age dropped from 47 to 39 years.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {showCase2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl overflow-hidden shadow-xl border border-purple-100 dark:border-purple-800/30"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                      <div className="col-span-3 p-6 md:p-8 order-2 lg:order-1">
                        <div className="space-y-6">
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Automation ROI
                              </p>
                              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                314%
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Productivity Gain
                              </p>
                              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                +42%
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Commission Accuracy
                              </p>
                              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                99.8%
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Challenge
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              Amway's European operations struggled with inefficient manual processes for commission calculations, distributor onboarding, and compliance management. This created delays, errors, and distributor dissatisfaction.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Solution
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              Amway developed an integrated automation platform called "AmwayNext" that revolutionized operations through:
                            </p>
                            <ul className="space-y-2 mb-4">
                              {[
                                "Blockchain-based commission calculations with real-time dashboard visibility",
                                "AI-powered compliance monitoring for regulatory adherence across different EU markets",
                                "Automated distributor onboarding with KYC verification",
                                "Predictive inventory management tied to distributor activity patterns"
                              ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Results
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              The solution delivered a 314% ROI within two years, with commission processing time reduced from 5 days to 4 hours. Compliance violations decreased by 87%, while distributor satisfaction scores improved from 72% to 91%.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-2 relative overflow-hidden order-1 lg:order-2">
                        <div className="absolute inset-0 bg-purple-600 dark:bg-purple-800">
                          <img 
                            src="/api/placeholder/600/800" 
                            alt="European Operations Automation" 
                            className="h-full w-full object-cover mix-blend-overlay opacity-60"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-800/90 via-purple-700/60 to-transparent"></div>
                        <div className="relative p-6 md:p-8 flex h-full">
                          <div className="mt-auto">
                            <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm inline-block mb-4">
                              Case Study #2
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                              European Operations Automation
                            </h3>
                            <div className="flex items-center text-purple-100 mb-4">
                              <Zap className="h-5 w-5 mr-2" />
                              <span>Serving 18 markets across Europe</span>
                            </div>
                            <div className="flex space-x-3 mt-4">
                              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">Blockchain</span>
                              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">Automation</span>
                              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">Compliance</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 text-sm font-medium mb-4">
                Questions & Answers
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Detailed insights into Amway's digital transformation approach
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-all ${
                      expandedFaq === index ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                    }`}
                  >
                    <button
                      className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white p-6"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="pr-8">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative">
              {/* Background elements */}
              <div className="absolute inset-0 overflow-hidden opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                      <rect width="100" height="100" fill="url(#smallGrid)" />
                      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2"></div>
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Ready to Transform Your MLM Business?
                  </h2>
                  <p className="text-blue-100 text-lg max-w-2xl">
                    Learn how our Marketing Automation platform can help you achieve similar results to Amway's digital transformation journey.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 shadow-lg hover:shadow-xl transition-all rounded-full"
                  >
                    Request Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 px-8 py-3 backdrop-blur-sm rounded-full"
                  >
                    Download Case Study
                    <Download className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Tab content components
const TechnologyIntegrationTab = ({ techFeatures }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Key Technology Integrations
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway has transformed its traditional MLM approach by integrating cutting-edge technologies that streamline operations, enhance distributor effectiveness, and create seamless customer experiences across all touchpoints.
        </p>
        
        <div className="mt-8 space-y-6">
          {techFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-inner">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Implementation Effectiveness
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Performance metrics of key technology pillars in Amway's digital transformation
        </p>
        
        <div className="space-y-5 mt-8">
          {techFeatures.map((feature) => (
            <div key={feature.id} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {feature.title}
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {feature.stats.effectiveness}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${feature.stats.effectiveness}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Adoption Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-grow">
                      <motion.div 
                        className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.stats.adoption}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {feature.stats.adoption}%
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">ROI Score</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-grow">
                      <motion.div 
                        className="h-full bg-purple-500 dark:bg-purple-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.stats.roi}%` }}
                        transition={{ duration: 1, delay: 0.9 }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {feature.stats.roi}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-100 dark:border-gray-600/50">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">Integration Insight</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Blockchain technology shows the lowest adoption rate but is projected to become a critical differentiator by 2026 as transparency requirements increase across global markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Traditional vs. Digital MLM Approach
      </h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 dark:bg-blue-800/50">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                Business Area
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                Traditional MLM
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                Technology-Enabled MLM
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                Impact
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-200 dark:divide-blue-700/50">
            {[
              {
                area: "Distributor Recruitment",
                traditional: "In-person presentations, manual registration",
                digital: "AI-matched leads, digital onboarding, video training",
                impact: "74% faster onboarding, 62% lower acquisition cost"
              },
              {
                area: "Order Processing",
                traditional: "Paper orders, manual entry, batch processing",
                digital: "Mobile ordering, subscription automation, real-time inventory",
                impact: "98% order accuracy, 3.2x faster fulfillment"
              },
              {
                area: "Compensation Management",
                traditional: "Manual calculations, monthly processing, limited transparency",
                digital: "Blockchain-verified transactions, real-time dashboards",
                impact: "99.8% accuracy, 83% reduction in disputes"
              },
              {
                area: "Customer Relationship",
                traditional: "Generic marketing, intermittent communication",
                digital: "Personalized engagement, omnichannel presence, predictive recommendations",
                impact: "32% higher customer lifetime value, 28% better retention"
              },
            ].map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/10'}>
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-white border border-blue-200 dark:border-blue-700/50 font-medium">
                  {row.area}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300 border border-blue-200 dark:border-blue-700/50">
                  {row.traditional}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300 border border-blue-200 dark:border-blue-700/50">
                  {row.digital}
                </td>
                <td className="py-3 px-4 text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50 font-medium">
                  {row.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const CrmMarketingTab = ({ crmFeatures }) => (
  <div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 order-2 lg:order-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Marketing Automation & CRM Strategy
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway has modernized its customer relationship management and marketing processes, shifting from a traditional sales-oriented model to a digitally-driven, personalized engagement strategy that leverages automation and data intelligence.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {crmFeatures.map((feature, index) => {
            const colorMap = {
              blue: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 border-blue-200 dark:border-blue-700/30",
              indigo: "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/30 border-indigo-200 dark:border-indigo-700/30",
              purple: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 border-purple-200 dark:border-purple-700/30",
              pink: "from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/30 border-pink-200 dark:border-pink-700/30"
            };
            
            const iconColors = {
              blue: "text-blue-600 dark:text-blue-400",
              indigo: "text-indigo-600 dark:text-indigo-400",
              purple: "text-purple-600 dark:text-purple-400",
              pink: "text-pink-600 dark:text-pink-400"
            };
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`bg-gradient-to-br ${colorMap[feature.color]} border rounded-xl p-5 shadow-sm`}
              >
                <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm inline-block mb-4 ${iconColors[feature.color]}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/30">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            Key Automation Workflows
          </h4>
          
          <div className="space-y-6">
            {[
              {
                name: "Distributor Onboarding Journey",
                stages: [
                  "Registration & KYC Verification",
                  "Welcome Email Series (5 emails)",
                  "Product Training Nudges",
                  "Business Building Milestones",
                  "Ongoing Performance Coaching"
                ],
                metrics: [
                  "74% completion rate",
                  "3.2x faster time to first sale",
                  "41% higher 90-day retention"
                ]
              },
              {
                name: "Customer Nurture Sequence",
                stages: [
                  "Welcome Series",
                  "Product Education",
                  "Social Proof & Testimonials",
                  "Cross-sell Recommendations",
                  "Loyalty Program Engagement"
                ],
                metrics: [
                  "28% increase in repeat purchases",
                  "47% higher email engagement",
                  "32% increase in average order value"
                ]
              }
            ].map((workflow, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-indigo-100 dark:border-indigo-800/30">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">{workflow.name}</h5>
                
                <div className="relative">
                  {/* Connecting line */}
                  <div className="absolute top-4 left-3 h-full w-0.5 bg-indigo-200 dark:bg-indigo-700/50"></div>
                  
                  <div className="space-y-4 relative">
                    {workflow.stages.map((stage, j) => (
                      <div key={j} className="flex items-center ml-1">
                        <div className="w-5 h-5 rounded-full bg-indigo-500 dark:bg-indigo-400 z-10 flex-shrink-0"></div>
                        <div className="ml-4 text-sm text-gray-600 dark:text-gray-300">{stage}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h6 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">PERFORMANCE METRICS</h6>
                  <div className="flex flex-wrap gap-2">
                    {workflow.metrics.map((metric, j) => (
                      <span key={j} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs rounded-md">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="order-1 lg:order-2">
        <div className="sticky top-24 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-xl text-white overflow-hidden shadow-xl">
            <div className="p-6">
              <h4 className="font-bold text-xl mb-4">CRM Implementation Impact</h4>
              <p className="text-indigo-100 mb-6">
                Key performance indicators after implementing Amway's integrated CRM and marketing automation platform
              </p>
              
              <div className="space-y-6">
                {[
                  { label: "Lead Response Time", before: "24 hours", after: "8 minutes", improvement: "-99.4%" },
                  { label: "Campaign Setup Time", before: "2 weeks", after: "3 hours", improvement: "-98.9%" },
                  { label: "Conversion Rate", before: "2.4%", after: "6.8%", improvement: "+183%" },
                  { label: "Customer Satisfaction", before: "72%", after: "91%", improvement: "+26%" }
                ].map((metric, i) => (
                  <div key={i} className="flex justify-between items-center pb-2 border-b border-indigo-500 dark:border-indigo-400/30">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <div className="flex items-center gap-3">
                      <div className="text-xs px-2 py-1 bg-white/10 rounded">
                        {metric.before}
                      </div>
                      <ChevronRight className="h-4 w-4 text-indigo-300" />
                      <div className="text-xs px-2 py-1 bg-white/20 rounded font-medium">
                        {metric.after}
                      </div>
                      <div className={`text-xs font-medium ${
                        metric.improvement.startsWith('+') 
                          ? 'text-green-300' 
                          : 'text-red-300'
                      }`}>
                        {metric.improvement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Technology Stack</h4>
            
            <div className="space-y-4">
              {[
                { name: "CRM Platform", value: "Salesforce Marketing Cloud" },
                { name: "Email Automation", value: "Salesforce Pardot" },
                { name: "Customer Data Platform", value: "Segment" },
                { name: "Personalization Engine", value: "Dynamic Yield" },
                { name: "Analytics Platform", value: "Looker + Tableau" }
              ].map((tech, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{tech.name}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{tech.value}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Integration between legacy systems and new platforms was the most significant technical challenge, requiring custom middleware development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DataAnalyticsTab = ({ dataPoints }) => (
  <div>
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
      <div className="lg:col-span-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Data Analytics & Business Intelligence
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway has transformed its decision-making processes through comprehensive data analytics and machine learning, turning vast datasets into actionable insights that drive strategic initiatives and operational improvements.
        </p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataPoints.map((point, index) => {
            const colorMap = {
              blue: "border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20",
              green: "border-green-200 dark:border-green-700/50 bg-green-50 dark:bg-green-900/20",
              purple: "border-purple-200 dark:border-purple-700/50 bg-purple-50 dark:bg-purple-900/20",
              orange: "border-orange-200 dark:border-orange-700/50 bg-orange-50 dark:bg-orange-900/20"
            };
            
            const textColors = {
              blue: "text-blue-600 dark:text-blue-400",
              green: "text-green-600 dark:text-green-400",
              purple: "text-purple-600 dark:text-purple-400",
              orange: "text-orange-600 dark:text-orange-400"
            };
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`rounded-xl border ${colorMap[point.color]} p-5`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {point.title}
                  </h4>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    point.change.startsWith('+') 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}>
                    {point.change}
                  </div>
                </div>
                
                <div className={`text-3xl font-bold mb-2 ${textColors[point.color]}`}>
                  {point.value}
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {point.prediction}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-xl text-white p-6 shadow-lg">
          <h4 className="font-bold text-xl mb-5">Key Data Insights</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "24% Higher Response Rate",
                description: "AI-powered personalized product recommendations outperform generic promotions by 24% in distributor-led campaigns."
              },
              {
                title: "86% Accurate Sales Forecasting",
                description: "Machine learning models now predict month-ahead sales with 86% accuracy, up from 62% with traditional methods."
              },
              {
                title: "$43M Annual Cost Reduction",
                description: "Predictive inventory optimization has reduced overstock and stockout situations, saving $43M annually."
              },
              {
                title: "37% Churn Prediction Accuracy",
                description: "Early warning system identifies distributors at risk of leaving with 37% higher accuracy than previous methods."
              }
            ].map((insight, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h5 className="font-bold text-lg mb-2">{insight.title}</h5>
                <p className="text-sm text-blue-100">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">Data Analysis Framework</h4>
          </div>
          
          <div className="p-6">
            <div className="space-y-8">
              {[
                {
                  step: "Data Collection",
                  description: "Structured and unstructured data gathering from multiple sources",
                  elements: [
                    "Customer Interactions (CRM)",
                    "E-commerce Behavior",
                    "Social Media Engagement",
                    "Distributor Performance",
                    "Market Trends & Competition"
                  ]
                },
                {
                  step: "Data Processing",
                  description: "Cleaning, transformation and integration of disparate data sources",
                  elements: [
                    "Data Cleansing & Normalization",
                    "ETL Processes",
                    "Data Warehousing",
                    "Real-time Processing Pipelines",
                    "Data Lake Architecture"
                  ]
                },
                {
                  step: "Analysis & Modeling",
                  description: "Applying statistical methods and machine learning algorithms",
                  elements: [
                    "Predictive Analytics",
                    "Customer Segmentation",
                    "Propensity Modeling",
                    "Time Series Forecasting",
                    "Network Effect Analysis"
                  ]
                },
                {
                  step: "Visualization & Reporting",
                  description: "Converting insights into actionable dashboards and reports",
                  elements: [
                    "Executive Dashboards",
                    "Operational Reports",
                    "Distributor Performance Scorecards",
                    "Market Opportunity Maps",
                    "Automated Alerts & Notifications"
                  ]
                }
              ].map((phase, i) => (
                <div key={i} className="relative">
                  {/* Connection line */}
                  {i < 3 && (
                    <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                  )}
                  
                  {/* Phase circle */}
                  <div className="flex items-start gap-5">
                    <div className="relative z-10 w-14 h-14 rounded-full bg-blue-500 dark:bg-blue-400 text-white flex items-center justify-center font-bold text-lg">
                      {i + 1}
                    </div>
                    
                    <div>
                      <h5 className="font-bold text-gray-900 dark:text-white text-lg">{phase.step}</h5>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{phase.description}</p>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600">
                        <ul className="space-y-2">
                          {phase.elements.map((element, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                              <span className="text-gray-700 dark:text-gray-300">{element}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800/30 shadow-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500 dark:text-amber-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Data Governance Challenge</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Amway's most significant challenge in implementing data analytics was establishing consistent data governance across 100+ global markets with different regulatory requirements, particularly in Asia Pacific and European regions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                This required creating a flexible data governance framework that maintained global consistency while accounting for local compliance needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FutureTrendsTab = ({ futureImpact }) => (
  <div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Future Technology Trends
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway is positioning itself at the forefront of technological innovation in the MLM industry, with strategic investments in emerging technologies that will reshape direct selling in the coming years.
        </p>
        
        <div className="mt-8 space-y-6">
          {[
            {
              title: "Artificial Intelligence & Machine Learning",
              description: "AI will power personalized recommendations, predictive analytics, and automated customer service, enabling distributors to focus on relationship building rather than administrative tasks.",
              icon: Zap,
              color: "purple"
            },
            {
              title: "Immersive Technologies (AR/VR)",
              description: "Virtual product demonstrations, training environments, and digital showrooms will transform how distributors engage with customers and learn about products.",
              icon: Smartphone,
              color: "blue"
            },
            {
              title: "Blockchain & Smart Contracts",
              description: "Transparent, automated commission calculations and product authenticity verification will increase trust and reduce operational overhead in the MLM model.",
              icon: Lock,
              color: "green"
            },
            {
              title: "Voice Commerce & Conversational AI",
              description: "Voice-activated ordering and AI-powered virtual assistants will simplify the customer and distributor experience across touchpoints.",
              icon: Users,
              color: "orange"
            }
          ].map((trend, index) => {
            const colorMap = {
              purple: "border-l-purple-500 dark:border-l-purple-400",
              blue: "border-l-blue-500 dark:border-l-blue-400",
              green: "border-l-green-500 dark:border-l-green-400",
              orange: "border-l-orange-500 dark:border-l-orange-400"
            };
            
            const bgColors = {
              purple: "bg-purple-50 dark:bg-purple-900/20",
              blue: "bg-blue-50 dark:bg-blue-900/20",
              green: "bg-green-50 dark:bg-green-900/20",
              orange: "bg-orange-50 dark:bg-orange-900/20"
            };
            
            const iconColors = {
              purple: "text-purple-500 dark:text-purple-400",
              blue: "text-blue-500 dark:text-blue-400",
              green: "text-green-500 dark:text-green-400",
              orange: "text-orange-500 dark:text-orange-400"
            };
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`rounded-lg border-l-4 ${colorMap[trend.color]} ${bgColors[trend.color]} p-5 shadow-sm`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${iconColors[trend.color]}`}></div>