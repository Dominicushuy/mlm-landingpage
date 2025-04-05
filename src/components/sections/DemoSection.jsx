import React, { forwardRef, useState } from "react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Container, Grid, GridItem, Flex } from "../layout/container";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import CompareTool from "../features/compare-tool";
import AutomationDashboard from "../features/automation-dashboard";
import AutomationFlowBuilder from "../features/automation-flow-builder";

const DemoSection = forwardRef(({ isVisible }, ref) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Section
      id="demo"
      ref={ref}
      variant="gradientVertical"
      animation="fade-in"
      isVisible={isVisible}
      container
      className="py-24"
    >
      <SectionHeader>
        <SectionSubtitle>Demo</SectionSubtitle>
        <SectionTitle>Marketing Automation in Action</SectionTitle>
        <SectionDescription>
          Trải nghiệm trực quan về các tính năng Marketing Automation cho MLM
        </SectionDescription>
      </SectionHeader>

      <Card variant="default" className="shadow-lg">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <CardTitle>MAMLM Platform Demo</CardTitle>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-auto"
            >
              <TabsList className="grid grid-cols-3 w-auto">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="builder">Flow Builder</TabsTrigger>
                <TabsTrigger value="compare">So sánh giải pháp</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6">
            <TabsContent value="dashboard" className="mt-0">
              <AutomationDashboard />
            </TabsContent>

            <TabsContent value="builder" className="mt-0">
              <AutomationFlowBuilder />
            </TabsContent>

            <TabsContent value="compare" className="mt-0">
              <CompareTool />
            </TabsContent>
          </div>
        </CardContent>
      </Card>

      <DemoFeatures />
    </Section>
  );
});

const DemoFeatures = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Tại sao nên sử dụng Marketing Automation?
      </h3>

      <Grid cols={3} gap="lg">
        <FeatureCard
          icon="⚡️"
          title="Tăng hiệu quả hoạt động"
          description="Tiết kiệm 85% thời gian và tài nguyên so với phương pháp truyền thống bằng cách tự động hóa các tác vụ lặp đi lặp lại."
        />

        <FeatureCard
          icon="🎯"
          title="Cá nhân hóa trải nghiệm"
          description="Tạo ra những chiến dịch marketing được cá nhân hóa dựa trên hành vi và sở thích của từng khách hàng."
        />

        <FeatureCard
          icon="📊"
          title="Dựa trên dữ liệu thực tế"
          description="Ra quyết định dựa trên các số liệu và phân tích thời gian thực, giúp tối ưu hóa chiến lược liên tục."
        />
      </Grid>

      <div className="mt-12 text-center">
        <Button variant="default" size="lg" className="px-8">
          Đăng ký dùng thử miễn phí
        </Button>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card
      variant="outline"
      className="hover:border-blue-300 dark:hover:border-blue-700 h-full transition-all"
    >
      <CardContent className="p-6">
        <div className="mb-4 text-4xl">{icon}</div>
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h4>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

DemoSection.displayName = "DemoSection";

export default DemoSection;
