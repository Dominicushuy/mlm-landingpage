import React, { forwardRef } from "react";
import { Check, Users, Mail, DollarSign, BarChart2 } from "lucide-react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Grid, GridItem } from "../layout/container";
import { FeatureCard } from "../features/feature-card";
import { BarChart } from "../charts/chart-components";
import { automationBenefitsData } from "../../data/siteData";

const Solutions = forwardRef(({ isVisible }, ref) => {
  return (
    <Section
      id="solutions"
      ref={ref}
      variant="gradientVertical"
      animation="fade-in"
      isVisible={isVisible}
      container
    >
      <SectionHeader>
        <SectionSubtitle>Giải pháp</SectionSubtitle>
        <SectionTitle>Marketing Automation cho MLM</SectionTitle>
        <SectionDescription>
          Các giải pháp công nghệ tự động hóa giúp nâng cao hiệu quả hoạt động
          và chuyển đổi số cho mô hình MLM
        </SectionDescription>
      </SectionHeader>

      <Grid cols={2} gap="lg">
        <GridItem>
          <div className="h-80">
            <BarChart
              data={automationBenefitsData}
              bars={[{ dataKey: "value", name: "Hiệu quả (%)" }]}
              layout="vertical"
            />
          </div>

          <BenefitsList />
        </GridItem>

        <GridItem>
          <div className="space-y-6">
            <FeatureCard
              icon={Users}
              title="Tự động hóa quản lý liên hệ và CRM"
              description="Tích hợp hệ thống CRM giúp lưu trữ, phân loại và theo dõi
                thông tin khách hàng một cách khoa học. Tự động cập nhật các
                thông tin tương tác, giúp phân tích hành vi khách hàng để đưa
                ra các giải pháp tiếp thị cá nhân hoá."
              variant="default"
              iconBg="light"
              interactive
            />

            <FeatureCard
              icon={Mail}
              title="Tự động hóa Email Marketing"
              description="Sử dụng các công cụ như MailChimp, Marketo để tự động gửi
                email theo lịch trình, phân chia danh sách theo nhóm khách
                hàng nhằm gửi thông điệp phù hợp vào thời điểm thích hợp."
              variant="outline"
              iconBg="light"
              interactive
            />

            <FeatureCard
              icon={DollarSign}
              title="Tự động hóa quản lý hoa hồng"
              description="Các hệ thống tự động tính toán và phân phối hoa hồng dựa trên
                hiệu suất của mạng lưới phân phối, giảm thiểu sai sót và đảm
                bảo tính minh bạch."
              variant="outline"
              iconBg="light"
              interactive
            />

            <FeatureCard
              icon={BarChart2}
              title="Tích hợp phân tích dữ liệu (BI)"
              description="Sử dụng các nền tảng BI như Tableau, Sisense để theo dõi và
                phân tích dữ liệu kinh doanh theo thời gian thực, từ đó đưa ra
                các dự báo chính xác và hỗ trợ quyết định chiến lược."
              variant="outline"
              iconBg="light"
              interactive
            />
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
});

// Helper components
const BenefitsList = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
      Lợi ích của Marketing Automation
    </h3>
    <ul className="space-y-3">
      <BenefitItem text="Giảm tải khối lượng công việc thủ công" />
      <BenefitItem text="Tăng hiệu quả kinh doanh và tính chính xác" />
      <BenefitItem text="Cá nhân hoá trải nghiệm khách hàng" />
      <BenefitItem text="Tăng cường minh bạch trong quản lý hoa hồng" />
      <BenefitItem text="Hỗ trợ ra quyết định dựa trên dữ liệu thực tế" />
    </ul>
  </div>
);

const BenefitItem = ({ text }) => (
  <li className="flex items-start">
    <Check className="h-5 w-5 text-green-500 mt-1 mr-2" />
    <span className="text-gray-600 dark:text-gray-300">{text}</span>
  </li>
);

Solutions.displayName = "Solutions";

export default Solutions;
