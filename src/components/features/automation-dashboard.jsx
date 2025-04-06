import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  EnhancedLineChart,
  EnhancedBarChart,
  EnhancedPieChart,
  KpiCard,
  DashboardGrid,
  DashboardGridItem,
  SparklineCard,
} from "../charts/chart-components";
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

  // Data for sparkline charts
  const emailTrendData = [
    { month: "Jan", value: 2845 },
    { month: "Feb", value: 2965 },
    { month: "Mar", value: 3142 },
    { month: "Apr", value: 3245 },
  ];

  const leadTrendData = [
    { month: "Jan", value: 185 },
    { month: "Feb", value: 205 },
    { month: "Mar", value: 220 },
    { month: "Apr", value: 245 },
  ];

  const conversionTrendData = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 72 },
    { month: "Mar", value: 78 },
    { month: "Apr", value: 86 },
  ];

  const timeSavedTrendData = [
    { month: "Jan", value: 82 },
    { month: "Feb", value: 95 },
    { month: "Mar", value: 104 },
    { month: "Apr", value: 112 },
  ];

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

        <div className="flex gap-2">
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
        </div>
      </motion.div>

      {/* KPI Cards with Sparklines */}
      <DashboardGrid columns={4} gap="md" className="mb-6">
        <DashboardGridItem>
          <motion.div variants={itemVariants}>
            <SparklineCard
              title="Email đã gửi"
              value={automationMetrics.emailsSent.toLocaleString()}
              change={automationMetrics.emailOpenRateTrend}
              sparklineData={emailTrendData}
              sparklineKey="value"
              sparklineType="area"
              color="blue"
              icon={<Mail className="h-5 w-5" />}
            />
          </motion.div>
        </DashboardGridItem>

        <DashboardGridItem>
          <motion.div variants={itemVariants}>
            <SparklineCard
              title="Leads được tạo"
              value={automationMetrics.leadGeneration.toLocaleString()}
              change={automationMetrics.leadGenerationTrend}
              sparklineData={leadTrendData}
              sparklineKey="value"
              sparklineType="area"
              color="purple"
              icon={<Users className="h-5 w-5" />}
            />
          </motion.div>
        </DashboardGridItem>

        <DashboardGridItem>
          <motion.div variants={itemVariants}>
            <SparklineCard
              title="Conversions"
              value={automationMetrics.conversions.toLocaleString()}
              change={automationMetrics.conversionsTrend}
              sparklineData={conversionTrendData}
              sparklineKey="value"
              sparklineType="area"
              color="green"
              icon={<DollarSign className="h-5 w-5" />}
            />
          </motion.div>
        </DashboardGridItem>

        <DashboardGridItem>
          <motion.div variants={itemVariants}>
            <SparklineCard
              title="Thời gian tiết kiệm"
              value={`${automationMetrics.timeSpent}h`}
              change={Math.abs(automationMetrics.timeSpentTrend)}
              sparklineData={timeSavedTrendData}
              sparklineKey="value"
              sparklineType="area"
              color="yellow"
              icon={<Clock className="h-5 w-5" />}
            />
          </motion.div>
        </DashboardGridItem>
      </DashboardGrid>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="col-span-2">
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
                      <EnhancedLineChart
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
                        animate={true}
                        grid={true}
                        height={280}
                        formatters={{
                          valueFormatter: (value) => `${value}`,
                        }}
                        unit=""
                      />
                    </div>
                  )}
                  {selectedView === "channels" && (
                    <div className="relative z-10">
                      <EnhancedBarChart
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
                        animate={true}
                        grid={true}
                        height={280}
                        formatters={{
                          valueFormatter: (value) => `${value}`,
                        }}
                      />
                    </div>
                  )}
                  {selectedView === "funnel" && (
                    <div className="relative z-10">
                      <EnhancedBarChart
                        data={conversionData}
                        bars={[
                          {
                            dataKey: "value",
                            name: "Khách hàng",
                            color: "#6366f1",
                          },
                        ]}
                        xAxisKey="stage"
                        animate={true}
                        grid={true}
                        height={280}
                        layout="vertical"
                        formatters={{
                          valueFormatter: (value) => `${value}`,
                        }}
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
        </div>

        <div>
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
                    <EnhancedPieChart
                      data={channelData}
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      animate={true}
                      showLabel={false}
                      colors={["#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"]}
                      formatters={{
                        valueFormatter: (value) => `${value}%`,
                      }}
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
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <motion.div variants={itemVariants}>
            <Card className="border border-blue-200/50 dark:border-blue-800/30 bg-gradient-to-br from-white/80 to-blue-50/50 dark:from-gray-800/80 dark:to-blue-900/20 backdrop-blur-sm shadow-md h-full">
              <CardHeader className="border-b border-blue-100 dark:border-blue-800/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4">
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                  <span>Automation Workflows</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-blue-100 dark:border-blue-800/50 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:shadow transition-all">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Zap className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                          Welcome Series
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Active
                          </span>
                        </h4>
                        <div className="flex space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>328 sent</span>
                          <span>245 opened</span>
                          <span>188 clicked</span>
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
                  </div>

                  <div className="flex items-center justify-between p-3 border border-blue-100 dark:border-blue-800/50 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:shadow transition-all">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Zap className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                          Abandoned Cart
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Active
                          </span>
                        </h4>
                        <div className="flex space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>156 sent</span>
                          <span>98 opened</span>
                          <span>73 clicked</span>
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
                  </div>

                  <div className="flex items-center justify-between p-3 border border-blue-100 dark:border-blue-800/50 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:shadow transition-all">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Zap className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                          Re-engagement
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                            Paused
                          </span>
                        </h4>
                        <div className="flex space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>215 sent</span>
                          <span>112 opened</span>
                          <span>65 clicked</span>
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
                  </div>

                  <div className="flex items-center justify-between p-3 border border-blue-100 dark:border-blue-800/50 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:shadow transition-all">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Zap className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                          Post-Purchase
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Active
                          </span>
                        </h4>
                        <div className="flex space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>187 sent</span>
                          <span>145 opened</span>
                          <span>104 clicked</span>
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div>
          <motion.div variants={itemVariants}>
            <Card className="border border-indigo-200/50 dark:border-indigo-800/30 bg-gradient-to-br from-white/80 to-indigo-50/50 dark:from-gray-800/80 dark:to-indigo-900/20 backdrop-blur-sm shadow-md h-full">
              <CardHeader className="border-b border-indigo-100 dark:border-indigo-800/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4">
                <CardTitle className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
                  <span>Campaign Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="p-3 border border-indigo-100 dark:border-indigo-800/50 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:shadow transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Bell className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Summer Sale
                        </h4>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        completed
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-gray-600 dark:text-gray-400">
                          Performance
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          85%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-400"
                          style={{
                            width: "85%",
                            transition: "width 1s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-indigo-100 dark:border-indigo-800/50 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:shadow transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Bell className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          New Product Launch
                        </h4>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        active
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-gray-600 dark:text-gray-400">
                          Performance
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          68%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                          style={{
                            width: "68%",
                            transition: "width 1s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-indigo-100 dark:border-indigo-800/50 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:shadow transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Bell className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Customer Feedback
                        </h4>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        active
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-gray-600 dark:text-gray-400">
                          Performance
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          42%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                          style={{
                            width: "42%",
                            transition: "width 1s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-indigo-100 dark:border-indigo-800/50 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:shadow transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Bell className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Loyalty Program
                        </h4>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        active
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-gray-600 dark:text-gray-400">
                          Performance
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          91%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-400"
                          style={{
                            width: "91%",
                            transition: "width 1s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AutomationDashboard;
