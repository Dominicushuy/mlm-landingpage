import React, { forwardRef, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Grid, GridItem, Flex } from "../layout/container";
import { Card, CardContent, CardTitle } from "../ui/card";
import { LineChart, AreaChart } from "../charts/chart-components";
import { Button } from "../ui/button";
import { FeatureCard } from "../features/feature-card";
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
  Globe,
} from "lucide-react";

const EcommerceImpact = forwardRef(({ isVisible }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [highlightedFeature, setHighlightedFeature] = useState(null);
  const [chartView, setChartView] = useState("line");
  const sectionRef = useRef(null);
  const controls = useAnimation();

  // Animation effect when component becomes visible
  useEffect(() => {
    if (isVisible) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isVisible, controls]);

  // Track mouse position for 3D parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation variants
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  // Chart data for both line and area
  const chartData = marketGrowthData.map((item) => ({
    ...item,
    ecommerce_growth: (item.ecommerce / 1000).toFixed(1), // Scale for better visualization
    mlm_relative: ((item.mlm / item.ecommerce) * 100).toFixed(1), // Calculate relative percentage
  }));

  return (
    <Section
      id="ecommerce"
      ref={(node) => {
        ref.current = node;
        sectionRef.current = node;
      }}
      variant="gradient"
      isVisible={isVisible}
      animation="fade-in"
      container
      className="relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <GlassmorphismBackground mousePosition={mousePosition} />
      <ParticlesBackground />

      <motion.div
        initial="hidden"
        animate={controls}
        variants={parentVariants}
        className="relative z-10"
      >
        <motion.div variants={childVariants}>
          <SectionHeader>
            <div className="inline-block mb-3">
              <motion.div
                className="flex items-center space-x-2 mb-2 bg-indigo-100/80 backdrop-blur-sm dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-1 rounded-full text-sm font-medium border border-indigo-200/50 dark:border-indigo-800/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span>Phân tích tác động</span>
              </motion.div>
            </div>
            <SectionSubtitle>Tác động TMĐT</SectionSubtitle>
            <SectionTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Thương mại điện tử thay đổi MLM
            </SectionTitle>
            <SectionDescription>
              Tác động của thương mại điện tử đến mô hình kinh doanh đa cấp
              truyền thống và cách thức chuyển đổi để thích ứng
            </SectionDescription>
          </SectionHeader>
        </motion.div>

        <Grid cols={2} gap="lg" className="mt-12 items-center">
          <GridItem>
            <motion.div
              variants={childVariants}
              whileHover="hover"
              variants={cardVariants}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateY(${
                  (mousePosition.x - 0.5) * 3
                }deg) rotateX(${(mousePosition.y - 0.5) * -3}deg)`,
                transition: "transform 0.3s ease",
              }}
            >
              <Card
                variant="default"
                className="shadow-xl border border-white/20 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 overflow-hidden"
              >
                <CardContent className="p-6">
                  {/* Chart controls */}
                  <div className="flex justify-between items-center mb-6">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      TMĐT vs MLM: Tăng trưởng so sánh
                    </CardTitle>
                    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                      <button
                        onClick={() => setChartView("line")}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                          chartView === "line"
                            ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        Line
                      </button>
                      <button
                        onClick={() => setChartView("area")}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                          chartView === "area"
                            ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        Area
                      </button>
                    </div>
                  </div>

                  {/* Dynamic chart based on selection */}
                  <div className="h-80 relative">
                    {/* Chart glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-lg"></div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={chartView}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                      >
                        {chartView === "line" ? (
                          <LineChart
                            data={chartData}
                            lines={[
                              {
                                dataKey: "mlm",
                                name: "MLM (tỷ USD)",
                                color: "#8b5cf6",
                              },
                              {
                                dataKey: "ecommerce_growth",
                                name: "TMĐT (nghìn tỷ USD)",
                                color: "#ef4444",
                              },
                            ]}
                            xAxisKey="year"
                          />
                        ) : (
                          <AreaChart
                            data={chartData}
                            areas={[
                              {
                                dataKey: "mlm",
                                name: "MLM (tỷ USD)",
                                color: "#8b5cf6",
                                fillOpacity: 0.4,
                              },
                              {
                                dataKey: "ecommerce_growth",
                                name: "TMĐT (nghìn tỷ USD)",
                                color: "#ef4444",
                                fillOpacity: 0.4,
                              },
                            ]}
                            xAxisKey="year"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-6 text-center text-gray-500 dark:text-gray-400 italic"
                  >
                    So sánh tăng trưởng thị trường MLM và thương mại điện tử
                    toàn cầu
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="mt-4 grid grid-cols-2 gap-4"
                  >
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center">
                      <TrendingUp className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          TMĐT tăng trưởng
                        </p>
                        <p className="text-xl font-bold text-red-600 dark:text-red-400">
                          +15.7%
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center">
                      <BarChart2 className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          MLM biến động
                        </p>
                        <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                          -3.2%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </GridItem>

          <GridItem>
            <div className="space-y-6">
              <motion.div variants={childVariants}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 relative inline-block">
                  Những thách thức mới
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </h3>
              </motion.div>

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
          </GridItem>
        </Grid>

        <motion.div
          variants={childVariants}
          className="mt-16 p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute inset-0 bg-black opacity-5"></div>

          <div className="relative z-10 text-white">
            <Flex className="flex-col md:flex-row items-center justify-between">
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
                className="px-8 py-3 bg-white text-indigo-700 hover:bg-gray-100 hover:text-indigo-800 shadow-md"
              >
                Khám phá giải pháp
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Flex>

            <div className="mt-8 grid grid-cols-3 gap-6">
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <span className="text-3xl font-bold opacity-50">
                    {step.number}
                  </span>
                  <p className="mt-2 font-medium">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Chart interactive dots */}
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-indigo-500/20 backdrop-blur-xl border border-indigo-500/30"
        animate={{
          x: [
            mousePosition.x * 500,
            mousePosition.x * 500 + 20,
            mousePosition.x * 500,
          ],
          y: [
            mousePosition.y * 100 + 200,
            mousePosition.y * 100 + 210,
            mousePosition.y * 100 + 200,
          ],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute w-4 h-4 rounded-full bg-purple-500/20 backdrop-blur-xl border border-purple-500/30"
        animate={{
          x: [
            mousePosition.x * 300 + 100,
            mousePosition.x * 300 + 90,
            mousePosition.x * 300 + 100,
          ],
          y: [
            mousePosition.y * 200 + 300,
            mousePosition.y * 200 + 320,
            mousePosition.y * 200 + 300,
          ],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </Section>
  );
});

// Enhanced Feature Card component with animations and 3D effects
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
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

        {/* Bottom decorative line with animation */}
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

// Glassmorphism background effect with parallax
const GlassmorphismBackground = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large gradient circles with glassmorphism */}
      <motion.div
        className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-indigo-400/15 to-purple-500/15 dark:from-indigo-500/5 dark:to-purple-600/5 blur-3xl -z-10"
        animate={{
          x: mousePosition.x * 30 - 15,
          y: mousePosition.y * 30 - 15,
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-purple-400/15 to-pink-500/15 dark:from-purple-500/5 dark:to-pink-600/5 blur-3xl -z-10"
        animate={{
          x: mousePosition.x * -30 + 15,
          y: mousePosition.y * -30 + 15,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Glassmorphism elements */}
      <div className="absolute top-1/4 right-1/5 w-48 h-48 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 dark:border-white/5 -z-10"></div>
      <div className="absolute bottom-1/3 left-1/4 w-36 h-36 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 dark:border-white/5 -z-10"></div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/2 left-10 w-16 h-16 rounded-md bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 dark:border-white/5 transform rotate-45 -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-md bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 dark:border-white/5 transform -rotate-12 -z-10"></div>
    </div>
  );
};

// Animated particles background
const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Generate random particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full"
          style={{
            width: Math.random() * 8 + 2,
            height: Math.random() * 8 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

EcommerceImpact.displayName = "EcommerceImpact";

export default EcommerceImpact;
