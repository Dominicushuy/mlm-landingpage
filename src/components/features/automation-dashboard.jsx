import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Grid, GridItem, Flex } from "../layout/container";
import { BarChart, LineChart, PieChart } from "../charts/chart-components";
import { FeatureCard, StatCard } from "../features/feature-card";
import {
  BarChart2,
  Users,
  Mail,
  DollarSign,
  Clock,
  Filter,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

/**
 * Dashboard component demonstrating marketing automation metrics
 */
const AutomationDashboard = ({ className }) => {
  const [timeRange, setTimeRange] = useState("month");
  const [selectedView, setSelectedView] = useState("overview");

  // Sample data
  const overviewData = [
    { month: "Jan", campaigns: 5, leads: 120, conversions: 32 },
    { month: "Feb", campaigns: 7, leads: 145, conversions: 41 },
    { month: "Mar", campaigns: 4, leads: 98, conversions: 26 },
    { month: "Apr", campaigns: 8, leads: 180, conversions: 54 },
    { month: "May", campaigns: 10, leads: 220, conversions: 72 },
    { month: "Jun", campaigns: 9, leads: 205, conversions: 68 },
  ];

  const channelData = [
    { name: "Email", value: 42 },
    { name: "SMS", value: 28 },
    { name: "Social", value: 18 },
    { name: "Push", value: 12 },
  ];

  const conversionData = [
    { stage: "Tiếp cận", value: 100 },
    { stage: "Quan tâm", value: 68 },
    { stage: "Đánh giá", value: 45 },
    { stage: "Thử nghiệm", value: 32 },
    { stage: "Chuyển đổi", value: 22 },
  ];

  const automationMetrics = {
    emailsSent: 3245,
    emailOpenRate: 28.4,
    emailOpenRateTrend: 3.2,
    clickRate: 12.6,
    clickRateTrend: -1.8,
    leadGeneration: 245,
    leadGenerationTrend: 15.4,
    conversions: 86,
    conversionsTrend: 8.7,
    timeSpent: 112,
    timeSpentTrend: -23.5,
  };

  return (
    <div className={className}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Marketing Automation Dashboard
        </h2>

        <Flex gap="sm">
          <div className="flex rounded-md shadow-sm">
            <Button
              variant={timeRange === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("week")}
              className="rounded-l-md rounded-r-none"
            >
              Tuần
            </Button>
            <Button
              variant={timeRange === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("month")}
              className="rounded-none border-l-0 border-r-0"
            >
              Tháng
            </Button>
            <Button
              variant={timeRange === "quarter" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("quarter")}
              className="rounded-r-md rounded-l-none"
            >
              Quý
            </Button>
          </div>

          <div className="flex rounded-md shadow-sm">
            <Button
              variant={selectedView === "overview" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView("overview")}
              className="rounded-l-md rounded-r-none"
            >
              Tổng quan
            </Button>
            <Button
              variant={selectedView === "channels" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView("channels")}
              className="rounded-none border-l-0 border-r-0"
            >
              Kênh
            </Button>
            <Button
              variant={selectedView === "funnel" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView("funnel")}
              className="rounded-r-md rounded-l-none"
            >
              Phễu
            </Button>
          </div>
        </Flex>
      </div>

      <Grid cols={4} gap="md">
        <GridItem>
          <StatCard
            icon={Mail}
            title="Email đã gửi"
            value={automationMetrics.emailsSent.toLocaleString()}
            trend={automationMetrics.emailOpenRateTrend}
            trendLabel="so với trước"
            description="Tổng số email đã gửi trong kỳ"
          />
        </GridItem>
        <GridItem>
          <StatCard
            icon={Users}
            title="Leads được tạo"
            value={automationMetrics.leadGeneration.toLocaleString()}
            trend={automationMetrics.leadGenerationTrend}
            trendLabel="so với trước"
            description="Số leads mới được tạo từ chiến dịch"
          />
        </GridItem>
        <GridItem>
          <StatCard
            icon={DollarSign}
            title="Conversions"
            value={automationMetrics.conversions.toLocaleString()}
            trend={automationMetrics.conversionsTrend}
            trendLabel="so với trước"
            description="Số khách hàng đã hoàn tất giao dịch"
          />
        </GridItem>
        <GridItem>
          <StatCard
            icon={Clock}
            title="Thời gian tiết kiệm"
            value={`${automationMetrics.timeSpent}h`}
            trend={automationMetrics.timeSpentTrend}
            trendLabel="so với trước"
            description="Thời gian tiết kiệm nhờ tự động hóa"
          />
        </GridItem>
      </Grid>

      <Grid cols={3} gap="md" className="mt-6">
        <GridItem colSpan={2}>
          <Card variant="default">
            <CardHeader>
              <CardTitle>Hiệu suất theo thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                {selectedView === "overview" && (
                  <LineChart
                    data={overviewData}
                    lines={[
                      { dataKey: "leads", name: "Số Leads" },
                      {
                        dataKey: "conversions",
                        name: "Conversions",
                        color: "#10b981",
                      },
                    ]}
                    xAxisKey="month"
                  />
                )}
                {selectedView === "channels" && (
                  <BarChart
                    data={overviewData}
                    bars={[
                      { dataKey: "campaigns", name: "Chiến dịch" },
                      { dataKey: "leads", name: "Leads", color: "#3b82f6" },
                      {
                        dataKey: "conversions",
                        name: "Conversions",
                        color: "#10b981",
                      },
                    ]}
                    xAxisKey="month"
                  />
                )}
                {selectedView === "funnel" && (
                  <BarChart
                    data={conversionData}
                    bars={[{ dataKey: "value", name: "Khách hàng" }]}
                    xAxisKey="stage"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </GridItem>

        <GridItem>
          <Card variant="default" className="h-full">
            <CardHeader>
              <CardTitle>Phân bổ theo kênh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <PieChart
                  data={channelData}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                />
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Tỷ lệ mở email
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {automationMetrics.emailOpenRate}%
                    </span>
                    <div
                      className={`ml-2 flex items-center ${
                        automationMetrics.emailOpenRateTrend > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {automationMetrics.emailOpenRateTrend > 0 ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )}
                      <span className="text-xs">
                        {Math.abs(automationMetrics.emailOpenRateTrend)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Click-through rate
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {automationMetrics.clickRate}%
                    </span>
                    <div
                      className={`ml-2 flex items-center ${
                        automationMetrics.clickRateTrend > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {automationMetrics.clickRateTrend > 0 ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )}
                      <span className="text-xs">
                        {Math.abs(automationMetrics.clickRateTrend)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </GridItem>
      </Grid>

      <Grid cols={2} gap="md" className="mt-6">
        <GridItem>
          <FeatureCard
            icon={Filter}
            title="Automation Workflows"
            description={
              <div className="mt-4 space-y-3">
                <WorkflowItem
                  name="Welcome Series"
                  status="active"
                  stats={{ sent: 328, opened: 245, clicked: 188 }}
                />
                <WorkflowItem
                  name="Abandoned Cart"
                  status="active"
                  stats={{ sent: 156, opened: 98, clicked: 73 }}
                />
                <WorkflowItem
                  name="Re-engagement"
                  status="paused"
                  stats={{ sent: 215, opened: 112, clicked: 65 }}
                />
                <WorkflowItem
                  name="Post-Purchase"
                  status="active"
                  stats={{ sent: 187, opened: 145, clicked: 104 }}
                />
              </div>
            }
            variant="default"
            iconPosition="top"
          />
        </GridItem>

        <GridItem>
          <FeatureCard
            icon={BarChart2}
            title="Campaign Performance"
            description={
              <div className="mt-4 space-y-3">
                <CampaignItem
                  name="Summer Sale"
                  performance={85}
                  status="completed"
                />
                <CampaignItem
                  name="New Product Launch"
                  performance={68}
                  status="active"
                />
                <CampaignItem
                  name="Customer Feedback"
                  performance={42}
                  status="active"
                />
                <CampaignItem
                  name="Loyalty Program"
                  performance={91}
                  status="active"
                />
              </div>
            }
            variant="default"
            iconPosition="top"
          />
        </GridItem>
      </Grid>
    </div>
  );
};

// Helper components
const WorkflowItem = ({ name, status, stats }) => {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div>
        <div className="flex items-center">
          <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
          <span
            className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            }`}
          >
            {status === "active" ? "Active" : "Paused"}
          </span>
        </div>
        <div className="flex space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span>{stats.sent} sent</span>
          <span>{stats.opened} opened</span>
          <span>{stats.clicked} clicked</span>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        Edit
      </Button>
    </div>
  );
};

const CampaignItem = ({ name, performance, status }) => {
  return (
    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            status === "active"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
              : status === "completed"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Performance</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {performance}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              performance >= 80
                ? "bg-green-500"
                : performance >= 50
                ? "bg-blue-500"
                : "bg-yellow-500"
            }`}
            style={{ width: `${performance}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AutomationDashboard;
