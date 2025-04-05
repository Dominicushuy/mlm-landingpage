import React, { forwardRef, useState, useEffect } from "react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { MainSection } from "../layout/main-layout";
import { Grid, GridItem } from "../layout/container";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ResponsiveCard } from "../ui/responsive-card";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import CompareTool from "../features/compare-tool";
import AutomationDashboard from "../features/automation-dashboard";
import AutomationFlowBuilder from "../features/automation-flow-builder";

const DemoSection = forwardRef(({ isVisible }, ref) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // Simulate loading state for better UX
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <MainSection
      id="demo"
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <SectionHeader>
        <SectionSubtitle>Demo</SectionSubtitle>
        <SectionTitle>Marketing Automation in Action</SectionTitle>
        <SectionDescription>
          Trải nghiệm trực quan về các tính năng Marketing Automation cho MLM
        </SectionDescription>
      </SectionHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ResponsiveCard withBorder className="shadow-lg">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <CardTitle className="text-xl md:text-2xl">
                MAMLM Platform Demo
              </CardTitle>

              <TabsList
                variant="pills"
                className="grid grid-cols-3 w-full md:w-auto"
              >
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="builder">Flow Builder</TabsTrigger>
                <TabsTrigger value="compare">So sánh giải pháp</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 md:p-6">
              {/* Skeleton loader for better UX */}
              {loading ? (
                <div className="min-h-[500px] flex items-center justify-center">
                  <div className="w-full max-w-3xl mx-auto">
                    <div className="animate-pulse space-y-6">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
                      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                      </div>
                      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <TabsContent value="dashboard" className="mt-0">
                    <AutomationDashboard />
                  </TabsContent>

                  <TabsContent value="builder" className="mt-0">
                    <AutomationFlowBuilder />
                  </TabsContent>

                  <TabsContent value="compare" className="mt-0">
                    <CompareTool />
                  </TabsContent>
                </>
              )}
            </div>
          </CardContent>
        </ResponsiveCard>
      </Tabs>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8 md:mb-12">
          Tại sao nên sử dụng Marketing Automation?
        </h3>

        <Grid cols={1} md={3} gap="lg">
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
          <Button
            variant="default"
            size="lg"
            className="px-8 shadow-md hover:shadow-lg transition-all"
          >
            Đăng ký dùng thử miễn phí
          </Button>
        </div>
      </div>
    </MainSection>
  );
});

const FeatureCard = ({ icon, title, description }) => {
  return (
    <ResponsiveCard
      withBorder
      className="hover:border-blue-300 dark:hover:border-blue-700 h-full transform transition-all hover:translate-y-[-4px]"
    >
      <div className="p-6">
        <div className="mb-4 text-4xl">{icon}</div>
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h4>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </ResponsiveCard>
  );
};

DemoSection.displayName = "DemoSection";

export default DemoSection;
