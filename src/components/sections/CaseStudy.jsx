import React, { forwardRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import LineChartComponent from "../charts/LineChartComponent";
import { amwayRevenueData } from "../../data/siteData";

const CaseStudy = forwardRef(({ isVisible }, ref) => {
  return (
    <section
      id="casestudy"
      ref={ref}
      className={`py-24 bg-white transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Case Study"
          title="Amway: Thách thức trong kỷ nguyên số"
          description="Phân tích tình hình doanh thu và những thách thức của Amway - một biểu tượng trong ngành MLM"
        />

        <div className="bg-blue-50 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Doanh thu Amway (2019-2023)
              </h3>
              <div className="h-64">
                <LineChartComponent
                  data={amwayRevenueData}
                  lines={[{ dataKey: "revenue", name: "Doanh thu (tỷ USD)" }]}
                  xAxisKey="year"
                  yAxisDomain={[7.5, 8.5]}
                />
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
              <h3 className="text-2xl font-bold mb-6">Nguyên nhân sụt giảm</h3>
              <div className="space-y-6">
                <DeclineReason
                  number={1}
                  title="Thay đổi hành vi người tiêu dùng"
                  description="Người tiêu dùng ngày nay ưa chuộng sự tiện lợi và cá
                    nhân hoá trong trải nghiệm mua sắm."
                />

                <DeclineReason
                  number={2}
                  title="Áp lực cạnh tranh từ TMĐT"
                  description="Sự ra đời của các nền tảng bán hàng trực tuyến đã làm
                    tăng tính cạnh tranh, khiến các công ty MLM không thể
                    dựa vào mối quan hệ cá nhân truyền thống."
                />

                <DeclineReason
                  number={3}
                  title="Thiếu sự đổi mới công nghệ"
                  description="Các công ty MLM chưa tích hợp đầy đủ các giải pháp
                    Marketing Automation và các công cụ số hoá khác, dẫn đến
                    quản lý mạng lưới phân phối trở nên lỗi thời."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <RevenueTable />
        </div>
      </div>
    </section>
  );
});

// Helper components
const DeclineReason = ({ number, title, description }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-white text-blue-700 mt-1">
      <span className="font-bold">{number}</span>
    </div>
    <div className="ml-3">
      <h4 className="text-lg font-medium">{title}</h4>
      <p className="mt-1 text-blue-100">{description}</p>
    </div>
  </div>
);

const RevenueTable = () => (
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
            <TableRow year="2019" revenue="8,2" growth="-" />
            <TableRow year="2020" revenue="8,0" growth="-2,44%" isNegative />
            <TableRow year="2021" revenue="7,9" growth="-1,25%" isNegative />
            <TableRow year="2022" revenue="8,1" growth="+2,53%" isPositive />
            <TableRow year="2023" revenue="7,7" growth="-4,94%" isNegative />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TableRow = ({ year, revenue, growth, isPositive, isNegative }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {year}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {revenue}
    </td>
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm ${
        isPositive
          ? "text-green-500"
          : isNegative
          ? "text-red-500"
          : "text-gray-500"
      }`}
    >
      {growth}
    </td>
  </tr>
);

CaseStudy.displayName = "CaseStudy";

export default CaseStudy;
