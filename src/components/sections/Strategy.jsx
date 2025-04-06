import React, { forwardRef, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FeatureCard, CalloutCard } from "../features/feature-card";
import { Button } from "../ui/button";
import {
  Check,
  ChevronRight,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Target,
  TrendingUp,
  Zap,
  BarChart,
  Share2,
  Users,
  Download,
  ExternalLink,
  Clock,
  AlertCircle,
  Shield,
} from "lucide-react";
import {
  implementationPhases,
  benefitsPieChartData,
  CHART_COLORS,
} from "../../data/siteData";

// Import Enhanced Chart components
import {
  EnhancedPieChart,
  EnhancedBarChart,
  KpiCard,
  SparklineCard,
  DashboardGrid,
  DashboardGridItem,
  ENHANCED_COLORS,
} from "../charts/chart-components";
import { ChartWrapper } from "../charts/chart-wrapper";

/**
 * Enhanced Strategy Section with modern UI/UX
 */
const Strategy = forwardRef(({ isVisible }, ref) => {
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);

  // Prepare data for implementation phase progress chart
  const phaseProgressData = implementationPhases.map((phase, idx) => ({
    name: phase.name,
    progress: idx <= activePhase ? 100 : 0,
    target: 100,
  }));

  // Track mouse position for 3D card effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Only update mousePosition if the change is significant
        setMousePosition((prev) => {
          const diffX = Math.abs(prev.x - x);
          const diffY = Math.abs(prev.y - y);
          if (diffX > 0.01 || diffY > 0.01) {
            return { x, y };
          }
          return prev;
        });
      }
    };

    // Throttled event listener
    let waiting = false;
    const onMouseMove = (e) => {
      if (!waiting) {
        handleMouseMove(e);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, 50);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Toggle expanded item
  const toggleExpand = (index) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  // Move to next phase
  const nextPhase = () => {
    setActivePhase((prev) =>
      prev < implementationPhases.length - 1 ? prev + 1 : prev
    );
  };

  // Move to previous phase
  const prevPhase = () => {
    setActivePhase((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // Icons for implementation phases
  const phaseIcons = [
    Target, // Khởi tạo
    Users, // Thu thập dữ liệu
    Share2, // Tích hợp hệ thống
    Zap, // Triển khai
    TrendingUp, // Đánh giá và cải tiến
  ];

  // Sample data for sparkline
  const sparklineData = [
    { month: "T1", value: 20 },
    { month: "T2", value: 45 },
    { month: "T3", value: 30 },
    { month: "T4", value: 60 },
    { month: "T5", value: 75 },
    { month: "T6", value: 85 },
  ];

  return (
    <Section
      id="strategy"
      ref={(node) => {
        ref.current = node;
        sectionRef.current = node;
      }}
      variant="default"
      isVisible={isVisible}
      animation="fade-in"
      container
      className="relative overflow-hidden py-20"
    >
      {/* Decorative background elements with mouse parallax */}
      <BackgroundElements mousePosition={mousePosition} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        <SectionHeader>
          <motion.div variants={itemVariants} className="inline-block mb-3">
            <div className="flex items-center space-x-2 mb-2 bg-green-100/80 backdrop-blur-sm dark:bg-green-900/40 text-green-700 dark:text-green-300 px-4 py-1 rounded-full text-sm font-medium border border-green-200/50 dark:border-green-800/50">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Kế hoạch triển khai</span>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionSubtitle>Chiến lược</SectionSubtitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionTitle className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
              Chiến lược cho thị trường Việt Nam
            </SectionTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionDescription>
              Đề xuất chiến lược triển khai Marketing Automation cho doanh
              nghiệp MLM tại Việt Nam
            </SectionDescription>
          </motion.div>
        </SectionHeader>

        {/* KPI Cards using updated chart components */}
        <motion.div variants={itemVariants} className="mt-8 mb-12">
          <DashboardGrid columns={4} gap="md">
            <DashboardGridItem>
              <KpiCard
                title="Tăng hiệu quả hoạt động"
                value={30}
                change={8.5}
                suffix="%"
                trend="up"
                trendDirection="up"
                icon={<TrendingUp className="h-5 w-5" />}
                color="green"
              />
            </DashboardGridItem>
            <DashboardGridItem>
              <KpiCard
                title="Cá nhân hoá trải nghiệm"
                value={25}
                change={5.2}
                suffix="%"
                trend="up"
                trendDirection="up"
                icon={<Users className="h-5 w-5" />}
                color="blue"
              />
            </DashboardGridItem>
            <DashboardGridItem>
              <KpiCard
                title="Tăng cường minh bạch"
                value={20}
                change={3.8}
                suffix="%"
                trend="up"
                trendDirection="up"
                icon={<Shield className="h-5 w-5" />}
                color="purple"
              />
            </DashboardGridItem>
            <DashboardGridItem>
              <SparklineCard
                title="Tăng doanh thu"
                value="25%"
                change={6.4}
                sparklineData={sparklineData}
                sparklineKey="value"
                sparklineType="area"
                color="teal"
                icon={<BarChart className="h-5 w-5" />}
              />
            </DashboardGridItem>
          </DashboardGrid>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <Card className="h-full border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6">
                <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-green-500 dark:text-green-400" />
                  Quy trình triển khai Marketing Automation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6">
                  {/* Progress indicator with enhanced bar chart */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Tiến độ triển khai
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Giai đoạn {activePhase + 1}/
                        {implementationPhases.length}
                      </span>
                    </div>

                    {/* Enhanced Bar Chart for Phase Progress */}
                    <div className="h-40 mt-4">
                      <EnhancedBarChart
                        data={phaseProgressData}
                        bars={[
                          {
                            dataKey: "progress",
                            name: "Hoàn thành",
                            color: ENHANCED_COLORS.success[2],
                          },
                          {
                            dataKey: "target",
                            name: "Mục tiêu",
                            color: ENHANCED_COLORS.neutral[2],
                            fillOpacity: 0.2,
                          },
                        ]}
                        xAxisKey="name"
                        height={150}
                        grid={false}
                        animate={true}
                        formatters={{
                          valueFormatter: (value) => `${value}%`,
                        }}
                        className="mt-4"
                      />
                    </div>
                  </div>

                  {/* Phase visualization */}
                  <div className="relative">
                    <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePhase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 z-10">
                            <div className="w-18 h-18 flex items-center justify-center">
                              <div className="w-18 h-18 rounded-full bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center p-1">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-500 dark:from-green-400 dark:to-teal-400 flex items-center justify-center text-white shadow-lg">
                                  {React.createElement(
                                    phaseIcons[activePhase],
                                    { className: "h-8 w-8" }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-6 pt-3">
                            <div className="inline-block px-3 py-1 mb-2 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
                              Giai đoạn {activePhase + 1}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {implementationPhases[activePhase].name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {implementationPhases[activePhase].description}
                            </p>
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-lg p-4">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                                <Lightbulb className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" />
                                Những điểm cần chú ý
                              </h4>
                              <ul className="space-y-2">
                                {getPhaseKeyPoints(activePhase).map(
                                  (point, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <Check className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                                        {point}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-between mt-8">
                      <Button
                        variant="outline"
                        onClick={prevPhase}
                        disabled={activePhase === 0}
                        className="border-gray-200 dark:border-gray-700"
                      >
                        <ChevronLeft className="h-5 w-5 mr-1" />
                        Trước
                      </Button>
                      <Button
                        variant="outline"
                        onClick={nextPhase}
                        disabled={
                          activePhase === implementationPhases.length - 1
                        }
                        className="border-gray-200 dark:border-gray-700"
                      >
                        Tiếp
                        <ChevronRight className="h-5 w-5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Timeline visualization */}
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-green-500 dark:text-green-400" />
                    Mốc thời gian triển khai
                  </h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="space-y-6">
                      {[
                        "Tháng 1",
                        "Tháng 2",
                        "Tháng 4",
                        "Tháng 6",
                        "Tháng 8",
                      ].map((month, idx) => (
                        <div key={idx} className="flex items-start relative">
                          <div
                            className={`h-8 w-8 rounded-full z-10 flex items-center justify-center mr-4 ${
                              idx <= activePhase
                                ? "bg-green-500 dark:bg-green-400 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <div
                            className={`flex-1 p-4 rounded-lg border ${
                              idx <= activePhase
                                ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30"
                                : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <div className="font-medium text-gray-900 dark:text-white">
                              {month}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {implementationPhases[idx].name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 order-1 lg:order-2"
          >
            <div className="space-y-6">
              {/* Requirements card */}
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `perspective(1000px) rotateY(${
                    (mousePosition.x - 0.5) * 3
                  }deg) rotateX(${(mousePosition.y - 0.5) * -3}deg)`,
                  transition: "transform 0.3s ease",
                }}
              >
                <Card className="border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-br from-teal-500 to-green-500 dark:from-teal-400 dark:to-green-400 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 shadow-lg">
                      <Check className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Yếu tố cần thiết
                    </CardTitle>
                    <div className="space-y-4 mt-6">
                      {[
                        "Cá nhân hoá trải nghiệm khách hàng",
                        "Tích hợp hệ thống quản lý CRM",
                        "Áp dụng công cụ tự động hóa đa kênh",
                        "Tuân thủ quy định pháp lý hiện hành",
                      ].map((requirement, idx) => (
                        <RequirementItemEnhanced key={idx} text={requirement} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Benefits chart with EnhancedPieChart */}
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `perspective(1000px) rotateY(${
                    (mousePosition.x - 0.5) * 3
                  }deg) rotateX(${(mousePosition.y - 0.5) * -3}deg)`,
                  transition: "transform 0.3s ease",
                }}
              >
                <Card className="bg-gradient-to-r from-teal-600 to-green-600 dark:from-teal-700 dark:to-green-700 text-white shadow-lg overflow-hidden border-0">
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-bold text-white mb-4 flex items-center">
                      <BarChart className="h-5 w-5 mr-2" />
                      Lợi ích kỳ vọng
                    </CardTitle>

                    <div className="h-64 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-lg"></div>
                      <div className="relative z-10">
                        {/* Enhanced Pie Chart */}
                        <EnhancedPieChart
                          data={benefitsPieChartData}
                          colors={CHART_COLORS}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={2}
                          showLabel={false}
                          animate={true}
                          activeIndex={hoveredBenefit}
                          height={250}
                          unit="%"
                          formatters={{
                            valueFormatter: (value) => `${value}%`,
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Download report button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-center mt-4"
              >
                <Button
                  variant="outline"
                  className="w-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tải báo cáo chiến lược đầy đủ
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-12">
          <Card className="border-gray-200/50 dark:border-gray-700/50 shadow-xl backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6">
              <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-amber-500 dark:text-amber-400" />
                Đề xuất cụ thể cho doanh nghiệp MLM
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {[
                  {
                    id: "crm",
                    title: "Đầu tư vào hệ thống CRM hiện đại",
                    description:
                      "Tích hợp dữ liệu khách hàng từ nhiều nguồn để tạo ra một hồ sơ toàn diện. Sử dụng dữ liệu này để cá nhân hoá nội dung tiếp thị.",
                    keyPoints: [
                      "Tích hợp Salesforce hoặc HubSpot với mô-đun MLM tùy chỉnh",
                      "Triển khai hệ thống quản lý liên hệ đa cấp",
                      "Thiết lập quy trình tự động làm sạch và làm giàu dữ liệu",
                      "Phát triển bảng điều khiển 360 độ cho nhà phân phối",
                    ],
                  },
                  {
                    id: "automation",
                    title: "Xây dựng nền tảng tự động hóa tiếp thị đa kênh",
                    description:
                      "Áp dụng các giải pháp tự động hóa email marketing, SMS, và push notification để tiếp cận khách hàng kịp thời.",
                    keyPoints: [
                      "Ưu tiên kênh di động cho thị trường Việt Nam với tỷ lệ sử dụng smartphone cao",
                      "Tạo chuỗi email nurturing tự động dựa trên hành vi người dùng",
                      "Tích hợp với nền tảng nhắn tin phổ biến như Zalo và Facebook Messenger",
                      "Sử dụng AI để tối ưu hóa thời gian gửi tin nhắn",
                    ],
                  },
                  {
                    id: "analytics",
                    title: "Tích hợp phân tích dữ liệu và báo cáo",
                    description:
                      "Sử dụng các công cụ phân tích BI để thu thập và xử lý dữ liệu kinh doanh theo thời gian thực.",
                    keyPoints: [
                      "Triển khai PowerBI hoặc Tableau cho báo cáo trực quan",
                      "Xây dựng mô hình dự đoán để nhận biết khách hàng có khả năng chuyển đổi cao",
                      "Thiết lập hệ thống cảnh báo sớm cho các xu hướng tiêu cực",
                      "Tạo báo cáo tự động cho các cấp quản lý khác nhau",
                    ],
                  },
                ].map((recommendation, idx) => (
                  <ExpandableRecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    index={idx}
                    isExpanded={expandedItem === idx}
                    onToggle={() => toggleExpand(idx)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12">
          <CalloutCard
            title="Sẵn sàng bắt đầu chuyển đổi?"
            description="MAMLM cung cấp giải pháp toàn diện với tư vấn chiến lược và triển khai Marketing Automation cho doanh nghiệp MLM ở Việt Nam."
            variant="primary"
            action={
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 border-none shadow-md"
                >
                  Liên hệ tư vấn
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Tìm hiểu thêm
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            }
            className="bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-700 dark:to-teal-700 text-white shadow-xl border-0"
          />
        </motion.div>
      </motion.div>
    </Section>
  );
});

// Enhanced Requirement Item component
const RequirementItemEnhanced = ({ text }) => (
  <motion.div
    whileHover={{ x: 5 }}
    transition={{ duration: 0.2 }}
    className="flex items-start py-2 px-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
  >
    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-teal-500 to-green-500 dark:from-teal-400 dark:to-green-400 flex items-center justify-center text-white shadow-sm mr-3 mt-0.5">
      <Check className="h-3.5 w-3.5" />
    </div>
    <span className="text-gray-700 dark:text-gray-300">{text}</span>
  </motion.div>
);

// Expandable Recommendation Card
const ExpandableRecommendationCard = ({
  recommendation,
  index,
  isExpanded,
  onToggle,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: isExpanded ? 0 : -5 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all border ${
        isExpanded
          ? "border-green-200 dark:border-green-800"
          : "border-gray-200 dark:border-gray-700"
      } overflow-hidden`}
    >
      <div
        className={`p-6 cursor-pointer ${
          isExpanded ? "bg-green-50 dark:bg-green-900/20" : ""
        }`}
        onClick={onToggle}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-green-500 dark:from-teal-400 dark:to-green-400 flex items-center justify-center text-white shadow-sm mr-4">
              {index + 1}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {recommendation.title}
            </h3>
          </div>
          <button
            className={`p-1 rounded-full transition-colors ${
              isExpanded
                ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
            aria-label={isExpanded ? "Thu gọn" : "Mở rộng"}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2 ml-14">
          {recommendation.description}
        </p>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="mt-4 ml-14 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/30">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" />
                  Hành động ưu tiên
                </h4>
                <ul className="space-y-2">
                  {recommendation.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Custom ChevronLeft icon component as it wasn't imported
const ChevronLeft = ({ className }) => (
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
    className={className}
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

// Background Elements with parallax effect
const BackgroundElements = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div
        className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-green-400/10 to-teal-500/10 dark:from-green-500/5 dark:to-teal-600/5 blur-3xl -z-10"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${
            (mousePosition.y - 0.5) * 20
          }px)`,
          transition: "transform 0.8s ease-out",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-teal-400/10 to-green-500/10 dark:from-teal-500/5 dark:to-green-600/5 blur-3xl -z-10"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${
            (mousePosition.y - 0.5) * -20
          }px)`,
          transition: "transform 0.8s ease-out",
        }}
      ></div>

      {/* Subtle decorative particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-green-500/5 dark:bg-green-400/5 rounded-full -z-20"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        ></div>
      ))}

      {/* Grid pattern */}
      <svg
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 10 L 40 10 M 10 0 L 10 40"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Floating shapes */}
      <div className="absolute top-1/4 right-10 w-16 h-16 rounded-full border border-green-200/30 dark:border-green-700/30 opacity-50"></div>
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full border border-teal-200/30 dark:border-teal-700/30 opacity-40"></div>
      <div className="absolute top-2/3 right-1/4 w-20 h-20 rounded-lg border border-green-200/30 dark:border-green-700/30 opacity-40 rotate-12"></div>
    </div>
  );
};

// Additional key points for each implementation phase
const getPhaseKeyPoints = (phaseIndex) => {
  const keyPoints = [
    // Khởi tạo
    [
      "Gặp gỡ các bên liên quan chủ chốt để xác định mục tiêu kinh doanh",
      "Đánh giá hệ thống hiện tại và xác định các khoảng trống",
      "Xác định các KPI chính để đo lường thành công",
      "Thiết lập khung thời gian và ngân sách dự án",
    ],
    // Thu thập dữ liệu
    [
      "Phát triển người mua lý tưởng và phân khúc khách hàng",
      "Làm sạch và hợp nhất dữ liệu từ các nguồn hiện có",
      "Thực hiện phân tích đối thủ cạnh tranh",
      "Xác định các cơ hội thị trường chưa được khai thác",
    ],
    // Tích hợp hệ thống
    [
      "Triển khai nền tảng CRM với khả năng theo dõi phân cấp",
      "Thiết lập cầu nối API với các công cụ tiếp thị",
      "Cấu hình tự động hóa quy trình làm việc và chuỗi kích hoạt",
      "Đảm bảo tuân thủ các quy định bảo vệ dữ liệu",
    ],
    // Triển khai
    [
      "Đào tạo đội ngũ về nền tảng Marketing Automation mới",
      "Phát triển các mẫu email và tin nhắn cá nhân hóa",
      "Thiết lập chiến dịch truyền thông đa kênh",
      "Triển khai theo giai đoạn để giảm thiểu gián đoạn",
    ],
    // Đánh giá và cải tiến
    [
      "Theo dõi KPI đã xác định và đánh giá hiệu suất",
      "Thu thập phản hồi từ người dùng và nhà phân phối",
      "Tinh chỉnh chiến dịch dựa trên phân tích dữ liệu",
      "Xác định các cơ hội cải tiến liên tục",
    ],
  ];

  return keyPoints[phaseIndex] || [];
};

Strategy.displayName = "Strategy";

export default Strategy;
