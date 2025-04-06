import React, { forwardRef, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { MainSection } from "../layout/main-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { ResponsiveCard } from "../ui/responsive-card";
import { Button } from "../ui/button";
import { toolsComparisonData } from "../../data/siteData";
import {
  // Thay thế BarChart cũ bằng EnhancedBarChart mới
  EnhancedBarChart,
  EnhancedPieChart,
  KpiCard,
  ENHANCED_COLORS,
} from "../charts/chart-components";

// Import các component từ chart-wrapper
import {
  EnhancedChartWrapper as ChartWrapper,
  EnhancedChartGrid as ChartGrid,
  EnhancedChartGridItem as ChartGridItem,
} from "../charts/chart-wrapper";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  BarChart2,
  Database,
  Users,
  Mail,
  Filter,
  ArrowRight,
  Check,
  Info,
  Download,
  ExternalLink,
  Shield,
  Zap,
} from "lucide-react";
import { DollarSign } from "lucide-react";

const Tools = forwardRef(({ isVisible }, ref) => {
  const [activeTab, setActiveTab] = useState("compare");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);

  // Dữ liệu biểu đồ pie mới để sử dụng trong dashboard
  const toolCategoryData = [
    { name: "Quản lý mạng lưới", value: 35 },
    { name: "CRM/Email Marketing", value: 25 },
    { name: "Phân tích dữ liệu", value: 30 },
    { name: "Tích hợp đa kênh", value: 10 },
  ];

  // Prep data for KPIs
  const kpiData = [
    {
      title: "Hiệu suất làm việc",
      value: 85,
      previousValue: 70,
      suffix: "%",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "blue",
    },
    {
      title: "Tự động hóa quy trình",
      value: 78,
      previousValue: 55,
      suffix: "%",
      icon: <Zap className="h-6 w-6" />,
      color: "purple",
    },
    {
      title: "ROI Trung bình",
      value: 3.5,
      previousValue: 2.8,
      suffix: "x",
      icon: <DollarSign className="h-6 w-6" />,
      color: "green",
    },
  ];

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

  const handleRowHover = (rowId) => {
    setHoveredRow(rowId);
  };

  const handleRowLeave = () => {
    setHoveredRow(null);
  };

  const handleToolHover = (toolId) => {
    setHoveredTool(toolId);
  };

  const handleToolLeave = () => {
    setHoveredTool(null);
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

  return (
    <MainSection
      id="tools"
      ref={(node) => {
        ref.current = node;
        sectionRef.current = node;
      }}
      className="py-20 bg-gradient-to-b from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 relative overflow-hidden"
    >
      {/* Background elements */}
      <BackgroundElements mousePosition={mousePosition} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader>
          <div className="inline-block mb-3">
            <div className="flex items-center space-x-2 mb-2 bg-cyan-100/80 backdrop-blur-sm dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 px-4 py-1 rounded-full text-sm font-medium border border-cyan-200/50 dark:border-cyan-800/50">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Tool Comparison</span>
            </div>
          </div>
          <SectionSubtitle>Công cụ</SectionSubtitle>
          <SectionTitle className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 dark:from-cyan-400 dark:via-blue-400 dark:to-teal-400">
            So sánh công cụ tự động hóa
          </SectionTitle>
          <SectionDescription>
            Phân tích và so sánh các công cụ tự động hóa tiếp thị hiện có cho mô
            hình MLM
          </SectionDescription>
        </SectionHeader>

        {/* KPI Dashboard - Thêm mới */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-10"
        >
          {kpiData.map((kpi, index) => (
            <motion.div key={index} variants={itemVariants}>
              <KpiCard
                title={kpi.title}
                value={kpi.value}
                previousValue={kpi.previousValue}
                suffix={kpi.suffix}
                icon={kpi.icon}
                color={kpi.color}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-12"
        >
          <motion.div
            variants={itemVariants}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateY(${
                (mousePosition.x - 0.5) * 2
              }deg) rotateX(${(mousePosition.y - 0.5) * -2}deg)`,
              transition: "transform 0.5s ease",
            }}
            className="mb-12"
          >
            {/* Tạo container với background light cho chart - Thêm bg-white/bg-gray-800 */}
            <div className="mb-12 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
              <div className="w-full">
                <EnhancedBarChart
                  title="So sánh chức năng các công cụ"
                  subtitle="Đánh giá hiệu suất theo từng tiêu chí"
                  data={toolsComparisonData}
                  xAxisKey="name"
                  grid={true}
                  height={400}
                  bars={[
                    {
                      dataKey: "epixel",
                      name: "Epixel MLM Software",
                      color: "#06b6d4",
                    },
                    {
                      dataKey: "global",
                      name: "Global MLM Software",
                      color: "#0284c7",
                    },
                    {
                      dataKey: "bi",
                      name: "Công cụ BI (Tableau/Sisense)",
                      color: "#0d9488",
                    },
                  ]}
                  className="text-gray-900"
                  caption="Dữ liệu cập nhật Q1 2025"
                  info="So sánh các chức năng chính giữa các công cụ dựa trên mức độ hỗ trợ và tính năng"
                  animate={true}
                  /* Sửa filterOptions để khớp với dataKey của bars */
                  filterOptions={[
                    { label: "Epixel MLM Software", value: "epixel" },
                    { label: "Global MLM Software", value: "global" },
                    { label: "Công cụ BI", value: "bi" },
                  ]}
                  layout="horizontal"
                />
              </div>
            </div>
          </motion.div>

          {/* Chart Grid mới với các biểu đồ bổ sung */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              {/* PieChart với background light */}
              <EnhancedPieChart
                title="Phân bổ nhu cầu theo loại công cụ"
                data={toolCategoryData}
                colors={ENHANCED_COLORS.primary}
                height={320}
                animate={true}
                innerRadius={60}
                outerRadius={120}
                showLabel={true}
                info="Phân tích nhu cầu thị trường dựa trên số lượng truy vấn và yêu cầu từ doanh nghiệp MLM"
                paddingAngle={2}
                className="text-gray-900"
                formatters={{
                  valueFormatter: (value) => `${value}%`,
                }}
              />
            </div>

            <div>
              <div className="w-full h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl border border-white/30 dark:border-gray-700/30 shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Chi tiết đánh giá công cụ
                </h3>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      <Database className="h-4 w-4 text-cyan-500 mr-2" />
                      Epixel MLM Software
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          Quản lý mạng lưới
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          90/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-500 dark:bg-cyan-400 h-full rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          Phân tích dữ liệu
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          75/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-500 dark:bg-cyan-400 h-full rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          Tích hợp đa kênh
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          85/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-500 dark:bg-cyan-400 h-full rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      <Users className="h-4 w-4 text-blue-500 mr-2" />
                      Global MLM Software
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          Quản lý CRM
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          90/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 dark:bg-blue-400 h-full rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          Tích hợp đa ngôn ngữ
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          95/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 dark:bg-blue-400 h-full rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                id: "epixel",
                title: "Epixel MLM Software",
                description:
                  "Nền tảng MLM toàn diện với tích hợp CRM và quản lý mạng lưới",
                features: [
                  "Quản lý mạng lưới phân phối đầy đủ",
                  "Tích hợp CRM tốt",
                  "Hỗ trợ các chiến dịch email tự động",
                  "Báo cáo tự động, tích hợp BI cơ bản",
                ],
                pros: [
                  "Giao diện thân thiện",
                  "Tích hợp đa kênh",
                  "Tuỳ biến cao",
                ],
                cons: ["Chi phí cao", "Cài đặt phức tạp"],
                icon: Database,
                score: 85,
                color: "cyan",
              },
              {
                id: "global",
                title: "Global MLM Software",
                description:
                  "Giải pháp quốc tế với khả năng mở rộng và tính tùy biến cao",
                features: [
                  "Quản lý thông tin liên hệ, tự động cập nhật CRM",
                  "Tự động tính toán và phân phối hoa hồng",
                  "Hỗ trợ tự động nuôi dưỡng khách hàng qua email",
                  "Tích hợp các công cụ phân tích và báo cáo",
                ],
                pros: [
                  "Hỗ trợ đa ngôn ngữ",
                  "Khả năng mở rộng tốt",
                  "Hiệu suất cao",
                ],
                cons: ["Giao diện phức tạp", "Thời gian triển khai dài"],
                icon: Users,
                score: 78,
                color: "blue",
              },
              {
                id: "bi",
                title: "Công cụ BI (Tableau/Sisense)",
                description:
                  "Nền tảng phân tích dữ liệu chuyên sâu cho các quyết định kinh doanh",
                features: [
                  "Hỗ trợ phân tích dữ liệu phân phối",
                  "Không hỗ trợ trực tiếp CRM",
                  "Không áp dụng trực tiếp cho email marketing",
                  "Phân tích chuyên sâu là thế mạnh chính",
                ],
                pros: [
                  "Phân tích dữ liệu mạnh mẽ",
                  "Trực quan hóa dữ liệu",
                  "Tích hợp nhiều nguồn dữ liệu",
                ],
                cons: [
                  "Thiếu tính năng CRM",
                  "Cần tích hợp với giải pháp khác",
                ],
                icon: BarChart2,
                score: 65,
                color: "teal",
              },
            ].map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onMouseEnter={() => handleToolHover(tool.id)}
                onMouseLeave={handleToolLeave}
              >
                <ToolCard
                  tool={tool}
                  isActive={hoveredTool === tool.id}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12">
            <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl border-0 overflow-hidden">
              <CardContent className="p-8 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
                <div className="absolute inset-0 bg-black opacity-5"></div>

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0 md:mr-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg mr-3">
                          <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold">
                          Lựa chọn tối ưu cho MLM
                        </h3>
                      </div>
                      <p className="mt-3 text-cyan-100">
                        Giải pháp Marketing Automation tích hợp cung cấp đầy đủ
                        các công cụ tiếp thị tự động, quản lý hoa hồng, và phân
                        tích dữ liệu trong một nền tảng thống nhất.
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="default"
                        size="lg"
                        className="px-8 py-4 bg-white text-cyan-700 hover:bg-white/90 shadow-md border-0"
                      >
                        Tư vấn giải pháp tích hợp
                        <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg p-8 border border-white/30 dark:border-gray-700/30">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Shield className="h-5 w-5 text-cyan-500 dark:text-cyan-400 mr-2" />
                Hướng dẫn lựa chọn công cụ phù hợp
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-cyan-100 dark:border-cyan-800/30 p-5 bg-gradient-to-br from-cyan-50 to-cyan-100/30 dark:from-cyan-900/20 dark:to-cyan-900/10">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 dark:bg-cyan-600 text-white flex items-center justify-center mr-2">
                      1
                    </div>
                    Đánh giá nhu cầu doanh nghiệp
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Xác định quy mô mạng lưới phân phối, số lượng giao dịch hàng
                    tháng, và các yêu cầu đặc thù về quản lý hoa hồng và tiếp
                    thị.
                  </p>
                </div>

                <div className="rounded-lg border border-blue-100 dark:border-blue-800/30 p-5 bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-blue-900/20 dark:to-blue-900/10">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center mr-2">
                      2
                    </div>
                    Xem xét khả năng tích hợp
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Đảm bảo công cụ lựa chọn có thể tích hợp với các hệ thống
                    hiện có (website, cổng thanh toán, hệ thống kế toán) và các
                    kênh tiếp thị khác.
                  </p>
                </div>

                <div className="rounded-lg border border-teal-100 dark:border-teal-800/30 p-5 bg-gradient-to-br from-teal-50 to-teal-100/30 dark:from-teal-900/20 dark:to-teal-900/10">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-teal-500 dark:bg-teal-600 text-white flex items-center justify-center mr-2">
                      3
                    </div>
                    Cân nhắc khả năng mở rộng
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Lựa chọn nền tảng có khả năng mở rộng để đáp ứng sự phát
                    triển của doanh nghiệp trong tương lai, tránh phải chuyển
                    đổi công cụ sau này.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-100 dark:border-gray-800/30 p-5 bg-gradient-to-br from-gray-50 to-gray-100/30 dark:from-gray-900/20 dark:to-gray-800/10">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-500 dark:bg-gray-600 text-white flex items-center justify-center mr-2">
                      4
                    </div>
                    Đánh giá ROI
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tính toán lợi nhuận đầu tư dựa trên chi phí triển khai, vận
                    hành và giá trị mang lại từ việc tự động hóa quy trình
                    marketing và quản lý.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-5 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-lg border border-cyan-100 dark:border-cyan-800/30">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Info className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Lời khuyên chuyên gia
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Khi đánh giá các giải pháp, hãy ưu tiên những nền tảng
                      cung cấp môi trường demo thực tế và tham khảo ý kiến từ
                      doanh nghiệp MLM đã sử dụng công cụ đó. Xem xét cả chi phí
                      ban đầu và chi phí dài hạn để có cái nhìn toàn diện về
                      tổng chi phí sở hữu (TCO).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </MainSection>
  );
});

// Enhanced Tool Card component
const ToolCard = ({ tool, isActive, index }) => {
  const {
    id,
    title,
    description,
    features,
    pros,
    cons,
    icon: Icon,
    score,
    color,
  } = tool;

  // Colors mapping for different tools
  const colorVariants = {
    cyan: {
      bg: "bg-gradient-to-br from-cyan-50 to-cyan-100/80 dark:from-cyan-900/20 dark:to-cyan-900/30",
      border: "border-cyan-200 dark:border-cyan-800/50",
      shadow: "shadow-cyan-500/10",
      text: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-500/90 dark:bg-cyan-600/90",
      iconGlow: "shadow-lg",
      progress: "bg-cyan-500 dark:bg-cyan-400",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/80 dark:from-blue-900/20 dark:to-blue-900/30",
      border: "border-blue-200 dark:border-blue-800/50",
      shadow: "shadow-blue-500/10",
      text: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/90 dark:bg-blue-600/90",
      iconGlow: "shadow-lg",
      progress: "bg-blue-500 dark:bg-blue-400",
    },
    teal: {
      bg: "bg-gradient-to-br from-teal-50 to-teal-100/80 dark:from-teal-900/20 dark:to-teal-900/30",
      border: "border-teal-200 dark:border-teal-800/50",
      shadow: "shadow-teal-500/10",
      text: "text-teal-600 dark:text-teal-400",
      iconBg: "bg-teal-500/90 dark:bg-teal-600/90",
      iconGlow: "shadow-lg",
      progress: "bg-teal-500 dark:bg-teal-400",
    },
  };

  const colors = colorVariants[color];

  return (
    <Card
      className={`h-full transition-all duration-300 ${colors.bg} border ${
        colors.border
      } ${colors.shadow} ${isActive ? "shadow-lg" : "shadow-md"}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div
            className={`h-12 w-12 rounded-lg ${
              colors.iconBg
            } flex items-center justify-center text-white mr-4 ${
              isActive ? colors.iconGlow : ""
            } transition-all duration-300`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

        <div className="mt-4 mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Điểm đánh giá
            </span>
            <span className={`text-sm font-semibold ${colors.text}`}>
              {score}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${colors.progress}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Tính năng chính
          </h4>
          <ul className="space-y-1 mb-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm">
                <Check
                  className={`h-4 w-4 ${colors.text} mt-0.5 mr-2 flex-shrink-0`}
                />
                <span className="text-gray-600 dark:text-gray-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className={`text-sm font-semibold ${colors.text} mb-2`}>
              Ưu điểm
            </h4>
            <ul className="space-y-1">
              {pros.map((pro, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                >
                  <span className="text-green-500 mr-1">+</span> {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-sm font-semibold ${colors.text} mb-2`}>
              Nhược điểm
            </h4>
            <ul className="space-y-1">
              {cons.map((con, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                >
                  <span className="text-red-500 mr-1">-</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ width: "40%" }}
          animate={{ width: isActive ? "100%" : "40%" }}
          transition={{ duration: 0.4 }}
          className={`h-0.5 ${colors.progress} rounded-full mt-6 opacity-50`}
        />
      </CardContent>
    </Card>
  );
};

// Background elements
const BackgroundElements = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div
        className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-blue-600/5 blur-3xl -z-10"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${
            (mousePosition.y - 0.5) * 20
          }px)`,
          transition: "transform 0.8s ease-out",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-blue-400/10 to-teal-500/10 dark:from-blue-500/5 dark:to-teal-600/5 blur-3xl -z-10"
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
          className="absolute bg-cyan-500/5 dark:bg-cyan-400/5 rounded-full -z-20"
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
            id="tools-grid"
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
        <rect width="100%" height="100%" fill="url(#tools-grid)" />
      </svg>

      {/* Floating shapes */}
      <div className="absolute top-1/4 right-10 w-16 h-16 rounded-full border border-cyan-200/30 dark:border-cyan-700/30 opacity-50"></div>
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full border border-blue-200/30 dark:border-blue-700/30 opacity-40"></div>
      <div className="absolute top-2/3 right-1/4 w-20 h-20 rounded-lg border border-teal-200/30 dark:border-teal-700/30 opacity-40 rotate-12"></div>
    </div>
  );
};

Tools.displayName = "Tools";

export default Tools;
