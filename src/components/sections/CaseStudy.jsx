import React, { forwardRef, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Container, Grid, GridItem, Flex } from "../layout/container";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LineChart } from "../charts/chart-components";
import { ChartWrapper } from "../charts/chart-wrapper";
import { amwayRevenueData } from "../../data/siteData";
import {
  TrendingDown,
  TrendingUp,
  AlertCircle,
  BarChart2,
  ArrowDownRight,
  PieChart,
  DollarSign,
  Calendar,
} from "lucide-react";

const CaseStudy = forwardRef(({ isVisible }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [activeTab, setActiveTab] = useState("revenue");
  const sectionRef = useRef(null);

  // Throttled mouse position handler for 3D effects
  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Only update mousePosition if the change is significant (reducing jitter)
      const diffX = Math.abs(mousePosition.x - x);
      const diffY = Math.abs(mousePosition.y - y);
      if (diffX > 0.01 || diffY > 0.01) {
        setMousePosition({ x, y });
      }
    }
  };

  return (
    <Section
      id="casestudy"
      ref={(node) => {
        ref.current = node;
        sectionRef.current = node;
      }}
      variant="default"
      isVisible={isVisible}
      container
      className="relative overflow-hidden py-20"
      onMouseMove={handleMouseMove}
    >
      {/* Simplified static backgrounds */}
      <SimpleBackgroundElements />

      <div className="relative z-10">
        <SectionHeader>
          <div className="inline-block mb-3">
            <div className="flex items-center space-x-2 mb-2 bg-orange-100/80 backdrop-blur-sm dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-4 py-1 rounded-full text-sm font-medium border border-orange-200/50 dark:border-orange-800/50">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span>Case Analysis</span>
            </div>
          </div>
          <SectionSubtitle>Case Study</SectionSubtitle>
          <SectionTitle className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
            Amway: Thách thức trong kỷ nguyên số
          </SectionTitle>
          <SectionDescription>
            Phân tích tình hình doanh thu và những thách thức của Amway - một
            biểu tượng trong ngành MLM
          </SectionDescription>
        </SectionHeader>

        <div className="mb-12">
          <motion.div
            whileHover={{
              scale: 1.02,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
              },
            }}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateY(${
                (mousePosition.x - 0.5) * 3
              }deg) rotateX(${(mousePosition.y - 0.5) * -3}deg)`,
              transition: "transform 0.3s ease",
            }}
            className="w-full"
          >
            <Card
              variant="filled"
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100/50 dark:border-blue-800/30 shadow-xl overflow-hidden"
            >
              <Grid cols={2} gap="lg">
                <GridItem>
                  <CardContent className="p-8 relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-400/10 to-purple-500/10 rounded-full blur-lg"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-6">
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                          {activeTab === "revenue"
                            ? "Doanh thu Amway (2019-2023)"
                            : "Phân tích xu hướng Amway"}
                        </CardTitle>

                        <div className="flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                          <button
                            onClick={() => setActiveTab("revenue")}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                              activeTab === "revenue"
                                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/30"
                            }`}
                          >
                            Doanh thu
                          </button>
                          <button
                            onClick={() => setActiveTab("trends")}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                              activeTab === "trends"
                                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/30"
                            }`}
                          >
                            Xu hướng
                          </button>
                        </div>
                      </div>

                      <div className="h-64 relative">
                        {/* Chart glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-lg"></div>
                        <div className="relative z-10">
                          {activeTab === "revenue" ? (
                            <LineChart
                              data={amwayRevenueData}
                              lines={[
                                {
                                  dataKey: "revenue",
                                  name: "Doanh thu (tỷ USD)",
                                  color: "#4f46e5",
                                },
                              ]}
                              xAxisKey="year"
                              yAxisDomain={[7.5, 8.5]}
                            />
                          ) : (
                            <LineChart
                              data={amwayRevenueData.map((item) => ({
                                ...item,
                                trend: (item.revenue - 7.8) * 10,
                              }))}
                              lines={[
                                {
                                  dataKey: "revenue",
                                  name: "Doanh thu (tỷ USD)",
                                  color: "#4f46e5",
                                },
                                {
                                  dataKey: "trend",
                                  name: "Chỉ số xu hướng",
                                  color: "#ef4444",
                                  strokeDasharray: "5 5",
                                },
                              ]}
                              xAxisKey="year"
                              yAxisDomain={[7.5, 8.5]}
                            />
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <Card className="border border-blue-100 dark:border-blue-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <Flex className="items-center space-x-3">
                              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <AlertCircle className="h-5 w-5" />
                              </div>
                              <p className="text-gray-700 dark:text-gray-300">
                                Doanh thu toàn cầu của Amway năm 2023 đạt khoảng
                                7,7 tỷ USD, giảm 5% so với năm 2022. Thông tin
                                này cho thấy một dấu hiệu cảnh báo rằng mô hình
                                kinh doanh truyền thống đang gặp khó khăn.
                              </p>
                            </Flex>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </GridItem>

                <GridItem className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-800 dark:to-indigo-800"></div>
                  <div className="absolute inset-0 bg-blue-700 dark:bg-blue-800 mix-blend-overlay opacity-20"></div>

                  {/* Decorative grid pattern */}
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 opacity-10"
                  >
                    <defs>
                      <pattern
                        id="smallGrid"
                        width="8"
                        height="8"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 8 0 L 0 0 0 8"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </pattern>
                      <pattern
                        id="grid"
                        width="80"
                        height="80"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect width="80" height="80" fill="url(#smallGrid)" />
                        <path
                          d="M 80 0 L 0 0 0 80"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  <CardContent className="p-8 text-white relative z-10">
                    <CardTitle className="text-2xl font-bold mb-6 text-white">
                      Nguyên nhân sụt giảm
                    </CardTitle>
                    <div className="space-y-6">
                      {[
                        {
                          number: 1,
                          title: "Thay đổi hành vi người tiêu dùng",
                          description:
                            "Người tiêu dùng ngày nay ưa chuộng sự tiện lợi và cá nhân hoá trong trải nghiệm mua sắm.",
                          icon: Users,
                        },
                        {
                          number: 2,
                          title: "Áp lực cạnh tranh từ TMĐT",
                          description:
                            "Sự ra đời của các nền tảng bán hàng trực tuyến đã làm tăng tính cạnh tranh, khiến các công ty MLM không thể dựa vào mối quan hệ cá nhân truyền thống.",
                          icon: ShoppingCart,
                        },
                        {
                          number: 3,
                          title: "Thiếu sự đổi mới công nghệ",
                          description:
                            "Các công ty MLM chưa tích hợp đầy đủ các giải pháp Marketing Automation và các công cụ số hoá khác, dẫn đến quản lý mạng lưới phân phối trở nên lỗi thời.",
                          icon: Settings,
                        },
                      ].map((reason, index) => (
                        <DeclineReasonEnhanced
                          key={index}
                          reason={reason}
                          index={index}
                        />
                      ))}
                    </div>

                    <div className="mt-8">
                      <Button
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-transform duration-200 hover:scale-105"
                      >
                        Xem đầy đủ báo cáo
                        <ArrowDownRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </GridItem>
              </Grid>
            </Card>
          </motion.div>
        </div>

        <div className="mt-12">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 relative inline-block">
              Biến động doanh thu Amway (2019-2023)
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 w-full" />
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Dựa trên dữ liệu từ các báo cáo kinh doanh
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200/70 dark:border-gray-800/70 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Năm
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Doanh thu (tỷ USD)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Tỷ lệ tăng trưởng (%)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    {
                      year: "2019",
                      revenue: "8,2",
                      growth: "-",
                      isNegative: false,
                      isPositive: false,
                    },
                    {
                      year: "2020",
                      revenue: "8,0",
                      growth: "-2,44%",
                      isNegative: true,
                      isPositive: false,
                    },
                    {
                      year: "2021",
                      revenue: "7,9",
                      growth: "-1,25%",
                      isNegative: true,
                      isPositive: false,
                    },
                    {
                      year: "2022",
                      revenue: "8,1",
                      growth: "+2,53%",
                      isNegative: false,
                      isPositive: true,
                    },
                    {
                      year: "2023",
                      revenue: "7,7",
                      growth: "-4,94%",
                      isNegative: true,
                      isPositive: false,
                    },
                  ].map((row, index) => (
                    <TableRowEnhanced key={index} row={row} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: DollarSign,
              title: "Doanh thu hiện tại",
              value: "$7.7B",
              change: "-4.94%",
              description: "Doanh thu năm 2023",
              color: "blue",
            },
            {
              icon: BarChart2,
              title: "Thị phần",
              value: "14.2%",
              change: "-2.1%",
              description: "Trong thị trường MLM toàn cầu",
              color: "indigo",
            },
            {
              icon: PieChart,
              title: "So với thương mại điện tử",
              value: "0.12%",
              change: "-0.03%",
              description: "Tỷ lệ so với TMĐT toàn cầu",
              color: "purple",
            },
            {
              icon: Calendar,
              title: "Dự báo phục hồi",
              value: "2026+",
              description: "Thời gian cần để quay lại đỉnh",
              color: "orange",
            },
          ].map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
});

// Enhanced Components
const ShoppingCart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const Settings = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Users = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Enhanced Decline Reason component with hover animation preserved
const DeclineReasonEnhanced = ({ reason, index }) => {
  const { number, title, description, icon: Icon } = reason;

  return (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
      className="flex items-start relative"
    >
      <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-white text-blue-700 mt-1 mr-3 shadow-glow-blue z-10">
        <span className="font-bold">{number}</span>
      </div>

      {/* Connect line to next item - static */}
      {index < 2 && (
        <div className="absolute left-4 top-8 w-0.5 bg-white/30 -z-10 h-[55px]" />
      )}

      <div className="ml-3">
        <div className="flex items-center">
          <Icon className="h-5 w-5 text-blue-300 mr-2" />
          <h4 className="text-lg font-medium">{title}</h4>
        </div>
        <p className="mt-1 text-blue-100">{description}</p>
      </div>
    </motion.div>
  );
};

// Enhanced Table Row component - hover effect preserved
const TableRowEnhanced = ({ row, index }) => {
  const { year, revenue, growth, isNegative, isPositive } = row;

  return (
    <motion.tr
      whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
      className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        {year}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
        ${revenue}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm ${
          isPositive
            ? "text-green-500 dark:text-green-400"
            : isNegative
            ? "text-red-500 dark:text-red-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {growth}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isPositive ? (
          <div className="flex items-center text-green-500 dark:text-green-400">
            <TrendingUp className="h-5 w-5 mr-1" />
            <span className="text-xs">Growth</span>
          </div>
        ) : isNegative ? (
          <div className="flex items-center text-red-500 dark:text-red-400">
            <TrendingDown className="h-5 w-5 mr-1" />
            <span className="text-xs">Decline</span>
          </div>
        ) : (
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span className="text-xs">Baseline</span>
          </div>
        )}
      </td>
    </motion.tr>
  );
};

// Stat Card Component with hover effect preserved
const StatCard = ({ stat, index }) => {
  const { icon: Icon, title, value, change, description, color } = stat;

  const colorVariants = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800/50",
      iconBg: "bg-blue-100 dark:bg-blue-900/50",
      iconColor: "text-blue-500 dark:text-blue-400",
    },
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      border: "border-indigo-200 dark:border-indigo-800/50",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
      iconColor: "text-indigo-500 dark:text-indigo-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800/50",
      iconBg: "bg-purple-100 dark:bg-purple-900/50",
      iconColor: "text-purple-500 dark:text-purple-400",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800/50",
      iconBg: "bg-orange-100 dark:bg-orange-900/50",
      iconColor: "text-orange-500 dark:text-orange-400",
    },
  };

  const colors = colorVariants[color];

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`rounded-xl p-5 ${colors.bg} border ${colors.border} backdrop-blur-sm shadow-md`}
    >
      <div className="flex items-center mb-3">
        <div
          className={`p-2 rounded-lg ${colors.iconBg} ${colors.iconColor} mr-3`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
      </div>

      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </span>
        {change && (
          <span className="ml-2 text-sm text-red-500 dark:text-red-400 flex items-center">
            <TrendingDown className="h-3 w-3 mr-0.5" />
            {change}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </motion.div>
  );
};

// Simplified static background
const SimpleBackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static gradient circles with minimal opacity */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-orange-400/10 to-red-500/10 dark:from-orange-500/5 dark:to-red-600/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-blue-400/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-600/5 blur-3xl -z-10"></div>

      {/* A few static particles for minimal decoration */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-orange-500/5 dark:bg-orange-400/5 rounded-full -z-20"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

CaseStudy.displayName = "CaseStudy";

export default CaseStudy;
