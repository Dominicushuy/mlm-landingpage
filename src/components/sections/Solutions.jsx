import React, { forwardRef, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Users,
  Mail,
  DollarSign,
  BarChart2,
  ArrowRight,
  Zap,
  Shield,
  BarChart,
  ChevronRight,
} from "lucide-react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Grid, GridItem, Flex } from "../layout/container";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";
import { BarChart as BarChartComponent } from "../charts/chart-components";
import { automationBenefitsData } from "../../data/siteData";

const Solutions = forwardRef(({ isVisible }, ref) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
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

  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handleBenefitHover = (benefitId) => {
    setHoveredBenefit(benefitId);
  };

  const handleBenefitLeave = () => {
    setHoveredBenefit(null);
  };

  // Variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
    <Section
      id="solutions"
      ref={(node) => {
        ref.current = node;
        sectionRef.current = node;
      }}
      variant="gradientVertical"
      animation="fade-in"
      isVisible={isVisible}
      container
      className="relative overflow-hidden py-20"
    >
      {/* Background elements */}
      <BackgroundElements mousePosition={mousePosition} />

      <div className="relative z-10">
        <SectionHeader>
          <div className="inline-block mb-3">
            <div className="flex items-center space-x-2 mb-2 bg-purple-100/80 backdrop-blur-sm dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-4 py-1 rounded-full text-sm font-medium border border-purple-200/50 dark:border-purple-800/50">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span>Technology Solutions</span>
            </div>
          </div>
          <SectionSubtitle>Giải pháp</SectionSubtitle>
          <SectionTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            Marketing Automation cho MLM
          </SectionTitle>
          <SectionDescription>
            Các giải pháp công nghệ tự động hóa giúp nâng cao hiệu quả hoạt động
            và chuyển đổi số cho mô hình MLM
          </SectionDescription>
        </SectionHeader>

        <Grid cols={2} gap="lg" className="mt-16">
          <GridItem>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateY(${
                  (mousePosition.x - 0.5) * 2
                }deg) rotateX(${(mousePosition.y - 0.5) * -2}deg)`,
                transition: "transform 0.5s ease",
              }}
            >
              <Card
                variant="default"
                className="bg-gradient-to-br from-white/95 to-white/70 dark:from-gray-800/95 dark:to-gray-800/70 backdrop-blur-md shadow-xl border border-white/30 dark:border-gray-700/30 overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-400/10 to-purple-500/10 rounded-full blur-lg"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        Mức độ hiệu quả của Marketing Automation
                      </CardTitle>
                      <div className="p-2 rounded-full bg-purple-100/80 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        <BarChart className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="h-80 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-lg"></div>
                      <div className="relative z-10">
                        <BarChartComponent
                          data={automationBenefitsData}
                          bars={[
                            {
                              dataKey: "value",
                              name: "Hiệu quả (%)",
                              color: "#8b5cf6",
                            },
                          ]}
                          layout="vertical"
                        />
                      </div>
                    </div>

                    <EnhancedBenefitsList
                      onHover={handleBenefitHover}
                      onLeave={handleBenefitLeave}
                      activeId={hoveredBenefit}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </GridItem>

          <GridItem>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {[
                {
                  id: "crm",
                  icon: Users,
                  title: "Tự động hóa quản lý liên hệ và CRM",
                  description:
                    "Tích hợp hệ thống CRM giúp lưu trữ, phân loại và theo dõi thông tin khách hàng một cách khoa học. Tự động cập nhật các thông tin tương tác, giúp phân tích hành vi khách hàng để đưa ra các giải pháp tiếp thị cá nhân hoá.",
                  color: "purple",
                  tools: ["Salesforce", "HubSpot", "Zoho CRM"],
                },
                {
                  id: "email",
                  icon: Mail,
                  title: "Tự động hóa Email Marketing",
                  description:
                    "Sử dụng các công cụ như MailChimp, Marketo để tự động gửi email theo lịch trình, phân chia danh sách theo nhóm khách hàng nhằm gửi thông điệp phù hợp vào thời điểm thích hợp.",
                  color: "indigo",
                  tools: ["MailChimp", "Marketo", "SendGrid"],
                },
                {
                  id: "commission",
                  icon: DollarSign,
                  title: "Tự động hóa quản lý hoa hồng",
                  description:
                    "Các hệ thống tự động tính toán và phân phối hoa hồng dựa trên hiệu suất của mạng lưới phân phối, giảm thiểu sai sót và đảm bảo tính minh bạch.",
                  color: "blue",
                  tools: ["NetSuite", "SAP", "Custom Solutions"],
                },
                {
                  id: "bi",
                  icon: BarChart2,
                  title: "Tích hợp phân tích dữ liệu (BI)",
                  description:
                    "Sử dụng các nền tảng BI như Tableau, Sisense để theo dõi và phân tích dữ liệu kinh doanh theo thời gian thực, từ đó đưa ra các dự báo chính xác và hỗ trợ quyết định chiến lược.",
                  color: "pink",
                  tools: ["Tableau", "Power BI", "Sisense"],
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8"
            >
              <div className="p-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
                <div className="absolute inset-0 bg-black opacity-5"></div>

                <div className="relative z-10">
                  <Flex className="flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0 md:mr-6">
                      <h3 className="text-xl font-bold mb-2">
                        Bắt đầu với Marketing Automation
                      </h3>
                      <p className="text-white/80">
                        Giải pháp toàn diện cho doanh nghiệp MLM với chi phí tối
                        ưu
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="default"
                        className="px-6 py-3 bg-white text-indigo-700 hover:bg-white/90 shadow-md transform transition-transform"
                      >
                        Yêu cầu tư vấn
                        <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </Flex>
                </div>
              </div>
            </motion.div>
          </GridItem>
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16"
        >
          <div className="p-8 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl border border-white/30 dark:border-gray-700/30 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl"></div>

            <div className="relative z-10">
              <Flex className="items-center mb-6">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Xây dựng chiến lược chuyển đổi số hiệu quả
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Tận dụng sức mạnh của Marketing Automation để nâng cao hiệu
                    quả hoạt động MLM
                  </p>
                </div>
              </Flex>

              <Grid cols={3} gap="lg" className="mt-8">
                {[
                  {
                    title: "Đánh giá & Lập kế hoạch",
                    description:
                      "Phân tích nhu cầu và thiết lập lộ trình số hóa phù hợp với mô hình kinh doanh",
                    icon: <BarChart className="h-6 w-6" />,
                    color:
                      "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/30",
                    border: "border-indigo-200 dark:border-indigo-700/50",
                  },
                  {
                    title: "Triển khai hệ thống",
                    description:
                      "Thiết lập và tích hợp các giải pháp Marketing Automation với hệ thống hiện tại",
                    icon: <Zap className="h-6 w-6" />,
                    color:
                      "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30",
                    border: "border-purple-200 dark:border-purple-700/50",
                  },
                  {
                    title: "Tối ưu hóa & Mở rộng",
                    description:
                      "Liên tục cải thiện hiệu suất và mở rộng các tính năng dựa trên dữ liệu thực tế",
                    icon: <Shield className="h-6 w-6" />,
                    color:
                      "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/30",
                    border: "border-pink-200 dark:border-pink-700/50",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={`h-full ${step.color} border ${step.border} shadow-md transition-all duration-300`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-purple-600 dark:text-purple-400">
                            {step.icon}
                          </div>
                          <div className="ml-3 h-px flex-grow bg-gradient-to-r from-purple-300 to-transparent dark:from-purple-700"></div>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Grid>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="mt-10 p-5 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-100 dark:border-purple-800/30"
              >
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4 mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Đã sẵn sàng cho kỷ nguyên số hóa
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Giải pháp Marketing Automation của chúng tôi được thiết kế
                      đặc biệt cho mô hình MLM, tích hợp dễ dàng với hệ thống
                      hiện tại và có thể mở rộng theo nhu cầu phát triển của
                      doanh nghiệp. Đội ngũ chuyên gia sẽ đồng hành cùng bạn
                      trong suốt quá trình chuyển đổi số.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
});

// Enhanced Feature Card component with hover animation
const EnhancedFeatureCard = ({ feature, isActive, index }) => {
  const { id, icon: Icon, title, description, color, tools } = feature;

  // Colors mapping for different feature types
  const colorVariants = {
    purple: {
      bg: "bg-gradient-to-br from-purple-50 to-purple-100/80 dark:from-purple-900/20 dark:to-purple-900/30",
      border: "border-purple-200 dark:border-purple-800/50",
      shadow: "shadow-purple-500/10",
      text: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-500/90 dark:bg-purple-600/90",
      iconGlow: "shadow-glow-purple",
    },
    indigo: {
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100/80 dark:from-indigo-900/20 dark:to-indigo-900/30",
      border: "border-indigo-200 dark:border-indigo-800/50",
      shadow: "shadow-indigo-500/10",
      text: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-500/90 dark:bg-indigo-600/90",
      iconGlow: "shadow-glow-indigo",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/80 dark:from-blue-900/20 dark:to-blue-900/30",
      border: "border-blue-200 dark:border-blue-800/50",
      shadow: "shadow-blue-500/10",
      text: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/90 dark:bg-blue-600/90",
      iconGlow: "shadow-glow-blue",
    },
    pink: {
      bg: "bg-gradient-to-br from-pink-50 to-pink-100/80 dark:from-pink-900/20 dark:to-pink-900/30",
      border: "border-pink-200 dark:border-pink-800/50",
      shadow: "shadow-pink-500/10",
      text: "text-pink-600 dark:text-pink-400",
      iconBg: "bg-pink-500/90 dark:bg-pink-600/90",
      iconGlow: "shadow-glow-pink",
    },
  };

  const colors = colorVariants[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`
        relative rounded-xl overflow-hidden transition-all duration-300
        ${isActive ? "shadow-xl" : "shadow-md"} backdrop-blur-sm
      `}
    >
      {/* Gradient border effect */}
      <div
        className={`absolute inset-0 ${colors.bg} rounded-xl ${colors.border} border ${colors.shadow}`}
      ></div>

      {/* Subtle glow effect on hover */}
      <div
        className={`absolute inset-0 opacity-0 ${
          isActive ? "opacity-50" : "opacity-0"
        } 
        transition-opacity duration-300 ${colors.iconGlow} blur rounded-xl`}
      ></div>

      {/* Content area */}
      <div className="relative z-10 p-6 backdrop-blur-sm">
        <div className="flex items-start">
          <div
            className={`h-12 w-12 rounded-lg ${
              colors.iconBg
            } flex items-center justify-center text-white mr-4 ${
              isActive ? colors.iconGlow : ""
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {description}
            </p>

            {/* Tools section that appears on hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isActive ? 1 : 0,
                height: isActive ? "auto" : 0,
                marginTop: isActive ? 10 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                <span className={`text-sm ${colors.text} font-medium`}>
                  Công cụ:
                </span>
                {tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 ${colors.text} border ${colors.border}`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <ChevronRight
            className={`h-5 w-5 ${
              colors.text
            } transform transition-transform duration-300 ${
              isActive ? "translate-x-0" : "-translate-x-2"
            }`}
          />
        </div>

        {/* Bottom decorative line with hover animation */}
        <motion.div
          className={`h-0.5 w-full mt-4 ${colors.iconBg} rounded-full opacity-30`}
          initial={{ width: "30%" }}
          animate={{ width: isActive ? "100%" : "30%" }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

// Enhanced Benefits List with glassmorphism and animations
const EnhancedBenefitsList = ({ onHover, onLeave, activeId }) => {
  const benefits = [
    { id: "workload", text: "Giảm tải khối lượng công việc thủ công" },
    { id: "business", text: "Tăng hiệu quả kinh doanh và tính chính xác" },
    { id: "experience", text: "Cá nhân hoá trải nghiệm khách hàng" },
    { id: "transparency", text: "Tăng cường minh bạch trong quản lý hoa hồng" },
    { id: "data", text: "Hỗ trợ ra quyết định dựa trên dữ liệu thực tế" },
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-md p-6 mt-8 border border-white/30 dark:border-gray-700/30">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
        Lợi ích của Marketing Automation
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 w-full"></div>
      </h3>

      <ul className="space-y-3 mt-6">
        {benefits.map((benefit, index) => (
          <motion.li
            key={benefit.id}
            onMouseEnter={() => onHover(benefit.id)}
            onMouseLeave={onLeave}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
            className={`flex items-start p-2 rounded-lg transition-colors duration-300 ${
              activeId === benefit.id
                ? "bg-purple-50/80 dark:bg-purple-900/20"
                : ""
            }`}
          >
            <div
              className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                activeId === benefit.id
                  ? "bg-purple-500 text-white shadow-glow-purple"
                  : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              } mt-0.5 mr-3 transition-all duration-300`}
            >
              <Check className="h-3.5 w-3.5" />
            </div>
            <span
              className={`text-gray-700 dark:text-gray-300 ${
                activeId === benefit.id ? "font-medium" : ""
              }`}
            >
              {benefit.text}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

// Simplified background elements
const BackgroundElements = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div
        className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-purple-400/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-600/5 blur-3xl -z-10"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${
            (mousePosition.y - 0.5) * 20
          }px)`,
          transition: "transform 0.8s ease-out",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-indigo-400/10 to-pink-500/10 dark:from-indigo-500/5 dark:to-pink-600/5 blur-3xl -z-10"
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
          className="absolute bg-purple-500/5 dark:bg-purple-400/5 rounded-full -z-20"
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
            id="solutions-grid"
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
        <rect width="100%" height="100%" fill="url(#solutions-grid)" />
      </svg>
    </div>
  );
};

Solutions.displayName = "Solutions";

export default Solutions;
