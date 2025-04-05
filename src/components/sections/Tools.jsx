import React, { forwardRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import BarChartComponent from "../charts/BarChartComponent";
import { toolsComparisonData } from "../../data/siteData";

const Tools = forwardRef(({ isVisible }, ref) => {
  return (
    <section
      id="tools"
      ref={ref}
      className={`py-24 bg-blue-50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Công cụ"
          title="So sánh công cụ tự động hóa"
          description="Phân tích và so sánh các công cụ tự động hóa tiếp thị hiện có cho mô hình MLM"
        />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              So sánh chức năng các công cụ
            </h3>
            <div className="h-80">
              <BarChartComponent
                data={toolsComparisonData}
                bars={[
                  { dataKey: "epixel", name: "Epixel MLM Software" },
                  { dataKey: "global", name: "Global MLM Software" },
                  { dataKey: "bi", name: "Công cụ BI (Tableau/Sisense)" },
                ]}
              />
            </div>
          </div>
        </div>

        <ComparisonTable />
      </div>
    </section>
  );
});

// Comparison table component
const ComparisonTable = () => (
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
        <ComparisonRow
          criteria="Quản lý Hoa hồng"
          epixel="Tự động hóa tính toán hoa hồng, báo cáo minh bạch"
          global="Tự động tính toán và phân phối hoa hồng"
          bi="Không áp dụng trực tiếp"
        />
        <ComparisonRow
          criteria="CRM"
          epixel="Quản lý mạng lưới phân phối đầy đủ, CRM tích hợp"
          global="Quản lý thông tin liên hệ, tự động cập nhật CRM"
          bi="Hỗ trợ phân tích dữ liệu phân phối"
        />
        <ComparisonRow
          criteria="Email Marketing"
          epixel="Hỗ trợ các chiến dịch email tự động"
          global="Hỗ trợ tự động nuôi dưỡng khách hàng qua email"
          bi="Không áp dụng trực tiếp"
        />
        <ComparisonRow
          criteria="Phân tích Dữ liệu"
          epixel="Báo cáo tự động, tích hợp BI"
          global="Tích hợp các công cụ phân tích và báo cáo"
          bi="Phân tích chuyên sâu"
        />
        <ComparisonRow
          criteria="Tích hợp Đa kênh"
          epixel="Tích hợp thông báo qua SMS, email và mạng xã hội"
          global="Tích hợp tương tác đa kênh"
          bi="Không áp dụng trực tiếp"
        />
      </tbody>
    </table>
  </div>
);

const ComparisonRow = ({ criteria, epixel, global, bi }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {criteria}
    </td>
    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
      {epixel}
    </td>
    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
      {global}
    </td>
    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{bi}</td>
  </tr>
);

Tools.displayName = "Tools";

export default Tools;
