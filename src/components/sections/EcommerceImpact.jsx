import React, { forwardRef, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import {
  EnhancedLineChart,
  EnhancedAreaChart,
  KpiCard,
  DashboardGrid,
  DashboardGridItem,
} from "../charts/chart-components";
import { Button } from "../ui/button";
import { marketGrowthData } from "../../data/siteData";
import {
  Zap,
  DollarSign,
  Settings,
  ArrowRight,
  TrendingUp,
  ShoppingCart,
  Users,
  BarChart2,
} from "lucide-react";

const EcommerceImpact = forwardRef(({ isVisible }, ref) => {
  const [highlightedFeature, setHighlightedFeature] = useState(null);
  const [chartView, setChartView] = useState("line");
  const sectionRef = useRef(null);

  // Chart data for both line and area
  const chartData = marketGrowthData.map((item) => ({
    ...item,
    ecommerce_growth: (item.ecommerce / 1000).toFixed(1), // Scale for better visualization
    mlm_relative: ((item.mlm / item.ecommerce) * 100).toFixed(1), // Calculate relative percentage
  }));

  // Filter options cho chart
  const filterOptions = [
    { label: "MLM", value: "mlm" },
    { label: "TMĐT", value: "ecommerce_growth" },
  ];

  // Format số liệu hiển thị
  const valueFormatter = useCallback((value) => {
    return typeof value === "number" ? value.toFixed(1) : value;
  }, []);

  // Format label cho trục x
  const labelFormatter = useCallback((label) => {
    return `Năm ${label}`;
  }, []);

  // Annotations cho chart
  const chartAnnotations = [
    {
      type: "line",
      y: 5.0,
      stroke: "#ef4444",
      label: { value: "Điểm tới hạn", position: "insideBottomRight" },
    },
  ];

  return (
    <Section
      id="ecommerce"
      ref={(node) => {
        ref.current = node;
        sectionRef.current = node;
      }}
      variant="gradient"
      isVisible={isVisible}
      container
      className="relative overflow-hidden"
    >
      {/* Simplified static background elements */}
      <SimpleBackgroundElements />

      <div className="relative z-10">
        <SectionHeader>
          <div className="inline-block mb-3">
            <div className="flex items-center space-x-2 mb-2 bg-indigo-100/80 backdrop-blur-sm dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-1 rounded-full text-sm font-medium border border-indigo-200/50 dark:border-indigo-800/50">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>Phân tích tác động</span>
            </div>
          </div>
          <SectionSubtitle>Tác động TMĐT</SectionSubtitle>
          <SectionTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Thương mại điện tử thay đổi MLM
          </SectionTitle>
          <SectionDescription>
            Tác động của thương mại điện tử đến mô hình kinh doanh đa cấp truyền
            thống và cách thức chuyển đổi để thích ứng
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 items-start">
          <div>
            {/* Dashboard KPI cards */}
            <DashboardGrid columns={2} gap="sm" className="mb-6">
              <DashboardGridItem>
                <KpiCard
                  title="TMĐT Tăng trưởng hàng năm"
                  value={15.7}
                  previousValue={13.2}
                  color="blue"
                  suffix="%"
                  icon={<TrendingUp className="h-5 w-5" />}
                />
              </DashboardGridItem>
              <DashboardGridItem>
                <KpiCard
                  title="MLM Biến động hàng năm"
                  value={-3.2}
                  previousValue={-1.5}
                  color="purple"
                  suffix="%"
                  trendDirection="down"
                  icon={<BarChart2 className="h-5 w-5" />}
                />
              </DashboardGridItem>
            </DashboardGrid>

            {/* Enhanced Chart */}
            <div>
              {chartView === "line" ? (
                <EnhancedLineChart
                  title="TMĐT vs MLM: Tăng trưởng so sánh"
                  subtitle="So sánh tốc độ tăng trưởng của thị trường TMĐT và MLM toàn cầu"
                  data={chartData}
                  lines={[
                    {
                      dataKey: "mlm",
                      name: "MLM (tỷ USD)",
                      color: "#8b5cf6",
                      filterValue: "mlm",
                    },
                    {
                      dataKey: "ecommerce_growth",
                      name: "TMĐT (nghìn tỷ USD)",
                      color: "#ef4444",
                      filterValue: "ecommerce_growth",
                    },
                  ]}
                  xAxisKey="year"
                  height={280}
                  animate={true}
                  grid={true}
                  filterOptions={filterOptions}
                  formatters={{
                    valueFormatter: valueFormatter,
                    labelFormatter: labelFormatter,
                  }}
                  timeRange={false}
                  annotations={chartAnnotations}
                  variant="glass"
                  shadow="lg"
                  hover="scale"
                  animation="fadeIn"
                  info="Biểu đồ so sánh tốc độ tăng trưởng của thị trường TMĐT và MLM trong 5 năm gần đây. Số liệu MLM theo tỷ USD, trong khi số liệu TMĐT theo nghìn tỷ USD (đã chia tỷ lệ để so sánh)."
                  actions={
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setChartView("area")}
                      className="text-xs"
                    >
                      Xem dạng Area
                    </Button>
                  }
                />
              ) : (
                <EnhancedAreaChart
                  title="TMĐT vs MLM: Tăng trưởng so sánh"
                  subtitle="So sánh tốc độ tăng trưởng của thị trường TMĐT và MLM toàn cầu"
                  data={chartData}
                  areas={[
                    {
                      dataKey: "mlm",
                      name: "MLM (tỷ USD)",
                      color: "#8b5cf6",
                      fillOpacity: 0.6,
                      filterValue: "mlm",
                    },
                    {
                      dataKey: "ecommerce_growth",
                      name: "TMĐT (nghìn tỷ USD)",
                      color: "#ef4444",
                      fillOpacity: 0.6,
                      filterValue: "ecommerce_growth",
                    },
                  ]}
                  xAxisKey="year"
                  height={280}
                  animate={true}
                  grid={true}
                  filterOptions={filterOptions}
                  formatters={{
                    valueFormatter: valueFormatter,
                    labelFormatter: labelFormatter,
                  }}
                  timeRange={false}
                  annotations={chartAnnotations}
                  variant="glass"
                  shadow="lg"
                  hover="scale"
                  animation="fadeIn"
                  info="Biểu đồ so sánh tốc độ tăng trưởng của thị trường TMĐT và MLM trong 5 năm gần đây. Số liệu MLM theo tỷ USD, trong khi số liệu TMĐT theo nghìn tỷ USD (đã chia tỷ lệ để so sánh)."
                  actions={
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setChartView("line")}
                      className="text-xs"
                    >
                      Xem dạng Line
                    </Button>
                  }
                />
              )}
            </div>
          </div>

          <div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 relative inline-block">
                Những thách thức mới
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 w-full"></div>
              </h3>

              {[
                {
                  id: "interaction",
                  icon: Users,
                  title: "Mất đi yếu tố tương tác trực tiếp",
                  description:
                    "Mô hình MLM vốn dựa vào sự tương tác trực tiếp giữa người bán hàng và khách hàng, điều này có thể bị suy yếu khi dịch chuyển sang nền tảng trực tuyến.",
                  color: "indigo",
                },
                {
                  id: "competition",
                  icon: DollarSign,
                  title: "Sự cạnh tranh tăng cao",
                  description:
                    "Khi thị trường chuyển sang hình thức bán hàng trực tuyến, số lượng các đối thủ cạnh tranh tăng lên rõ rệt, đặc biệt là từ các doanh nghiệp chuyên nghiệp.",
                  color: "purple",
                },
                {
                  id: "behavior",
                  icon: ShoppingCart,
                  title: "Thay đổi hành vi người tiêu dùng",
                  description:
                    "Người tiêu dùng ngày nay ưa chuộng sự tiện lợi và cá nhân hoá trong trải nghiệm mua sắm, đòi hỏi các mô hình MLM phải thích nghi.",
                  color: "pink",
                },
              ].map((feature, index) => (
                <EnhancedFeatureCard
                  key={feature.id}
                  feature={feature}
                  index={index}
                  isHighlighted={highlightedFeature === feature.id}
                  onHover={() => setHighlightedFeature(feature.id)}
                  onLeave={() => setHighlightedFeature(null)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute inset-0 bg-black opacity-5"></div>

          <div className="relative z-10 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="text-2xl font-bold mb-3">
                  Chiến lược chuyển đổi cho MLM
                </h3>
                <p className="text-white/80 max-w-lg">
                  Các công ty MLM cần thích nghi với thời đại số hóa bằng cách
                  tích hợp công nghệ Marketing Automation, CRM và các giải pháp
                  tự động hóa tiếp thị.
                </p>
              </div>
              <Button
                variant="default"
                size="lg"
                className="px-8 py-3 bg-white text-indigo-700 hover:bg-gray-100 hover:text-indigo-800 shadow-md transform transition-transform duration-200 hover:scale-105"
              >
                Khám phá giải pháp
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  number: "01",
                  text: "Tích hợp CRM và quản lý dữ liệu khách hàng",
                },
                {
                  number: "02",
                  text: "Xây dựng hệ thống tự động hóa tiếp thị đa kênh",
                },
                {
                  number: "03",
                  text: "Áp dụng phân tích dữ liệu để dự báo xu hướng",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 transform transition-transform duration-200 hover:translate-y-[-5px]"
                >
                  <span className="text-3xl font-bold opacity-50">
                    {step.number}
                  </span>
                  <p className="mt-2 font-medium">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

// Enhanced Feature Card component with hover effect preserved
const EnhancedFeatureCard = ({
  feature,
  index,
  isHighlighted,
  onHover,
  onLeave,
}) => {
  const { id, icon: Icon, title, description, color } = feature;

  // Colors mapping for different feature types
  const colorVariants = {
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      border: "border-indigo-200 dark:border-indigo-800/50",
      shadow: "shadow-indigo-500/10",
      text: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-500",
      hoverBg: "hover:bg-indigo-100 dark:hover:bg-indigo-800/30",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800/50",
      shadow: "shadow-purple-500/10",
      text: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-500",
      hoverBg: "hover:bg-purple-100 dark:hover:bg-purple-800/30",
    },
    pink: {
      bg: "bg-pink-50 dark:bg-pink-900/20",
      border: "border-pink-200 dark:border-pink-800/50",
      shadow: "shadow-pink-500/10",
      text: "text-pink-600 dark:text-pink-400",
      iconBg: "bg-pink-500",
      hoverBg: "hover:bg-pink-100 dark:hover:bg-pink-800/30",
    },
  };

  const colors = colorVariants[color];

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`
        relative rounded-xl p-1 overflow-hidden transition-all
        ${colors.shadow} ${
        isHighlighted ? "shadow-lg scale-[1.03]" : "shadow-md"
      }
      `}
    >
      {/* Gradient border effect */}
      <div
        className={`absolute inset-0 ${colors.bg} rounded-xl ${colors.border} border`}
      ></div>

      {/* Content area */}
      <div
        className={`
        relative z-10 p-5 rounded-lg backdrop-blur-sm
        ${colors.bg} ${colors.hoverBg} transition-colors
      `}
      >
        <div className="flex items-start">
          <div
            className={`
            h-10 w-10 rounded-full ${colors.text} ${colors.iconBg} 
            flex items-center justify-center text-white mr-4 flex-shrink-0
          `}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          </div>
        </div>

        {/* Bottom decorative line with hover animation */}
        <motion.div
          className={`h-0.5 w-full mt-4 ${colors.iconBg} rounded-full opacity-30`}
          initial={{ width: "30%" }}
          animate={{ width: isHighlighted ? "100%" : "30%" }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

// Simplified static background - single component with minimal elements
const SimpleBackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static gradient elements with reduced opacity */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-600/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-600/5 blur-3xl -z-10"></div>

      {/* A few static particles for minimal decoration */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full -z-20"
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

EcommerceImpact.displayName = "EcommerceImpact";

export default EcommerceImpact;
