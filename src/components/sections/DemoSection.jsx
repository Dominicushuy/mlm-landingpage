import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ResponsiveCard } from "../ui/responsive-card";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import CompareTool from "../features/compare-tool";
import AutomationDashboard from "../features/automation-dashboard";
import AutomationFlowBuilder from "../features/automation-flow-builder";
import {
  Zap,
  Target,
  Layers,
  Users,
  ArrowRight,
  Check,
  Shield,
  BarChart2,
  ChevronRight,
} from "lucide-react";

const DemoSection = ({ isVisible }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);

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

    // Throttled event listener to reduce performance impact
    let waiting = false;
    const onMouseMove = (e) => {
      if (!waiting) {
        handleMouseMove(e);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, 50); // Wait 50ms between updates
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Simulate loading state for better UX
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Handle card hover
  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section
      id="demo"
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Dynamic background elements with mouse interactivity */}
      <BackgroundElements mousePosition={mousePosition} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader>
            <div className="inline-block mb-3">
              <div className="flex items-center space-x-2 mb-2 bg-cyan-100/80 backdrop-blur-sm dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 px-4 py-1 rounded-full text-sm font-medium border border-cyan-200/50 dark:border-cyan-800/50">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span>Interactive Demo</span>
              </div>
            </div>
            <SectionSubtitle>Demo Sản Phẩm</SectionSubtitle>
            <SectionTitle className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-400">
              Marketing Automation in Action
            </SectionTitle>
            <SectionDescription>
              Trải nghiệm trực quan về các tính năng Marketing Automation cho
              MLM
            </SectionDescription>
          </SectionHeader>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(1000px) rotateY(${
              (mousePosition.x - 0.5) * 2
            }deg) rotateX(${(mousePosition.y - 0.5) * -2}deg)`,
            transition: "transform 0.5s ease",
          }}
          className="mt-12"
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <ResponsiveCard
              withBorder
              className="shadow-xl border-white/30 dark:border-gray-700/30 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 relative overflow-hidden"
            >
              {/* Decorative gradient borders */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"></div>
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500"></div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"></div>
              <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500"></div>

              <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-4 md:p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/80 dark:to-gray-900/80">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <CardTitle className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
                    MAMLM Platform Demo
                  </CardTitle>

                  <TabsList
                    variant="pills"
                    className="grid grid-cols-3 gap-1 w-full md:w-auto p-1 rounded-lg bg-gray-100 dark:bg-gray-700/50"
                  >
                    <TabsTrigger
                      value="dashboard"
                      className="rounded-md py-2.5 transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
                    >
                      <BarChart2 className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Dashboard</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="builder"
                      className="rounded-md py-2.5 transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
                    >
                      <Layers className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Flow Builder</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="compare"
                      className="rounded-md py-2.5 transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
                    >
                      <Target className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">
                        So sánh giải pháp
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 md:p-6">
                  {/* Animated skeleton loader */}
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
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8 md:mb-12 relative inline-block">
              Tại sao nên sử dụng Marketing Automation?
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400 w-full"></div>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "efficiency",
                icon: Zap,
                emoji: "⚡️",
                title: "Tăng hiệu quả hoạt động",
                description:
                  "Tiết kiệm 85% thời gian và tài nguyên so với phương pháp truyền thống bằng cách tự động hóa các tác vụ lặp đi lặp lại.",
                color: "blue",
              },
              {
                id: "personalize",
                icon: Target,
                emoji: "🎯",
                title: "Cá nhân hóa trải nghiệm",
                description:
                  "Tạo ra những chiến dịch marketing được cá nhân hóa dựa trên hành vi và sở thích của từng khách hàng.",
                color: "cyan",
              },
              {
                id: "data",
                icon: BarChart2,
                emoji: "📊",
                title: "Dựa trên dữ liệu thực tế",
                description:
                  "Ra quyết định dựa trên các số liệu và phân tích thời gian thực, giúp tối ưu hóa chiến lược liên tục.",
                color: "indigo",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                onMouseEnter={() => handleCardHover(feature.id)}
                onMouseLeave={handleCardLeave}
              >
                <EnhancedFeatureCard
                  feature={feature}
                  isActive={hoveredCard === feature.id}
                  index={index}
                />
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button
                variant="default"
                size="lg"
                className="px-8 py-3 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                Đăng ký dùng thử miễn phí
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Added additional valuable content section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-24"
        >
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-700 dark:to-blue-700 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg mr-3">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Sẵn sàng trải nghiệm?
                    </h3>
                  </div>
                  <p className="mt-3 text-blue-100">
                    Chúng tôi cung cấp phiên bản demo đầy đủ tính năng với dữ
                    liệu mẫu để bạn có thể trải nghiệm sức mạnh của nền tảng
                    Marketing Automation.
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="default"
                    size="lg"
                    className="px-8 py-4 bg-white text-blue-700 hover:bg-white/90 shadow-md border-0"
                  >
                    Nhận tư vấn chi tiết
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    label: "Tùy chỉnh hoàn toàn",
                    description: "Điều chỉnh luồng automation tùy theo nhu cầu",
                  },
                  {
                    label: "Data-driven insights",
                    description: "Phân tích hiệu suất và nhận gợi ý tối ưu",
                  },
                  {
                    label: "Hỗ trợ triển khai",
                    description: "Đội ngũ chuyên gia hỗ trợ từng bước",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 transform transition-transform duration-200 hover:translate-y-[-5px]"
                  >
                    <h4 className="font-bold text-white mb-2">{item.label}</h4>
                    <p className="text-blue-100 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

// Enhanced Feature Card component with modern design and interactions
const EnhancedFeatureCard = ({ feature, isActive, index }) => {
  const { id, icon: Icon, emoji, title, description, color } = feature;

  // Colors mapping for different feature types
  const colorVariants = {
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/80 dark:from-blue-900/20 dark:to-blue-900/30",
      border: "border-blue-200 dark:border-blue-800/50",
      shadow: "shadow-blue-500/10",
      text: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/90 dark:bg-blue-600/90",
      iconGlow: "shadow-lg shadow-blue-500/20",
    },
    cyan: {
      bg: "bg-gradient-to-br from-cyan-50 to-cyan-100/80 dark:from-cyan-900/20 dark:to-cyan-900/30",
      border: "border-cyan-200 dark:border-cyan-800/50",
      shadow: "shadow-cyan-500/10",
      text: "text-cyan-600 dark:text-cyan-400",
      iconBg: "bg-cyan-500/90 dark:bg-cyan-600/90",
      iconGlow: "shadow-lg shadow-cyan-500/20",
    },
    indigo: {
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100/80 dark:from-indigo-900/20 dark:to-indigo-900/30",
      border: "border-indigo-200 dark:border-indigo-800/50",
      shadow: "shadow-indigo-500/10",
      text: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-500/90 dark:bg-indigo-600/90",
      iconGlow: "shadow-lg shadow-indigo-500/20",
    },
  };

  const colors = colorVariants[color];

  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className={`
        rounded-xl overflow-hidden h-full transition-all duration-300
        ${isActive ? "shadow-xl" : "shadow-md"} border ${colors.border} ${
        colors.bg
      }
      `}
    >
      <Card className="h-full border-0 bg-transparent">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Icon/emoji section */}
          <div className="mb-4 flex items-start justify-between">
            <div
              className={`h-12 w-12 rounded-lg ${
                colors.iconBg
              } flex items-center justify-center text-white ${
                isActive ? colors.iconGlow : ""
              } transition-all duration-300`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div className="text-4xl">{emoji}</div>
          </div>

          {/* Content section */}
          <div className="flex-grow">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          </div>

          {/* Footer with gradient line and arrow */}
          <div className="mt-6 pt-4 flex items-center justify-between">
            <motion.div
              className={`h-0.5 w-full ${colors.iconBg} rounded-full opacity-30`}
              initial={{ width: "40%" }}
              animate={{ width: isActive ? "70%" : "40%" }}
              transition={{ duration: 0.4 }}
            />
            <ChevronRight
              className={`h-5 w-5 ${
                colors.text
              } transform transition-transform duration-300 ${
                isActive ? "translate-x-1" : "translate-x-0"
              }`}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Animated background elements with mouse parallax
const BackgroundElements = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main gradient backgrounds */}
      <div
        className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-blue-600/5 blur-3xl"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${
            (mousePosition.y - 0.5) * 20
          }px)`,
          transition: "transform 0.8s ease-out",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-blue-400/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-600/5 blur-3xl"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${
            (mousePosition.y - 0.5) * -20
          }px)`,
          transition: "transform 0.8s ease-out",
        }}
      ></div>

      {/* Decorative particles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-cyan-500/5 dark:bg-cyan-400/5"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `translate(${
              (mousePosition.x - 0.5) * (i % 2 === 0 ? -30 : 30)
            }px, ${(mousePosition.y - 0.5) * (i % 2 === 0 ? -30 : 30)}px)`,
            transition: "transform 1s ease-out",
          }}
        ></div>
      ))}

      {/* Grid pattern */}
      <svg
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="demo-grid"
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
        <rect width="100%" height="100%" fill="url(#demo-grid)" />
      </svg>

      {/* Single glassmorphism element */}
      <div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 backdrop-blur-xl border border-white/10 dark:border-white/5"
        style={{
          left: `${30 + mousePosition.x * 10}%`,
          top: `${20 + mousePosition.y * 10}%`,
          transition: "left 0.8s ease-out, top 0.8s ease-out",
        }}
      ></div>
    </div>
  );
};

export default DemoSection;
