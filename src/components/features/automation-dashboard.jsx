import React, { useState } from "react";
import { motion } from "framer-motion";
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
  Zap,
  Calendar,
  Bell,
  Settings,
  RefreshCw,
} from "lucide-react";

/**
 * Enhanced Dashboard component with modern UI/UX
 */
const AutomationDashboard = ({ className }) => {
  const [timeRange, setTimeRange] = useState("month");
  const [selectedView, setSelectedView] = useState("overview");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sample data (same as original)
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`${className} relative`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl -z-10"></div>
      <div className="absolute -top-5 -right-5 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 dark:from-blue-400/10 dark:to-indigo-500/10 rounded-full blur-xl -z-10"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-indigo-200/20 to-blue-300/20 dark:from-indigo-400/10 dark:to-blue-500/10 rounded-full blur-xl -z-10"></div>

      <motion.div
        variants={itemVariants}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
        >
          Marketing Automation Dashboard
        </motion.h2>

        <Flex gap="sm">
          <motion.div
            variants={itemVariants}
            className="flex rounded-md shadow-sm overflow-hidden"
          >
            <Button
              variant={timeRange === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("week")}
              className={`rounded-l-md rounded-r-none ${
                timeRange === "week"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white"
                  : ""
              }`}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Tuần
            </Button>
            <Button
              variant={timeRange === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("month")}
              className={`rounded-none border-l-0 border-r-0 ${
                timeRange === "month"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white"
                  : ""
              }`}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Tháng
            </Button>
            <Button
              variant={timeRange === "quarter" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("quarter")}
              className={`rounded-r-md rounded-l-none ${
                timeRange === "quarter"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white"
                  : ""
              }`}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Quý
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex rounded-md shadow-sm overflow-hidden"
          >
            <Button
              variant={selectedView === "overview" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView("overview")}
              className={`rounded-l-md rounded-r-none ${
                selectedView === "overview"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 border-none text-white"
                  : ""
              }`}
            >
              <BarChart2 className="h-4 w-4 mr-1" />
              Tổng quan
            </Button>
            <Button
              variant={selectedView === "channels" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView("channels")}
              className={`rounded-none border-l-0 border-r-0 ${
                selectedView === "channels"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 border-none text-white"
                  : ""
              }`}
            >
              <Filter className="h-4 w-4 mr-1" />
              Kênh
            </Button>
            <Button
              variant={selectedView === "funnel" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView("funnel")}
              className={`rounded-r-md rounded-l-none ${
                selectedView === "funnel"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 border-none text-white"
                  : ""
              }`}
            >
              <Filter className="h-4 w-4 mr-1" />
              Phễu
            </Button>
          </motion.div>
        </Flex>
      </motion.div>

      <Grid cols={4} gap="md">
        {[
          {
            id: "emails",
            icon: Mail,
            title: "Email đã gửi",
            value: automationMetrics.emailsSent.toLocaleString(),
            trend: automationMetrics.emailOpenRateTrend,
            trendLabel: "so với trước",
            description: "Tổng số email đã gửi trong kỳ",
            bgGradient:
              "from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20",
            iconGradient:
              "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500",
            borderColor: "border-blue-200 dark:border-blue-700/50",
          },
          {
            id: "leads",
            icon: Users,
            title: "Leads được tạo",
            value: automationMetrics.leadGeneration.toLocaleString(),
            trend: automationMetrics.leadGenerationTrend,
            trendLabel: "so với trước",
            description: "Số leads mới được tạo từ chiến dịch",
            bgGradient:
              "from-indigo-50 to-indigo-100/50 dark:from-indigo-900/30 dark:to-indigo-800/20",
            iconGradient:
              "from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500",
            borderColor: "border-indigo-200 dark:border-indigo-700/50",
          },
          {
            id: "conversions",
            icon: DollarSign,
            title: "Conversions",
            value: automationMetrics.conversions.toLocaleString(),
            trend: automationMetrics.conversionsTrend,
            trendLabel: "so với trước",
            description: "Số khách hàng đã hoàn tất giao dịch",
            bgGradient:
              "from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20",
            iconGradient:
              "from-green-500 to-green-600 dark:from-green-400 dark:to-green-500",
            borderColor: "border-green-200 dark:border-green-700/50",
          },
          {
            id: "time",
            icon: Clock,
            title: "Thời gian tiết kiệm",
            value: `${automationMetrics.timeSpent}h`,
            trend: automationMetrics.timeSpentTrend,
            trendLabel: "so với trước",
            description: "Thời gian tiết kiệm nhờ tự động hóa",
            bgGradient:
              "from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-800/20",
            iconGradient:
              "from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500",
            borderColor: "border-amber-200 dark:border-amber-700/50",
          },
        ].map((metric, index) => (
          <GridItem key={metric.id}>
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onMouseEnter={() => setHoveredCard(metric.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`bg-gradient-to-br ${metric.bgGradient} border ${
                  metric.borderColor
                } backdrop-blur-sm shadow-md transition-all duration-300 ${
                  hoveredCard === metric.id ? "shadow-lg" : ""
                } overflow-hidden`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                        {metric.title}
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metric.value}
                      </h3>
                    </div>
                    <div
                      className={`rounded-lg p-2.5 bg-gradient-to-br ${metric.iconGradient} text-white shadow-sm`}
                    >
                      <metric.icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <div
                      className={`flex items-center ${
                        metric.trend > 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      } text-xs font-medium`}
                    >
                      {metric.trend > 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(metric.trend)}% {metric.trendLabel}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {metric.description}
                  </p>

                  {/* Decorative bottom bar that animates on hover */}
                  <div className="mt-3 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        metric.trend > 0
                          ? "bg-green-500 dark:bg-green-400"
                          : "bg-red-500 dark:bg-red-400"
                      } rounded-full`}
                      initial={{ width: "30%" }}
                      animate={{
                        width: hoveredCard === metric.id ? "100%" : "30%",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </GridItem>
        ))}
      </Grid>

      <Grid cols={3} gap="md" className="mt-6">
        <GridItem colSpan={2}>
          <motion.div variants={itemVariants}>
            <Card className="border border-blue-200/50 dark:border-blue-800/30 bg-gradient-to-br from-white/80 to-blue-50/50 dark:from-gray-800/80 dark:to-blue-900/20 backdrop-blur-sm shadow-md overflow-hidden">
              <CardHeader className="border-b border-blue-100 dark:border-blue-800/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span>Hiệu suất theo thời gian</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span className="text-xs">Refresh</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="h-72 relative">
                  {/* Add subtle gradient background to chart area */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg -z-0"></div>

                  {selectedView === "overview" && (
                    <div className="relative z-10">
                      <LineChart
                        data={overviewData}
                        lines={[
                          {
                            dataKey: "leads",
                            name: "Số Leads",
                            color: "#3b82f6",
                          },
                          {
                            dataKey: "conversions",
                            name: "Conversions",
                            color: "#10b981",
                          },
                        ]}
                        xAxisKey="month"
                      />
                    </div>
                  )}
                  {selectedView === "channels" && (
                    <div className="relative z-10">
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
                    </div>
                  )}
                  {selectedView === "funnel" && (
                    <div className="relative z-10">
                      <BarChart
                        data={conversionData}
                        bars={[
                          {
                            dataKey: "value",
                            name: "Khách hàng",
                            color: "#6366f1",
                          },
                        ]}
                        xAxisKey="stage"
                      />
                    </div>
                  )}
                </div>

                {/* Quick status indicators below chart */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full text-xs">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-blue-700 dark:text-blue-300">
                      Leads: +12% MoM
                    </span>
                  </div>
                  <div className="flex items-center px-3 py-1.5 bg-green-50 dark:bg-green-900/30 rounded-full text-xs">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-700 dark:text-green-300">
                      Conversions: +8.7% MoM
                    </span>
                  </div>
                  <div className="flex items-center px-3 py-1.5 bg-amber-50 dark:bg-amber-900/30 rounded-full text-xs">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-amber-700 dark:text-amber-300">
                      Campaign Volume: +15%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </GridItem>

        <GridItem>
          <motion.div variants={itemVariants}>
            <Card className="h-full border border-indigo-200/50 dark:border-indigo-800/30 bg-gradient-to-br from-white/80 to-indigo-50/50 dark:from-gray-800/80 dark:to-indigo-900/20 backdrop-blur-sm shadow-md overflow-hidden">
              <CardHeader className="border-b border-indigo-100 dark:border-indigo-800/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4">
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <span>Phân bổ theo kênh</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="h-64 relative">
                  {/* Add subtle gradient background to chart area */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-lg -z-0"></div>

                  <div className="relative z-10">
                    <PieChart
                      data={channelData}
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-3">
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
          </motion.div>
        </GridItem>
      </Grid>

      <Grid cols={2} gap="md" className="mt-6">
        <GridItem>
          <motion.div variants={itemVariants}>
            <FeatureCard
              icon={Filter}
              title="Automation Workflows"
              description={
                <div className="mt-4 space-y-3">
                  <WorkflowItemEnhanced
                    name="Welcome Series"
                    status="active"
                    stats={{ sent: 328, opened: 245, clicked: 188 }}
                  />
                  <WorkflowItemEnhanced
                    name="Abandoned Cart"
                    status="active"
                    stats={{ sent: 156, opened: 98, clicked: 73 }}
                  />
                  <WorkflowItemEnhanced
                    name="Re-engagement"
                    status="paused"
                    stats={{ sent: 215, opened: 112, clicked: 65 }}
                  />
                  <WorkflowItemEnhanced
                    name="Post-Purchase"
                    status="active"
                    stats={{ sent: 187, opened: 145, clicked: 104 }}
                  />
                </div>
              }
              variant="default"
              iconPosition="top"
              className="border border-blue-200/50 dark:border-blue-800/30 bg-gradient-to-br from-white/80 to-blue-50/50 dark:from-gray-800/80 dark:to-blue-900/20 backdrop-blur-sm shadow-md"
            />
          </motion.div>
        </GridItem>

        <GridItem>
          <motion.div variants={itemVariants}>
            <FeatureCard
              icon={BarChart2}
              title="Campaign Performance"
              description={
                <div className="mt-4 space-y-3">
                  <CampaignItemEnhanced
                    name="Summer Sale"
                    performance={85}
                    status="completed"
                  />
                  <CampaignItemEnhanced
                    name="New Product Launch"
                    performance={68}
                    status="active"
                  />
                  <CampaignItemEnhanced
                    name="Customer Feedback"
                    performance={42}
                    status="active"
                  />
                  <CampaignItemEnhanced
                    name="Loyalty Program"
                    performance={91}
                    status="active"
                  />
                </div>
              }
              variant="default"
              iconPosition="top"
              className="border border-indigo-200/50 dark:border-indigo-800/30 bg-gradient-to-br from-white/80 to-indigo-50/50 dark:from-gray-800/80 dark:to-indigo-900/20 backdrop-blur-sm shadow-md"
            />
          </motion.div>
        </GridItem>
      </Grid>
    </motion.div>
  );
};

// Helper components with enhanced styling
const WorkflowItemEnhanced = ({ name, status, stats }) => {
  return (
    <motion.div
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      className="flex items-center justify-between p-3.5 border border-blue-100 dark:border-blue-800/50 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:shadow transition-all"
    >
      <div>
        <div className="flex items-center">
          <div className="mr-3">
            <Zap className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
              {name}
              <span
                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                {status === "active" ? "Active" : "Paused"}
              </span>
            </h4>
            <div className="flex space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>{stats.sent} sent</span>
              <span>{stats.opened} opened</span>
              <span>{stats.clicked} clicked</span>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
      >
        Edit
      </Button>
    </motion.div>
  );
};

const CampaignItemEnhanced = ({ name, performance, status }) => {
  return (
    <motion.div
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      className="p-3.5 border border-indigo-100 dark:border-indigo-800/50 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:shadow transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            <Bell className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          </div>
          <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
        </div>
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
      <div className="mt-3">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="text-gray-600 dark:text-gray-400">Performance</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {performance}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full ${
              performance >= 80
                ? "bg-gradient-to-r from-green-500 to-green-400"
                : performance >= 50
                ? "bg-gradient-to-r from-blue-500 to-blue-400"
                : "bg-gradient-to-r from-yellow-500 to-yellow-400"
            }`}
            style={{
              width: `${performance}%`,
              transition: "width 1s ease-in-out",
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default AutomationDashboard;
