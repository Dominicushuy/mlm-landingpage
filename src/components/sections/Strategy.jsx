import React, { forwardRef } from "react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Container, Grid, GridItem, Flex } from "../layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FeatureCard, CalloutCard } from "../features/feature-card";
import { PieChart } from "../charts/chart-components";
import { Check } from "lucide-react";
import {
  implementationPhases,
  benefitsPieChartData,
  CHART_COLORS,
} from "../../data/siteData";

const Strategy = forwardRef(({ isVisible }, ref) => {
  return (
    <Section
      id="strategy"
      ref={ref}
      variant="default"
      isVisible={isVisible}
      animation="fade-in"
      container
    >
      <SectionHeader>
        <SectionSubtitle>Chiến lược</SectionSubtitle>
        <SectionTitle>Chiến lược cho thị trường Việt Nam</SectionTitle>
        <SectionDescription>
          Đề xuất chiến lược triển khai Marketing Automation cho doanh nghiệp
          MLM tại Việt Nam
        </SectionDescription>
      </SectionHeader>

      <Grid cols={3} gap="lg">
        <GridItem>
          <Card
            variant="outline"
            className="border-gray-200 dark:border-gray-700 h-full"
          >
            <CardContent className="p-6">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Yếu tố cần thiết
              </CardTitle>
              <ul className="space-y-3 mt-4">
                <RequirementItem text="Cá nhân hoá trải nghiệm khách hàng" />
                <RequirementItem text="Tích hợp hệ thống quản lý CRM" />
                <RequirementItem text="Áp dụng công cụ tự động hóa đa kênh" />
                <RequirementItem text="Tuân thủ quy định pháp lý hiện hành" />
              </ul>
            </CardContent>
          </Card>
        </GridItem>

        <GridItem colSpan={2}>
          <Card
            variant="filled"
            className="bg-blue-700 dark:bg-blue-800 text-white"
          >
            <CardContent className="p-6">
              <CardTitle className="text-xl font-bold mb-4 text-white">
                Quy trình triển khai Marketing Automation
              </CardTitle>
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
            </CardContent>
          </Card>
        </GridItem>
      </Grid>

      <Grid cols={2} gap="lg" className="mt-10">
        <GridItem>
          <Card variant="default">
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Đề xuất cụ thể
              </CardTitle>

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
            </CardContent>
          </Card>
        </GridItem>

        <GridItem>
          <Card
            variant="gradient"
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white h-full"
          >
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-bold text-white mb-6">
                Lợi ích kỳ vọng
              </CardTitle>

              <CardTitle className="text-lg font-semibold text-white mb-2">
                Phân bổ lợi ích
              </CardTitle>
              <div className="h-64">
                <PieChart
                  data={benefitsPieChartData}
                  colors={CHART_COLORS}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                />
              </div>
            </CardContent>
          </Card>
        </GridItem>
      </Grid>
    </Section>
  );
});

// Helper components
const RequirementItem = ({ text }) => (
  <li className="flex items-start">
    <Check className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-1 mr-2" />
    <span className="text-gray-600 dark:text-gray-300">{text}</span>
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
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
      <span className="text-blue-600 dark:text-blue-400 mr-2">{number}</span>
      {title}
    </h4>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

Strategy.displayName = "Strategy";

export default Strategy;
