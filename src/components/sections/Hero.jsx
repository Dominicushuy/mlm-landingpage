import React, { forwardRef, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  PlusCircle,
  ChevronDown,
  Star,
  Activity,
  Users,
  Clock,
  BarChart2,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Section } from "../layout/section";
import { Button } from "../ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "../ui/modal";
import { Input, FormItem, FormLabel } from "../ui/input";
import { useDrag } from "react-use-gesture";

const Hero = forwardRef(({ isVisible, scrollToSection, darkMode }, ref) => {
  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullText = "dành cho MLM";

  // Typing effect
  useEffect(() => {
    if (isTyping) {
      if (typedText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setTypedText(fullText.substring(0, typedText.length + 1));
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        // Wait for a moment when complete
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Reset to start typing again
      const timeout = setTimeout(() => {
        setTypedText("");
        setIsTyping(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [typedText, isTyping]);

  // Auto slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse position for 3D effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.98 },
  };

  // Carousel content
  const carouselItems = [
    {
      heading: "Tự động hóa chuyển đổi khách hàng",
      description:
        "Tăng 85% hiệu quả với hệ thống tự động xử lý từ lead đến khách hàng chuyển đổi",
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
    },
    {
      heading: "Quản lý hoa hồng thông minh",
      description:
        "Minh bạch hoàn toàn với hệ thống tính hoa hồng tự động theo thời gian thực",
      icon: <BarChart2 className="h-8 w-8 text-purple-500" />,
    },
    {
      heading: "Phân tích dữ liệu toàn diện",
      description:
        "Hệ thống BI tích hợp giúp đưa ra quyết định chiến lược dựa trên dữ liệu thực tế",
      icon: <Activity className="h-8 w-8 text-green-500" />,
    },
  ];

  // Xử lý swipe cho carousel
  const bindSwipe = useDrag(({ swipe: [swipeX] }) => {
    if (swipeX < 0) {
      // Swipe left, go to next slide
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    } else if (swipeX > 0) {
      // Swipe right, go to previous slide
      setCurrentSlide(
        (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
      );
    }
  });

  return (
    <Section
      id="intro"
      ref={(node) => {
        ref.current = node;
        heroRef.current = node;
      }}
      variant={darkMode ? "gradient" : "default"}
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Enhanced Background with Animated Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dynamic gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            darkMode ? "from-blue-900/10 to-gray-900" : "from-blue-50 to-white"
          } transition-colors duration-1000`}
        ></div>

        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNiIgc3Ryb2tlPSIjYmJjN2Q0IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-5"></div>

        {/* Floating circles */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: Math.random() * 0.5 + 0.3,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * -50, null],
                opacity: [null, Math.random() * 0.3 + 0.5, null],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute w-${Math.floor(Math.random() * 3) + 1} h-${
                Math.floor(Math.random() * 3) + 1
              } rounded-full ${darkMode ? "bg-blue-400/20" : "bg-blue-500/20"}`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-8 md:py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Main Content */}
          <motion.div
            className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left px-4"
            variants={itemVariants}
          >
            {/* Badge */}
            <motion.div
              className="inline-block mx-auto lg:mx-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/40 dark:to-purple-900/40 backdrop-blur-md border border-blue-200/50 dark:border-blue-700/30">
                <div className="relative flex">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </div>
                <span className="text-blue-800 dark:text-blue-300 text-xs md:text-sm font-medium">
                  Công nghệ Marketing Automation mới
                </span>
              </div>
            </motion.div>

            {/* Main Heading with Enhanced Typography and Adjusted Size for Mobile */}
            <motion.div
              variants={itemVariants}
              className="space-y-2 md:space-y-3"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold leading-tight">
                <span className="block text-blue-800 dark:text-blue-300">
                  Marketing
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                  Automation
                </span>
                <div className="flex items-center justify-center lg:justify-start">
                  <span className="inline-block">{typedText}</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block ml-1 w-1 h-6 md:h-10 bg-blue-600 dark:bg-blue-400"
                  />
                </div>
              </h1>
            </motion.div>

            {/* Description with Enhanced Typography and Smaller Text for Mobile */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-xl font-sans text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Chuyển đổi số và tự động hóa tiếp thị cho mô hình kinh doanh đa
              cấp trong kỷ nguyên thương mại điện tử.
            </motion.p>

            {/* Enhanced Feature List - Adjusted for Mobile */}
            <motion.div
              variants={itemVariants}
              className="space-y-3 md:space-y-4 pt-2 md:pt-4"
            >
              <EnhancedFeatureItem
                icon={<Clock className="h-4 w-4 md:h-5 md:w-5" />}
                text="Tăng hiệu quả hoạt động 85% tối ưu doanh thu"
                mobileOptimized={true}
              />
              <EnhancedFeatureItem
                icon={<Users className="h-4 w-4 md:h-5 md:w-5" />}
                text="Cá nhân hoá trải nghiệm khách hàng với AI"
                mobileOptimized={true}
              />
              <EnhancedFeatureItem
                icon={<Shield className="h-4 w-4 md:h-5 md:w-5" />}
                text="Tăng cường minh bạch và xây dựng niềm tin"
                mobileOptimized={true}
              />
            </motion.div>

            {/* CTA Buttons - Stack on Mobile, Side by Side on Desktop */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 justify-center lg:justify-start"
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative group w-full sm:w-auto"
              >
                {/* Animated glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-400 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-300 transform scale-105"></div>

                <Button
                  onClick={() => scrollToSection("invest")}
                  variant="default"
                  className="relative z-10 w-full sm:w-auto py-4 md:py-6 px-6 md:px-8 text-base md:text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white border-none shadow-xl"
                >
                  Giải pháp đầu tư
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={() => setShowDemo(!showDemo)}
                  variant="outline"
                  className="w-full sm:w-auto py-4 md:py-6 px-6 md:px-8 text-base md:text-lg font-medium backdrop-blur-sm border-2 border-blue-300/30 dark:border-blue-700/30 bg-white/10 hover:bg-white/20 text-blue-700 dark:text-blue-300 shadow-lg"
                >
                  Xem demo ngay
                  <PlusCircle className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Social proof or trust badges - Hide on smallest screens, show from SM up */}
            <motion.div
              variants={itemVariants}
              className="hidden sm:flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4 md:pt-8"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-${
                        300 - i * 50
                      } dark:bg-gray-${600 + i * 100}`}
                    ></div>
                  ))}
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">500+</span> khách hàng
                </div>
              </div>

              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 md:h-4 md:w-4 fill-current"
                  />
                ))}
                <span className="ml-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">4.9/5</span> đánh giá
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Carousel and Features - Hide on small screens when space is limited */}
          <motion.div
            className="lg:col-span-6 mt-8 lg:mt-0"
            variants={itemVariants}
          >
            {/* Responsive card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  transform: `perspective(1000px) rotateY(${
                    (mousePosition.x - 0.5) * 5
                  }deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)`,
                }}
                className="transition-all duration-300 ease-out bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 rounded-2xl p-1"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                  {/* Features Carousel - Simplified for mobile */}
                  <div className="relative overflow-hidden" {...bindSwipe()}>
                    <div className="p-4 sm:p-6 md:p-8">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center text-center space-y-3 md:space-y-4"
                        >
                          <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                            {carouselItems[currentSlide].icon}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                            {carouselItems[currentSlide].heading}
                          </h3>
                          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-xs md:max-w-none">
                            {carouselItems[currentSlide].description}
                          </p>
                        </motion.div>
                      </AnimatePresence>

                      {/* Swipeable indicator for mobile */}
                      <div className="flex justify-center space-x-2 mt-4 md:mt-6 touch-action-pan-y">
                        {carouselItems.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                              currentSlide === i
                                ? "bg-blue-600 dark:bg-blue-400 w-4 md:w-6"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Dashboard Preview - Simplified for mobile */}
                    <div className="border-t border-gray-100 dark:border-gray-700">
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 md:p-6">
                        <h4 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-3 md:mb-4">
                          Bảng điều khiển của bạn
                        </h4>

                        <div className="grid grid-cols-2 gap-2 md:gap-4">
                          {/* Responsive stat cards */}
                          {[
                            {
                              label: "Khách hàng mới",
                              value: "58",
                              trend: "+12%",
                            },
                            {
                              label: "Tỷ lệ chuyển đổi",
                              value: "42%",
                              trend: "+5%",
                            },
                          ].map((stat, i) => (
                            <div
                              key={i}
                              className="bg-white dark:bg-gray-800 p-2 md:p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                            >
                              <div className="text-2xs md:text-xs text-gray-500 dark:text-gray-400">
                                {stat.label}
                              </div>
                              <div className="flex items-end justify-between">
                                <div className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
                                  {stat.value}
                                </div>
                                <div className="text-2xs md:text-xs text-green-500 flex items-center">
                                  <TrendingUp className="h-2 w-2 md:h-3 md:w-3 mr-0.5 md:mr-1" />
                                  {stat.trend}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Simplified graph for mobile */}
                        <div className="mt-3 md:mt-4 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                              Hiệu suất Marketing
                            </div>
                            <div className="text-2xs md:text-xs text-gray-500 dark:text-gray-400">
                              30 ngày
                            </div>
                          </div>

                          {/* Mobile-friendly chart */}
                          <div className="h-12 md:h-20 flex items-end space-x-0.5 md:space-x-1">
                            {[...Array(8)].map((_, i) => {
                              const height = 30 + Math.random() * 70;
                              return (
                                <div
                                  key={i}
                                  className="flex-1 bg-gradient-to-t from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-sm"
                                  style={{ height: `${height}%` }}
                                ></div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Khám phá giải pháp
        </span>
        <motion.div
          className="w-8 h-14 border-2 border-gray-400 dark:border-gray-600 rounded-full p-1 flex justify-center"
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <motion.div
            className="w-1.5 h-3 bg-blue-500 dark:bg-blue-400 rounded-full"
            animate={{
              y: [0, 6, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Demo Modal */}
      <Modal open={showDemo} onClose={() => setShowDemo(false)} size="xl">
        <ModalContent>
          <ModalCloseButton onClick={() => setShowDemo(false)} />
          <ModalHeader>
            <ModalTitle className="text-2xl font-serif">
              Demo Marketing Automation
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Trải nghiệm ngay Marketing Automation
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Nhập email của bạn để nhận bản demo hoàn chỉnh về cách hoạt động
                của hệ thống Marketing Automation trong môi trường MLM. Bạn sẽ
                được trải nghiệm:
              </p>

              <ul className="mt-4 space-y-2">
                {[
                  "Quy trình tự động nuôi dưỡng khách hàng tiềm năng",
                  "Hệ thống quản lý hoa hồng tự động",
                  "Bảng điều khiển phân tích dữ liệu thông minh",
                  "Mô phỏng quản lý mạng lưới phân phối",
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <form className="space-y-5">
              <FormItem>
                <FormLabel htmlFor="fullname">Họ và tên</FormLabel>
                <Input type="text" id="fullname" placeholder="Nguyễn Văn A" />
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="email">Địa chỉ email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  placeholder="email@example.com"
                />
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="company">
                  Công ty (không bắt buộc)
                </FormLabel>
                <Input
                  type="text"
                  id="company"
                  placeholder="Tên công ty của bạn"
                />
              </FormItem>
            </form>
          </ModalBody>
          <ModalFooter>
            <motion.div
              className="w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="default"
                className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg"
              >
                Bắt đầu Demo Ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Section>
  );
});

const EnhancedFeatureItem = ({ text, icon, mobileOptimized = false }) => (
  <motion.div
    className={`flex items-center ${
      mobileOptimized ? "space-x-2 md:space-x-3" : "space-x-3"
    }`}
    whileHover={{ x: 5, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.98 }}
  >
    <div
      className={`flex-shrink-0 ${
        mobileOptimized ? "h-8 w-8 md:h-10 md:w-10" : "h-10 w-10"
      } flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-inner border border-blue-200/50 dark:border-blue-800/30 text-blue-600 dark:text-blue-400`}
    >
      {icon || (
        <Check
          className={mobileOptimized ? "h-4 w-4 md:h-5 md:w-5" : "h-5 w-5"}
        />
      )}
    </div>
    <p
      className={`${
        mobileOptimized ? "text-sm md:text-lg" : "text-lg"
      } font-medium text-gray-700 dark:text-gray-300`}
    >
      {text}
    </p>
  </motion.div>
);

Hero.displayName = "Hero";

export default Hero;
