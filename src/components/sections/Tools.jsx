import React, { forwardRef } from "react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { toolsComparisonData } from "../../data/siteData";
import { BarChart } from "../charts/chart-components";

const Tools = forwardRef(({ isVisible }, ref) => {
  return (
    <Section
      id="tools"
      ref={ref}
      variant="primary"
      animation="fade-in"
      isVisible={isVisible}
      container
    >
      <SectionHeader>
        <SectionSubtitle>Công cụ</SectionSubtitle>
        <SectionTitle>So sánh công cụ tự động hóa</SectionTitle>
        <SectionDescription>
          Phân tích và so sánh các công cụ tự động hóa tiếp thị hiện có cho mô
          hình MLM
        </SectionDescription>
      </SectionHeader>

      <Card variant="elevated" className="mb-10">
        <CardHeader>
          <CardTitle>So sánh chức năng các công cụ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <BarChart
              data={toolsComparisonData}
              bars={[
                { dataKey: "epixel", name: "Epixel MLM Software" },
                { dataKey: "global", name: "Global MLM Software" },
                { dataKey: "bi", name: "Công cụ BI (Tableau/Sisense)" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      <ComparisonTable />
    </Section>
  );
});

// Comparison table component
const ComparisonTable = () => (
  <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg rounded-xl">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-900">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Tiêu chí
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Epixel MLM Software
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Global MLM Software
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            Công cụ BI (Tableau, Sisense)
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
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
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
      {criteria}
    </td>
    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
      {epixel}
    </td>
    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
      {global}
    </td>
    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
      {bi}
    </td>
  </tr>
);

Tools.displayName = "Tools";

export default Tools;
