import React, { forwardRef, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Check,
  DollarSign,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  X,
  BarChart2,
  Calendar,
  Lock,
  Shield,
  Download,
  ExternalLink,
  Zap,
  Star,
  Users,
} from "lucide-react";
import { pricingPlans } from "../../data/siteData";
import { cn } from "../../lib/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "../ui/modal";
import { Input } from "../ui/input";

/**
 * Enhanced Investment Section with modern UI/UX
 */
const Investment = forwardRef(({ isVisible }, ref) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showRoiCalculator, setShowRoiCalculator] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [businessSize, setBusinessSize] = useState(50);
  const [monthlyRevenue, setMonthlyRevenue] = useState(2000);
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

  // Toggle expanded FAQ
  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  // Handle plan selection
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  // Calculate estimated ROI
  const calculateRoi = () => {
    // Simple ROI calculation based on business size and monthly revenue
    const monthlyCost =
      businessSize < 30 ? 500 : businessSize < 100 ? 2000 : 5000;
    const expectedRevenue = monthlyRevenue * (1 + businessSize * 0.005);
    const roi = ((expectedRevenue - monthlyRevenue) / monthlyCost) * 100;

    return {
      monthlyCost,
      expectedRevenue: Math.round(expectedRevenue),
      roi: Math.round(roi),
    };
  };

  const roiResults = calculateRoi();

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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section
      id="invest"
      ref={(node) => {
        ref.current = node;
        sectionRef.current = node;
      }}
      variant="gradientPrimary"
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
            <div className="flex items-center space-x-2 mb-2 bg-blue-100/80 backdrop-blur-sm dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-800/50">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Investment Options</span>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionSubtitle variant="white">Cơ hội đầu tư</SectionSubtitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionTitle
              variant="white"
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-200 to-indigo-100"
            >
              Tham gia cùng chúng tôi
            </SectionTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SectionDescription
              variant="white"
              className="text-blue-100 max-w-3xl mx-auto"
            >
              Đầu tư vào tương lai của Marketing Automation trong ngành MLM tại
              Việt Nam với các giải pháp phù hợp cho mọi quy mô doanh nghiệp
            </SectionDescription>
          </motion.div>
        </SectionHeader>

        {/* Feature highlights before pricing */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: TrendingUp,
              title: "ROI cao",
              description:
                "Tỷ suất lợi nhuận trung bình 230% trong 12 tháng đầu tiên",
              color: "blue",
            },
            {
              icon: Calendar,
              title: "Triển khai nhanh",
              description:
                "Giải pháp hoạt động chỉ trong vòng 4-6 tuần từ khi ký hợp đồng",
              color: "indigo",
            },
            {
              icon: Shield,
              title: "Bảo mật tối đa",
              description:
                "Hệ thống đạt chứng nhận ISO 27001 với mã hóa end-to-end",
              color: "purple",
            },
          ].map((feature, idx) => (
            <FeatureCard
              key={idx}
              feature={feature}
              mousePosition={mousePosition}
            />
          ))}
        </motion.div>

        {/* Enhanced pricing plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="flex"
            >
              <EnhancedPricingCard
                plan={plan}
                onSelect={() => handleSelectPlan(plan)}
                mousePosition={mousePosition}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInVariants}
          className="flex flex-col md:flex-row gap-8 items-stretch mt-16"
        >
          {/* Testimonial section */}
          <div className="w-full md:w-1/2">
            <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 text-white overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="p-6 relative">
                  <div className="absolute top-4 right-4 text-6xl opacity-20 font-serif">
                    "
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-100 mt-6">
                    Khách hàng nói về chúng tôi
                  </h3>
                  <blockquote className="relative z-10">
                    <p className="text-lg italic mb-6 text-blue-50">
                      "Việc đầu tư vào Marketing Automation của MAMLM đã mang
                      lại tỷ suất lợi nhuận vượt xa mong đợi của chúng tôi. Chỉ
                      sau 3 tháng triển khai, chúng tôi đã thấy doanh thu tăng
                      35% và chi phí tiếp thị giảm 28%. Điều quan trọng nhất là
                      các nhà phân phối của chúng tôi đã có thể tập trung vào
                      việc xây dựng mối quan hệ thay vì các tác vụ hành chính."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                        NT
                      </div>
                      <div>
                        <p className="font-semibold text-white">Nguyễn Thành</p>
                        <p className="text-blue-200 text-sm">
                          CEO, TrueLife MLM Vietnam
                        </p>
                      </div>
                    </div>
                  </blockquote>
                </div>

                <div className="bg-gradient-to-r from-blue-600/30 to-indigo-600/30 p-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 text-yellow-300 fill-yellow-300"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-blue-100">
                      35 khách hàng đã đánh giá
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROI Calculator */}
          <div className="w-full md:w-1/2">
            <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 text-white overflow-hidden shadow-lg">
              <CardHeader className="p-6 border-b border-white/10">
                <CardTitle className="flex items-center text-xl font-semibold">
                  <BarChart2 className="h-5 w-5 mr-2 text-blue-300" />
                  <span>ROI Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-blue-200 mb-6">
                  Ước tính tiềm năng ROI với giải pháp Marketing Automation của
                  chúng tôi
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Số lượng nhà phân phối
                    </label>
                    <div className="mb-2">
                      <Input
                        type="range"
                        min="10"
                        max="500"
                        value={businessSize}
                        onChange={(e) =>
                          setBusinessSize(parseInt(e.target.value))
                        }
                        className="w-full accent-blue-400"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-blue-200">
                      <span>{businessSize} nhà phân phối</span>
                      <span>
                        {businessSize < 30
                          ? "Doanh nghiệp nhỏ"
                          : businessSize < 100
                          ? "Doanh nghiệp vừa"
                          : "Doanh nghiệp lớn"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Doanh thu hàng tháng (triệu VNĐ)
                    </label>
                    <div className="mb-2">
                      <Input
                        type="range"
                        min="500"
                        max="10000"
                        step="100"
                        value={monthlyRevenue}
                        onChange={(e) =>
                          setMonthlyRevenue(parseInt(e.target.value))
                        }
                        className="w-full accent-blue-400"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-blue-200">
                      <span>{monthlyRevenue.toLocaleString()} triệu VNĐ</span>
                      <span>
                        {monthlyRevenue < 1000
                          ? "Startup"
                          : monthlyRevenue < 5000
                          ? "SME"
                          : "Enterprise"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4 mt-6">
                    <h4 className="font-medium text-white mb-4">
                      Kết quả dự kiến:
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-xs text-blue-200">
                          Chi phí hàng tháng
                        </p>
                        <p className="text-xl font-bold text-white">
                          {roiResults.monthlyCost.toLocaleString()} tr
                        </p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-xs text-blue-200">
                          Doanh thu dự kiến
                        </p>
                        <p className="text-xl font-bold text-white">
                          {roiResults.expectedRevenue.toLocaleString()} tr
                        </p>
                      </div>
                      <div className="col-span-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-3 rounded-lg">
                        <p className="text-xs text-blue-200">ROI ước tính</p>
                        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
                          {roiResults.roi}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-white/5 border-t border-white/10">
                <Button
                  variant="default"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 border-0 hover:from-blue-600 hover:to-indigo-600"
                >
                  Yêu cầu báo giá chi tiết
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Câu hỏi thường gặp
            </h3>
            <p className="text-blue-100 max-w-3xl mx-auto">
              Giải đáp những thắc mắc phổ biến về đầu tư vào Marketing
              Automation
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
            {[
              {
                question: "Tôi cần đầu tư bao nhiêu để bắt đầu với MAMLM?",
                answer:
                  "Chi phí đầu tư ban đầu phụ thuộc vào quy mô doanh nghiệp và nhu cầu cụ thể. Gói Startup bắt đầu từ 500 triệu VNĐ, phù hợp cho các doanh nghiệp nhỏ muốn thử nghiệm Marketing Automation. Các gói Doanh nghiệp và Enterprise có chi phí cao hơn nhưng cung cấp nhiều tính năng nâng cao và khả năng tùy biến. Chúng tôi cũng cung cấp các lựa chọn thanh toán linh hoạt và sẵn sàng tạo gói tùy chỉnh phù hợp với ngân sách của bạn.",
              },
              {
                question:
                  "Mất bao lâu để thấy được ROI từ Marketing Automation?",
                answer:
                  "Hầu hết khách hàng của chúng tôi bắt đầu thấy kết quả tích cực trong vòng 3-6 tháng đầu tiên. Tuy nhiên, ROI đầy đủ thường được thấy sau 6-12 tháng khi các quy trình tự động hóa đã được tối ưu hóa và nhân viên đã hoàn toàn thích nghi với nền tảng. Dựa trên dữ liệu từ khách hàng hiện tại, ROI trung bình là 230% trong năm đầu tiên, với một số trường hợp đạt tới 400% tùy thuộc vào mức độ áp dụng và tích hợp.",
              },
              {
                question:
                  "Giải pháp của bạn có thể mở rộng theo nhu cầu phát triển của doanh nghiệp không?",
                answer:
                  "Có, tất cả các giải pháp của chúng tôi được thiết kế với khả năng mở rộng. Nền tảng MAMLM được xây dựng trên kiến trúc microservices, cho phép mở rộng dễ dàng khi doanh nghiệp của bạn phát triển. Bạn có thể bắt đầu với một gói nhỏ hơn và nâng cấp theo thời gian, chỉ trả tiền cho các tính năng và công suất bạn cần. Chúng tôi cũng cung cấp các API mở cho phép tích hợp với các hệ thống hiện có hoặc mới khi doanh nghiệp của bạn phát triển.",
              },
              {
                question:
                  "MAMLM khác biệt gì so với các giải pháp Marketing Automation khác trên thị trường?",
                answer:
                  "MAMLM khác biệt nhờ tập trung đặc biệt vào mô hình kinh doanh MLM. Trong khi nhiều giải pháp Marketing Automation chung chung chỉ tập trung vào các chiến dịch email và lead nurturing, MAMLM được xây dựng từ đầu để hỗ trợ các cấu trúc mạng lưới đa cấp phức tạp, quản lý hoa hồng, và phân tích hiệu suất nhà phân phối. Nền tảng của chúng tôi cũng được thiết kế riêng cho thị trường Việt Nam, với hỗ trợ đa ngôn ngữ đầy đủ, tích hợp với các kênh phổ biến tại Việt Nam như Zalo, và tuân thủ các quy định địa phương.",
              },
              {
                question:
                  "Doanh nghiệp tôi cần chuẩn bị những gì trước khi triển khai Marketing Automation?",
                answer:
                  "Để triển khai hiệu quả, chúng tôi khuyến nghị doanh nghiệp chuẩn bị: 1) Dữ liệu khách hàng và nhà phân phối sạch và có cấu trúc, 2) Xác định rõ các mục tiêu kinh doanh và KPI, 3) Có sự cam kết từ lãnh đạo và các bên liên quan chính, 4) Chuẩn bị nguồn lực cho đào tạo và quản lý thay đổi. Đội ngũ của chúng tôi sẽ hỗ trợ bạn trong quá trình chuẩn bị này và cung cấp các template để thuận tiện cho việc thu thập và chuẩn bị dữ liệu.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`border-b border-white/10 last:border-b-0 transition-colors ${
                  expandedFaq === index ? "bg-white/5" : ""
                }`}
              >
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <h4 className="font-medium text-white pr-8">
                    {faq.question}
                  </h4>
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center bg-white/10 text-white transition-transform ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-blue-100">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA section */}
        <motion.div variants={itemVariants} className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Sẵn sàng đầu tư vào tương lai của Marketing Automation?
          </h3>
          <p className="mb-8 text-xl text-blue-100 max-w-3xl mx-auto">
            Chúng tôi đang tìm kiếm các đối tác chiến lược để cùng xây dựng
            tương lai của Marketing Automation trong lĩnh vực MLM tại Việt Nam.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="default"
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border-none shadow-lg text-white"
              >
                Liên hệ đội ngũ đầu tư
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 border-white/30 text-white bg-transparent hover:bg-white/10"
              >
                Tải xuống hồ sơ công ty
                <Download className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Plan Details Modal */}
      <Modal open={selectedPlan !== null} onClose={() => setSelectedPlan(null)}>
        <ModalContent className="max-w-3xl">
          <ModalCloseButton onClick={() => setSelectedPlan(null)} />
          <ModalHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
            <ModalTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              {selectedPlan?.name}
            </ModalTitle>
          </ModalHeader>
          <ModalBody className="py-6">
            {selectedPlan && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedPlan.price}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {selectedPlan.name === "Gói Enterprise"
                        ? "Tùy chỉnh theo nhu cầu"
                        : "Thanh toán hàng năm"}
                    </p>
                  </div>
                  {selectedPlan.popular && (
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                      Phổ biến nhất
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Tính năng bao gồm:
                    </h4>
                    <div className="grid gap-3">
                      {selectedPlan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mt-0.5 mr-3">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Chi tiết bổ sung:
                    </h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30">
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                          Thời gian triển khai
                        </h5>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {selectedPlan.name === "Gói Startup"
                            ? "2-4 tuần"
                            : selectedPlan.name === "Gói Doanh nghiệp"
                            ? "4-6 tuần"
                            : "8-12 tuần"}
                        </p>
                      </div>
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                          Hỗ trợ kỹ thuật
                        </h5>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {selectedPlan.name === "Gói Startup"
                            ? "Email và chat, 8/5"
                            : selectedPlan.name === "Gói Doanh nghiệp"
                            ? "Email, chat và điện thoại, 12/5"
                            : "Email, chat và điện thoại 24/7, kèm người quản lý tài khoản chuyên biệt"}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                          Số người dùng
                        </h5>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {selectedPlan.name === "Gói Startup"
                            ? "Tối đa 10 người dùng"
                            : selectedPlan.name === "Gói Doanh nghiệp"
                            ? "Tối đa 50 người dùng"
                            : "Không giới hạn"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={() => setSelectedPlan(null)}
              className="border-gray-200 dark:border-gray-700"
            >
              Đóng
            </Button>
            <Button
              variant="default"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none"
            >
              {selectedPlan?.buttonText || "Liên hệ ngay"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Section>
  );
});

// Feature Card Component
const FeatureCard = ({ feature, mousePosition }) => {
  const { icon: Icon, title, description, color } = feature;

  const colorVariants = {
    blue: "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500",
    indigo:
      "from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500",
    purple:
      "from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500",
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateY(${
          (mousePosition.x - 0.5) * 3
        }deg) rotateX(${(mousePosition.y - 0.5) * -3}deg)`,
        transition: "transform 0.3s ease",
      }}
      className="h-full"
    >
      <Card className="h-full border-white/20 backdrop-blur-md bg-white/10 text-white shadow-lg">
        <CardContent className="p-6">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorVariants[color]} flex items-center justify-center text-white mb-4 shadow-lg`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-blue-100">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Enhanced Pricing Card Component
const EnhancedPricingCard = ({ plan, onSelect, mousePosition }) => {
  const { name, price, popular, features, buttonText, buttonVariant } = plan;

  return (
    <motion.div
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateY(${
          (mousePosition.x - 0.5) * 3
        }deg) rotateX(${(mousePosition.y - 0.5) * -3}deg)`,
        transition: "transform 0.3s ease",
      }}
      className="w-full h-full relative"
    >
      <Card
        variant="default"
        className={cn(
          "bg-white text-gray-900 dark:bg-gray-800 dark:text-white rounded-xl shadow-xl overflow-hidden h-full border border-white/30 backdrop-blur-sm",
          popular
            ? "bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20"
            : ""
        )}
      >
        {popular && (
          <div className="absolute -right-12 top-6 transform rotate-45 bg-blue-600 text-white py-1 px-12 text-sm font-medium z-10">
            Phổ biến nhất
          </div>
        )}
        <CardContent className="p-0">
          <div className="p-6 pb-0">
            <div
              className={`w-full h-1 ${
                popular
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gray-200 dark:bg-gray-700"
              } mb-6`}
            ></div>
            <h3
              className={`text-2xl font-bold mb-2 ${
                popular
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {name}
            </h3>
            <div className="flex items-baseline mt-3 mb-6">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {price}
              </p>
              {price !== "Liên hệ" && (
                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  /năm
                </p>
              )}
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check
                    className={`h-5 w-5 ${
                      popular
                        ? "text-blue-500 dark:text-blue-400"
                        : "text-green-500 dark:text-green-400"
                    } mt-0.5 mr-2 flex-shrink-0`}
                  />
                  <span
                    className={`text-gray-600 dark:text-gray-300 ${
                      popular ? "font-medium" : ""
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto p-6 pt-0">
            <Button
              variant={buttonVariant === "solid" ? "default" : "outline"}
              className={cn(
                "w-full",
                buttonVariant === "solid"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none"
                  : "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              )}
              onClick={onSelect}
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Background Elements with parallax effect
const BackgroundElements = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div
        className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-3xl"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${
            (mousePosition.y - 0.5) * 20
          }px)`,
          transition: "transform 0.8s ease-out",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${
            (mousePosition.y - 0.5) * -20
          }px)`,
          transition: "transform 0.8s ease-out",
        }}
      ></div>

      {/* Subtle decorative particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-blue-300 rounded-full opacity-20"
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
        className="absolute inset-0 opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="investment-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 10 L 40 10 M 10 0 L 10 40"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#investment-grid)" />
      </svg>
    </div>
  );
};

Investment.displayName = "Investment";

export default Investment;
