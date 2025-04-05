import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Database,
  BarChart2,
  Lock,
  Smartphone,
  Zap,
  ArrowRight,
  ExternalLink,
  Calendar,
  TrendingUp,
  TrendingDown,
  Mail,
  Filter,
  Users,
  ChevronRight,
  Download,
  Play,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Grid, GridItem, Flex } from "../layout/container";

const AmwayDetailCaseStudy = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("tech");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  // Tính năng tích hợp công nghệ
  const techFeatures = [
    {
      id: "crm",
      title: "Tích hợp CRM",
      icon: Database,
      description:
        "Quản lý khách hàng và theo dõi mạng lưới phân phối nâng cao",
      stats: { effectiveness: 86, adoption: 78, roi: 92 },
    },
    {
      id: "mobile",
      title: "Ứng dụng di động",
      icon: Smartphone,
      description: "Đặt hàng và quản lý mạng lưới liền mạch mọi lúc mọi nơi",
      stats: { effectiveness: 91, adoption: 85, roi: 88 },
    },
    {
      id: "blockchain",
      title: "Công nghệ Blockchain",
      icon: Lock,
      description: "Tăng cường minh bạch trong giao dịch và tiền hoa hồng",
      stats: { effectiveness: 79, adoption: 62, roi: 74 },
    },
    {
      id: "analytics",
      title: "Phân tích nâng cao",
      icon: BarChart2,
      description:
        "Thông tin chi tiết dựa trên dữ liệu để tối ưu hóa hiệu suất",
      stats: { effectiveness: 94, adoption: 76, roi: 89 },
    },
  ];

  // Tính năng CRM
  const crmFeatures = [
    {
      id: "automation",
      title: "Tự động hóa Marketing",
      icon: Zap,
      description: "Thực hiện chiến dịch tự động qua nhiều kênh",
      color: "blue",
    },
    {
      id: "email",
      title: "Chiến dịch Email",
      icon: Mail,
      description:
        "Chiến dịch nhỏ giọt được cá nhân hóa để nuôi dưỡng khách hàng",
      color: "indigo",
    },
    {
      id: "segmentation",
      title: "Phân khúc khách hàng",
      icon: Filter,
      description:
        "Nhắm mục tiêu đối tượng nâng cao dựa trên hành vi & nhân khẩu học",
      color: "purple",
    },
    {
      id: "network",
      title: "Quản lý mạng lưới",
      icon: Users,
      description: "Theo dõi mối quan hệ và hiệu suất phân phối toàn diện",
      color: "pink",
    },
  ];

  // Tích hợp phân tích dữ liệu
  const dataPoints = [
    {
      id: "sales",
      title: "Hiệu suất bán hàng",
      value: "$7.7B",
      change: "-4.9%",
      prediction: "Dự báo sẽ ổn định vào năm 2026",
      color: "blue",
    },
    {
      id: "retention",
      title: "Giữ chân khách hàng",
      value: "68%",
      change: "+2.3%",
      prediction: "Tiếp tục cải thiện với cá nhân hóa",
      color: "green",
    },
    {
      id: "growth",
      title: "Tăng trưởng nhà phân phối",
      value: "2.4M",
      change: "-1.8%",
      prediction: "Dự kiến tăng với chuyển đổi số",
      color: "purple",
    },
    {
      id: "engagement",
      title: "Tương tác kỹ thuật số",
      value: "43%",
      change: "+15.6%",
      prediction: "Tăng trưởng nhanh khi mở rộng sáng kiến kỹ thuật số",
      color: "orange",
    },
  ];

  // Dữ liệu xu hướng tương lai
  const futureImpact = [
    {
      id: "ai",
      trend: "AI & Machine Learning",
      impact: 9.2,
      readiness: 6.8,
      timeframe: "1-2 năm",
    },
    {
      id: "vr",
      trend: "Trải nghiệm bán hàng ảo",
      impact: 8.7,
      readiness: 7.2,
      timeframe: "Hiện tại",
    },
    {
      id: "blockchain",
      trend: "Tích hợp Blockchain",
      impact: 7.9,
      readiness: 5.4,
      timeframe: "2-3 năm",
    },
    {
      id: "personalize",
      trend: "Cá nhân hóa quy mô lớn",
      impact: 9.5,
      readiness: 7.8,
      timeframe: "Hiện tại",
    },
    {
      id: "ar",
      trend: "Demo sản phẩm thực tế ảo tăng cường",
      impact: 8.3,
      readiness: 6.1,
      timeframe: "1-2 năm",
    },
  ];

  // Các mục FAQ
  const faqs = [
    {
      id: "commission",
      question:
        "Amway quản lý hoa hồng nhà phân phối thông qua công nghệ như thế nào?",
      answer:
        "Amway sử dụng hệ thống hoa hồng dựa trên blockchain tích hợp tự động tính toán và phân phối thu nhập dựa trên dữ liệu bán hàng và hiệu suất mạng lưới. Hệ thống này cung cấp tính minh bạch theo thời gian thực, cho phép nhà phân phối theo dõi thu nhập của họ thông qua ứng dụng di động và bảng điều khiển web. Công nghệ này đã giảm thời gian xử lý hoa hồng 74% trong khi tăng độ chính xác lên 99,8%.",
    },
    {
      id: "crm-roi",
      question: "Tính năng CRM nào đã mang lại ROI cao nhất cho Amway?",
      answer:
        "Các tính năng CRM có ROI cao nhất của Amway bao gồm điều phối hành trình khách hàng được cá nhân hóa (ROI 215%), phân tích dự đoán cho đề xuất mua hàng (ROI 187%), và quản lý chiến dịch đa kênh tự động (ROI 163%). Những tính năng này đã cải thiện đáng kể tỷ lệ giữ chân khách hàng và tăng giá trị đơn hàng trung bình bằng cách tạo ra trải nghiệm liền mạch, được cá nhân hóa trên tất cả các điểm tiếp xúc.",
    },
    {
      id: "big-data",
      question:
        "Big Data analytics đang chuyển đổi hoạt động MLM của Amway như thế nào?",
      answer:
        "Phân tích Big Data đã cách mạng hóa hoạt động của Amway bằng cách cho phép dự đoán nhu cầu (giảm chi phí tồn kho 23%), xác định nhà phân phối tiềm năng cao thông qua nhận dạng mẫu hành vi, tối ưu hóa phát triển sản phẩm thông qua phân tích phản hồi của khách hàng, và tạo chiến lược đặc thù cho từng vùng dựa trên dữ liệu hiệu suất khu vực. Những hiểu biết này đã chuyển đổi việc ra quyết định từ phản ứng sang chủ động.",
    },
    {
      id: "security",
      question: "Biện pháp bảo mật nào bảo vệ hệ thống kỹ thuật số của Amway?",
      answer:
        "Amway triển khai bảo mật cấp doanh nghiệp thông qua bảo vệ nhiều lớp bao gồm mã hóa end-to-end cho tất cả giao dịch, xác thực đa yếu tố để truy cập hệ thống, kiểm tra thâm nhập thường xuyên và kiểm toán bảo mật, hệ thống phát hiện mối đe dọa nâng cao, và tuân thủ nghiêm ngặt các quy định bảo vệ dữ liệu quốc tế bao gồm GDPR. Cơ sở hạ tầng bảo mật của họ được cập nhật liên tục để giải quyết các mối đe dọa mới nổi.",
    },
    {
      id: "emerging-tech",
      question: "Những công nghệ mới nổi nào sẽ định hình tương lai của Amway?",
      answer:
        "Các công nghệ chính định hình tương lai của Amway bao gồm công cụ cá nhân hóa AI điều chỉnh đề xuất ở cấp độ cá nhân, trình diễn sản phẩm thực tế ảo tăng cường cho phép thử nghiệm sản phẩm ảo, xác thực sản phẩm dựa trên blockchain để chống hàng giả, tích hợp thương mại giọng nói để đặt hàng không ma sát, và sản phẩm hỗ trợ IoT nâng cao trải nghiệm khách hàng trong khi tạo ra dữ liệu sử dụng có giá trị để cải tiến liên tục.",
    },
  ];

  // Dữ liệu dòng thời gian
  const timeline = [
    {
      id: "2018",
      year: 2018,
      event: "Khởi động Sáng kiến Chuyển đổi Số",
      description: "Cải tổ toàn diện hệ thống cũ",
    },
    {
      id: "2019",
      year: 2019,
      event: "Triển khai CRM Toàn cầu",
      description: "Thống nhất dữ liệu khách hàng trên 100+ thị trường",
    },
    {
      id: "2020",
      year: 2020,
      event: "Ra mắt lại ứng dụng di động",
      description: "Nâng cao công cụ nhà phân phối và giao diện khách hàng",
    },
    {
      id: "2021",
      year: 2021,
      event: "Nền tảng phân tích nâng cao",
      description: "Thông tin dự đoán cho nhà phân phối và quản lý",
    },
    {
      id: "2022",
      year: 2022,
      event: "Chương trình thử nghiệm Blockchain",
      description: "Cấu trúc hoa hồng và thanh toán minh bạch",
    },
    {
      id: "2023",
      year: 2023,
      event: "Tự động hóa marketing AI",
      description: "Chiến dịch cá nhân hóa quy mô lớn với học máy",
    },
    {
      id: "2024",
      year: 2024,
      event: "Trải nghiệm sản phẩm AR thực tế ảo",
      description: "Trình diễn sản phẩm và đào tạo ảo",
    },
    {
      id: "2025",
      year: 2025,
      event: "Dự kiến: Tích hợp kỹ thuật số hoàn chỉnh",
      description: "Hiện diện và hoạt động đa kênh liền mạch",
    },
  ];

  // Dữ liệu thống kê với id duy nhất
  const statsData = [
    {
      id: "revenue",
      label: "Doanh thu hàng năm",
      value: "$7.7B",
      change: "-4.9%",
      icon: <DollarSign className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
      description: "Năm tài chính 2023",
    },
    {
      id: "digital",
      label: "Tương tác kỹ thuật số",
      value: "43%",
      change: "+15.6%",
      icon: (
        <Smartphone className="h-5 w-5 text-purple-500 dark:text-purple-400" />
      ),
      description: "Đơn hàng qua kênh kỹ thuật số",
    },
    {
      id: "distributors",
      label: "Nhà phân phối hoạt động",
      value: "2.4M",
      change: "-1.8%",
      icon: <Users className="h-5 w-5 text-green-500 dark:text-green-400" />,
      description: "Trên 100+ thị trường",
    },
    {
      id: "investment",
      label: "Đầu tư công nghệ",
      value: "$380M",
      change: "+24.2%",
      icon: <Zap className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
      description: "Chi tiêu cơ sở hạ tầng kỹ thuật số",
    },
  ];

  // Tiến trình cuộn
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const windowScroll = scrollTop;
      const containerRect = containerRef.current.getBoundingClientRect();

      // Chỉ cập nhật nếu phần tử đang trong tầm nhìn
      if (containerRect.top < clientHeight && containerRect.bottom > 0) {
        const scrolled =
          (windowScroll - (containerRect.top + windowScroll - clientHeight)) /
          (containerRect.height + clientHeight);
        setScrollProgress(Math.min(Math.max(scrolled, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theo dõi vị trí chuột cho hiệu ứng 3D
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Bật/tắt mở rộng FAQ
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Xử lý thay đổi tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      id="amway-detail"
      ref={containerRef}
      className="relative overflow-hidden"
    >
      {/* Chỉ báo tiến độ */}
      <div className="fixed top-1/2 right-6 w-1 h-64 bg-gray-200 dark:bg-gray-700 rounded-full transform -translate-y-1/2 z-50 hidden lg:block">
        <div
          className="w-1 bg-blue-500 dark:bg-blue-400 rounded-full"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Phần Hero */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        {/* Phần tử nền */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-800 via-indigo-900 to-purple-900 overflow-hidden">
          {/* Lớp phủ mẫu lưới */}
          <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 opacity-10"
          >
            <defs>
              <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>

          {/* Quả cầu phát sáng */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 filter blur-[100px] opacity-20"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-indigo-500 filter blur-[120px] opacity-20"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-purple-500 filter blur-[80px] opacity-15"></div>
        </div>

        {/* Nội dung */}
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-sm font-medium mb-4">
              Phân tích tình huống
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Amway<span className="text-blue-300">:</span> Chuyển đổi số
              <br />
              trong
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                {" "}
                tiếp thị mạng lưới
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-blue-100 mb-8">
              Phân tích sâu về cách Amway tích hợp công nghệ, tự động hóa và
              phân tích dữ liệu để cách mạng hóa mô hình kinh doanh MLM
            </p>
            <div className="mt-8">
              <Button
                onClick={() => {
                  const element = document.getElementById("study-content");
                  element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-indigo-700 hover:bg-blue-50 px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg"
              >
                Khám phá nghiên cứu
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chỉ báo cuộn */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 flex flex-col items-center">
          <p className="text-sm mb-2">Cuộn để khám phá</p>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>

      {/* Nội dung chính */}
      <section
        id="study-content"
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/10"
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Giới thiệu & Chỉ số hiệu suất chính */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4">
                  Tóm tắt dành cho lãnh đạo
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Hành trình chuyển đổi số
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Amway, công ty hàng đầu trong lĩnh vực bán hàng trực tiếp với
                  doanh thu hàng năm 7,7 tỷ đô la, đã bắt đầu quá trình chuyển
                  đổi số toàn diện để hiện đại hóa mô hình kinh doanh MLM.
                  Nghiên cứu tình huống này xem xét cách tích hợp công nghệ, tự
                  động hóa tiếp thị và phân tích dữ liệu đã định hình lại cách
                  tiếp cận của công ty đối với việc quản lý nhà phân phối và
                  tương tác với khách hàng.
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <Button
                    variant="outline"
                    className="rounded-full flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
                  >
                    <Download className="h-4 w-4" />
                    Tải báo cáo đầy đủ
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-full flex items-center gap-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Truy cập cổng Amway Digital
                  </Button>
                </div>
              </div>

              <div className="md:w-1/2 rounded-xl overflow-hidden relative">
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-indigo-600/20 dark:from-blue-600/20 dark:to-indigo-800/20 flex items-center justify-center relative overflow-hidden rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                  {/* Thay thế hình ảnh bằng gradient và icon */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40 flex flex-col items-center justify-center p-4 text-center">
                    <div className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">
                      Video chuyển đổi số Amway
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      Khám phá cách Amway ứng dụng công nghệ hiện đại vào mô
                      hình MLM
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-md">
                        Digital Transformation
                      </span>
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs rounded-md">
                        MLM
                      </span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-xs rounded-md">
                        CRM
                      </span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg cursor-pointer"
                  >
                    <Play className="h-8 w-8 text-blue-600 ml-1" />
                  </motion.div>

                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-white text-sm">
                    4:26
                  </div>
                </div>
              </div>
            </div>

            {/* Lưới thống kê chính */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {statsData.map((stat) => (
                <motion.div
                  key={stat.id}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                      {stat.icon}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        stat.change.startsWith("+")
                          ? "text-green-500 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      } flex items-center`}
                    >
                      {stat.change.startsWith("+") ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </h3>
                  <div className="mt-1">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {stat.label}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dòng thời gian chuyển đổi số */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 text-sm font-medium mb-4">
                Hành trình chuyển đổi
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dòng thời gian phát triển số của Amway
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Theo dõi các cột mốc quan trọng trong quá trình chuyển đổi của
                Amway từ MLM truyền thống sang mô hình kinh doanh công nghệ
              </p>
            </div>

            <div className="relative">
              {/* Đường dòng thời gian chính */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-800/50 rounded-full"></div>

              <div className="relative">
                {timeline.map((item, index) => (
                  <div
                    key={`timeline-${item.id}`}
                    className={`relative z-10 flex items-center justify-center mb-12 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Nội dung dòng thời gian */}
                    <div className="w-full md:w-5/12 px-4">
                      <div
                        className={`p-6 rounded-xl shadow-md h-full
                        ${
                          index % 2 === 0
                            ? "md:translate-x-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                            : "md:-translate-x-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                        } border border-gray-100 dark:border-gray-700/50`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center
                            ${
                              index % 2 === 0
                                ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300"
                                : "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300"
                            }`}
                          >
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {item.year}
                          </div>
                          {item.year <= 2023 && (
                            <div className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 px-2 py-0.5 rounded-full text-xs">
                              Hoàn thành
                            </div>
                          )}
                          {item.year > 2023 && (
                            <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs">
                              Dự kiến
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {item.event}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Điểm trung tâm */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div
                        className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center z-10
                        ${
                          index % 2 === 0
                            ? "bg-blue-500 dark:bg-blue-400"
                            : "bg-purple-500 dark:bg-purple-400"
                        }`}
                      >
                        <span className="text-white text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Không gian trống ở phía bên kia để cân bằng */}
                    <div className="w-full md:w-5/12 px-4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phần tab tương tác */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-4">
                Phân tích chuyển đổi số
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tích hợp công nghệ & chiến lược
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Khám phá các trụ cột công nghệ trong chiến lược chuyển đổi số
                của Amway
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-1 bg-gray-100 dark:bg-gray-700">
                <Tabs
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 bg-transparent">
                    <TabsTrigger
                      value="tech"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                    >
                      <Database className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">
                        Tích hợp công nghệ
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="crm"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                    >
                      <Users className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">CRM & Marketing</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="data"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                    >
                      <BarChart2 className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">
                        Phân tích dữ liệu
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="trends"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                    >
                      <Zap className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">
                        Xu hướng tương lai
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Nội dung tab */}
              <div className="p-6 md:p-8">
                <div>
                  {activeTab === "tech" && (
                    <TechnologyIntegrationTab techFeatures={techFeatures} />
                  )}
                  {activeTab === "crm" && (
                    <CrmMarketingTab crmFeatures={crmFeatures} />
                  )}
                  {activeTab === "data" && (
                    <DataAnalyticsTab dataPoints={dataPoints} />
                  )}
                  {activeTab === "trends" && (
                    <FutureTrendsTab futureImpact={futureImpact} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Phần nghiên cứu tình huống */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 text-sm font-medium mb-4">
                Câu chuyện thành công
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tác động thực tế
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Xem xét kết quả của các sáng kiến chuyển đổi số của Amway trên
                các thị trường
              </p>
            </div>

            <div className="space-y-12">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl overflow-hidden shadow-xl border border-blue-100 dark:border-blue-800/30">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div className="col-span-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900">
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Smartphone className="w-32 h-32 text-white" />
                      </div>
                      <div className="h-full w-full p-8 flex flex-col items-center justify-center">
                        <div className="text-white/60 text-center mb-4">
                          <Users className="w-12 h-12 mx-auto mb-2" />
                          <div className="text-sm">
                            Chuyển đổi số châu Á Thái Bình Dương
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-800/90 via-blue-700/60 to-transparent"></div>
                    <div className="relative p-6 md:p-8 flex h-full">
                      <div className="mt-auto">
                        <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm inline-block mb-4">
                          Nghiên cứu #1
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          Chuyển đổi thị trường châu Á Thái Bình Dương
                        </h3>
                        <div className="flex items-center text-blue-100 mb-4">
                          <Users className="h-5 w-5 mr-2" />
                          <span>12.4 triệu khách hàng trên 8 thị trường</span>
                        </div>
                        <div className="flex space-x-3 mt-4">
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                            Di động là ưu tiên
                          </span>
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                            Thương mại xã hội
                          </span>
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                            Tích hợp WeChat
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 p-6 md:p-8">
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                            Tăng trưởng doanh thu
                          </p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            +16.8%
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                            Đơn hàng di động
                          </p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            74%
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                            Tương tác kỹ thuật số
                          </p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            4.7M
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          Thách thức
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Amway phải đối mặt với sự sụt giảm về mức độ tương tác
                          ở khu vực châu Á Thái Bình Dương, với các phương pháp
                          MLM truyền thống không còn phù hợp với người tiêu dùng
                          am hiểu công nghệ thuộc thế hệ Millennials và Gen Z.
                          Tỷ lệ sử dụng di động cao, nhưng hệ thống của Amway
                          chủ yếu tập trung vào máy tính để bàn.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          Giải pháp
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Công ty triển khai chiến lược ưu tiên di động với khả
                          năng thương mại xã hội tích hợp, cho phép nhà phân
                          phối chia sẻ và bán sản phẩm trực tiếp thông qua các
                          nền tảng phổ biến như WeChat và LINE. Các sáng kiến
                          chính bao gồm:
                        </p>
                        <ul className="space-y-2 mb-4">
                          {[
                            "Tích hợp Mini-Program WeChat để duyệt và mua sản phẩm mượt mà",
                            "Tự động hóa chia sẻ xã hội với liên kết liên kết cá nhân hóa",
                            "Trải nghiệm sản phẩm AR di động để dùng thử ảo trước khi mua",
                            "Đào tạo nhà phân phối và tương tác khách hàng dạng game hóa",
                          ].map((item, i) => (
                            <li
                              key={`case1-item-${i}`}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          Kết quả
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Trong vòng 18 tháng, Amway APAC đạt mức tăng trưởng
                          doanh thu 16,8%, với 74% đơn đặt hàng đến từ các kênh
                          di động. Chi phí thu hút nhà phân phối giảm 42%, trong
                          khi độ tuổi trung bình của nhà phân phối giảm từ 47
                          xuống 39 tuổi.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl overflow-hidden shadow-xl border border-purple-100 dark:border-purple-800/30">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div className="col-span-3 p-6 md:p-8 order-2 lg:order-1">
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                            ROI tự động hóa
                          </p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            314%
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                            Tăng năng suất
                          </p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            +42%
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                            Độ chính xác hoa hồng
                          </p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            99.8%
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          Thách thức
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Hoạt động châu Âu của Amway gặp khó khăn với các quy
                          trình thủ công kém hiệu quả trong tính toán hoa hồng,
                          đăng ký nhà phân phối và quản lý tuân thủ. Điều này
                          gây ra sự chậm trễ, lỗi và sự không hài lòng của nhà
                          phân phối.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          Giải pháp
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Amway đã phát triển nền tảng tự động hóa tích hợp có
                          tên "AmwayNext" đã cách mạng hóa hoạt động thông qua:
                        </p>
                        <ul className="space-y-2 mb-4">
                          {[
                            "Tính toán hoa hồng dựa trên blockchain với tầm nhìn bảng điều khiển thời gian thực",
                            "Giám sát tuân thủ được hỗ trợ bởi AI để tuân thủ quy định trên các thị trường EU khác nhau",
                            "Đăng ký nhà phân phối tự động với xác minh KYC",
                            "Quản lý hàng tồn kho dự đoán gắn với mô hình hoạt động của nhà phân phối",
                          ].map((item, i) => (
                            <li
                              key={`case2-item-${i}`}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          Kết quả
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Giải pháp mang lại ROI 314% trong vòng hai năm, với
                          thời gian xử lý hoa hồng giảm từ 5 ngày xuống 4 giờ.
                          Vi phạm tuân thủ giảm 87%, trong khi điểm hài lòng của
                          nhà phân phối tăng từ 72% lên 91%.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 relative overflow-hidden order-1 lg:order-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-700 dark:from-purple-700 dark:to-pink-900">
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Zap className="w-32 h-32 text-white" />
                      </div>
                      <div className="h-full w-full p-8 flex flex-col items-center justify-center">
                        <div className="text-white/60 text-center mb-4">
                          <Lock className="w-12 h-12 mx-auto mb-2" />
                          <div className="text-sm">
                            Tự động hóa hoạt động châu Âu
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-800/90 via-purple-700/60 to-transparent"></div>
                    <div className="relative p-6 md:p-8 flex h-full">
                      <div className="mt-auto">
                        <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm inline-block mb-4">
                          Nghiên cứu #2
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          Tự động hóa hoạt động châu Âu
                        </h3>
                        <div className="flex items-center text-purple-100 mb-4">
                          <Zap className="h-5 w-5 mr-2" />
                          <span>Phục vụ 18 thị trường trên toàn châu Âu</span>
                        </div>
                        <div className="flex space-x-3 mt-4">
                          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                            Blockchain
                          </span>
                          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                            Tự động hóa
                          </span>
                          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                            Tuân thủ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phần FAQ */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 text-sm font-medium mb-4">
                Hỏi đáp
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Câu hỏi thường gặp
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Thông tin chi tiết về cách tiếp cận chuyển đổi số của Amway
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                {faqs.map((faq, index) => (
                  <div
                    key={`faq-${faq.id}`}
                    className={`border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-all ${
                      expandedFaq === index
                        ? "bg-gray-50 dark:bg-gray-700/50"
                        : ""
                    }`}
                  >
                    <button
                      className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white p-6"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="pr-8">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    {expandedFaq === index && (
                      <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lời kêu gọi hành động */}
          <div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative">
              {/* Phần tử nền */}
              <div className="absolute inset-0 overflow-hidden opacity-10">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="smallGrid"
                      width="10"
                      height="10"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 10 0 L 0 0 0 10"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </pattern>
                    <pattern
                      id="grid"
                      width="100"
                      height="100"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect width="100" height="100" fill="url(#smallGrid)" />
                      <path
                        d="M 100 0 L 0 0 0 100"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2"></div>
              </div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Sẵn sàng chuyển đổi kinh doanh MLM của bạn?
                  </h2>
                  <p className="text-blue-100 text-lg max-w-2xl">
                    Tìm hiểu cách nền tảng Marketing Automation của chúng tôi có
                    thể giúp bạn đạt được kết quả tương tự như hành trình chuyển
                    đổi số của Amway.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 shadow-lg hover:shadow-xl transition-all rounded-full">
                      Yêu cầu demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10 px-8 py-3 backdrop-blur-sm rounded-full"
                    >
                      Tải nghiên cứu tình huống
                      <Download className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Các component nội dung tab
const TechnologyIntegrationTab = ({ techFeatures }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Tích hợp công nghệ chính
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway đã chuyển đổi cách tiếp cận MLM truyền thống bằng cách tích hợp
          các công nghệ tiên tiến giúp hợp lý hóa hoạt động, nâng cao hiệu quả
          nhà phân phối và tạo ra trải nghiệm khách hàng liền mạch trên tất cả
          các điểm tiếp xúc.
        </p>

        <div className="mt-8 space-y-6">
          {techFeatures.map((feature) => (
            <motion.div
              key={`tech-feature-${feature.id}`}
              whileHover={{ x: 10 }}
              className="flex items-start gap-4"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-inner">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Hiệu quả triển khai
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Các số liệu hiệu suất của các trụ cột công nghệ chính trong chuyển đổi
          số của Amway
        </p>

        <div className="space-y-5 mt-8">
          {techFeatures.map((feature) => (
            <div key={`tech-stat-${feature.id}`} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {feature.title}
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {feature.stats.effectiveness}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                  style={{ width: `${feature.stats.effectiveness}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Tỷ lệ áp dụng
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-grow">
                      <div
                        className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                        style={{ width: `${feature.stats.adoption}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {feature.stats.adoption}%
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Điểm ROI
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-grow">
                      <div
                        className="h-full bg-purple-500 dark:bg-purple-400 rounded-full"
                        style={{ width: `${feature.stats.roi}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {feature.stats.roi}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-100 dark:border-gray-600/50">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                Thông tin tích hợp
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Công nghệ blockchain cho thấy tỷ lệ áp dụng thấp nhất nhưng dự
                kiến sẽ trở thành yếu tố khác biệt quan trọng vào năm 2026 khi
                các yêu cầu về tính minh bạch tăng lên trên các thị trường toàn
                cầu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Cách tiếp cận MLM truyền thống vs. kỹ thuật số
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 dark:bg-blue-800/50">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                Lĩnh vực kinh doanh
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                MLM truyền thống
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                MLM công nghệ số
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                Tác động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-200 dark:divide-blue-700/50">
            {[
              {
                id: "recruitment",
                area: "Tuyển dụng nhà phân phối",
                traditional: "Giới thiệu trực tiếp, đăng ký thủ công",
                digital: "Khớp đầu mối AI, đăng ký kỹ thuật số, đào tạo video",
                impact: "Đăng ký nhanh hơn 74%, chi phí thu hút giảm 62%",
              },
              {
                id: "ordering",
                area: "Xử lý đơn hàng",
                traditional: "Đơn hàng giấy, nhập thủ công, xử lý hàng loạt",
                digital:
                  "Đặt hàng di động, tự động hóa đăng ký, hàng tồn kho thời gian thực",
                impact:
                  "Độ chính xác đơn hàng 98%, hoàn thành nhanh hơn 3,2 lần",
              },
              {
                id: "compensation",
                area: "Quản lý tiền thưởng",
                traditional:
                  "Tính toán thủ công, xử lý hàng tháng, minh bạch hạn chế",
                digital:
                  "Giao dịch được xác minh bằng blockchain, bảng điều khiển theo thời gian thực",
                impact: "Độ chính xác 99,8%, giảm 83% tranh chấp",
              },
              {
                id: "relationship",
                area: "Quan hệ khách hàng",
                traditional: "Tiếp thị chung, giao tiếp không thường xuyên",
                digital:
                  "Tương tác cá nhân hóa, hiện diện đa kênh, đề xuất dự đoán",
                impact:
                  "Giá trị trọn đời khách hàng cao hơn 32%, giữ chân tốt hơn 28%",
              },
            ].map((row, index) => (
              <motion.tr
                key={`approach-${row.id}`}
                whileHover={{
                  backgroundColor:
                    index % 2 === 0
                      ? "rgba(246, 248, 255, 0.8)"
                      : "rgba(236, 242, 255, 0.8)",
                }}
                className={
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-blue-50 dark:bg-blue-900/10"
                }
              >
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-white border border-blue-200 dark:border-blue-700/50 font-medium">
                  {row.area}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300 border border-blue-200 dark:border-blue-700/50">
                  {row.traditional}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300 border border-blue-200 dark:border-blue-700/50">
                  {row.digital}
                </td>
                <td className="py-3 px-4 text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50 font-medium">
                  {row.impact}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const CrmMarketingTab = ({ crmFeatures }) => (
  <div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 order-2 lg:order-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Chiến lược Marketing tự động & CRM
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway đã hiện đại hóa quy trình quản lý quan hệ khách hàng và tiếp
          thị, chuyển từ mô hình định hướng bán hàng truyền thống sang chiến
          lược tương tác kỹ thuật số, được cá nhân hóa tận dụng tự động hóa và
          trí tuệ dữ liệu.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {crmFeatures.map((feature) => {
            const colorMap = {
              blue: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 border-blue-200 dark:border-blue-700/30",
              indigo:
                "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/30 border-indigo-200 dark:border-indigo-700/30",
              purple:
                "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 border-purple-200 dark:border-purple-700/30",
              pink: "from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/30 border-pink-200 dark:border-pink-700/30",
            };

            const iconColors = {
              blue: "text-blue-600 dark:text-blue-400",
              indigo: "text-indigo-600 dark:text-indigo-400",
              purple: "text-purple-600 dark:text-purple-400",
              pink: "text-pink-600 dark:text-pink-400",
            };

            return (
              <motion.div
                key={`crm-feature-${feature.id}`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className={`bg-gradient-to-br ${
                  colorMap[feature.color]
                } border rounded-xl p-5 shadow-sm`}
              >
                <div
                  className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm inline-block mb-4 ${
                    iconColors[feature.color]
                  }`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/30">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            Luồng tự động hóa chính
          </h4>

          <div className="space-y-6">
            {[
              {
                id: "onboarding",
                name: "Hành trình nhà phân phối mới",
                stages: [
                  "Đăng ký & xác minh KYC",
                  "Chuỗi email chào mừng (5 email)",
                  "Nhắc nhở đào tạo sản phẩm",
                  "Cột mốc xây dựng kinh doanh",
                  "Huấn luyện hiệu suất liên tục",
                ],
                metrics: [
                  "74% tỷ lệ hoàn thành",
                  "3,2 lần nhanh hơn đến mức bán hàng đầu tiên",
                  "Tỷ lệ giữ chân 90 ngày cao hơn 41%",
                ],
              },
              {
                id: "nurture",
                name: "Chuỗi nuôi dưỡng khách hàng",
                stages: [
                  "Chuỗi chào mừng",
                  "Giáo dục sản phẩm",
                  "Bằng chứng xã hội & Lời chứng thực",
                  "Đề xuất bán chéo",
                  "Tương tác chương trình khách hàng thân thiết",
                ],
                metrics: [
                  "Tăng 28% mua hàng lặp lại",
                  "Tương tác email cao hơn 47%",
                  "Tăng 32% giá trị đơn hàng trung bình",
                ],
              },
            ].map((workflow) => (
              <motion.div
                key={`workflow-${workflow.id}`}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-indigo-100 dark:border-indigo-800/30"
              >
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                  {workflow.name}
                </h5>

                <div className="relative">
                  {/* Đường kết nối */}
                  <div className="absolute top-4 left-3 h-full w-0.5 bg-indigo-200 dark:bg-indigo-700/50"></div>

                  <div className="space-y-4 relative">
                    {workflow.stages.map((stage, j) => (
                      <div
                        key={`workflow-${workflow.id}-stage-${j}`}
                        className="flex items-center ml-1"
                      >
                        <div className="w-5 h-5 rounded-full bg-indigo-500 dark:bg-indigo-400 z-10 flex-shrink-0"></div>
                        <div className="ml-4 text-sm text-gray-600 dark:text-gray-300">
                          {stage}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h6 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                    CHỈ SỐ HIỆU SUẤT
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {workflow.metrics.map((metric, j) => (
                      <span
                        key={`workflow-${workflow.id}-metric-${j}`}
                        className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs rounded-md"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div className="sticky top-24 space-y-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-xl text-white overflow-hidden shadow-xl"
          >
            <div className="p-6">
              <h4 className="font-bold text-xl mb-4">
                Tác động triển khai CRM
              </h4>
              <p className="text-indigo-100 mb-6">
                Các chỉ số hiệu suất chính sau khi triển khai nền tảng CRM và tự
                động hóa tiếp thị tích hợp của Amway
              </p>

              <div className="space-y-6">
                {[
                  {
                    id: "response",
                    label: "Thời gian phản hồi đầu mối",
                    before: "24 giờ",
                    after: "8 phút",
                    improvement: "-99.4%",
                  },
                  {
                    id: "setup",
                    label: "Thời gian thiết lập chiến dịch",
                    before: "2 tuần",
                    after: "3 giờ",
                    improvement: "-98.9%",
                  },
                  {
                    id: "conversion",
                    label: "Tỷ lệ chuyển đổi",
                    before: "2.4%",
                    after: "6.8%",
                    improvement: "+183%",
                  },
                  {
                    id: "satisfaction",
                    label: "Sự hài lòng của khách hàng",
                    before: "72%",
                    after: "91%",
                    improvement: "+26%",
                  },
                ].map((metric) => (
                  <div
                    key={`impact-${metric.id}`}
                    className="flex justify-between items-center pb-2 border-b border-indigo-500 dark:border-indigo-400/30"
                  >
                    <span className="text-sm font-medium">{metric.label}</span>
                    <div className="flex items-center gap-3">
                      <div className="text-xs px-2 py-1 bg-white/10 rounded">
                        {metric.before}
                      </div>
                      <ChevronRight className="h-4 w-4 text-indigo-300" />
                      <div className="text-xs px-2 py-1 bg-white/20 rounded font-medium">
                        {metric.after}
                      </div>
                      <div
                        className={`text-xs font-medium ${
                          metric.improvement.startsWith("+")
                            ? "text-green-300"
                            : "text-red-300"
                        }`}
                      >
                        {metric.improvement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6"
          >
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              Ngăn xếp công nghệ
            </h4>

            <div className="space-y-4">
              {[
                {
                  id: "crm",
                  name: "Nền tảng CRM",
                  value: "Salesforce Marketing Cloud",
                },
                {
                  id: "email",
                  name: "Tự động hóa Email",
                  value: "Salesforce Pardot",
                },
                {
                  id: "cdp",
                  name: "Nền tảng dữ liệu khách hàng",
                  value: "Segment",
                },
                {
                  id: "personalization",
                  name: "Công cụ cá nhân hóa",
                  value: "Dynamic Yield",
                },
                {
                  id: "analytics",
                  name: "Nền tảng phân tích",
                  value: "Looker + Tableau",
                },
              ].map((tech) => (
                <div
                  key={`tech-${tech.id}`}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {tech.name}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {tech.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Việc tích hợp giữa các hệ thống cũ và nền tảng mới là thách
                  thức kỹ thuật đáng kể nhất, đòi hỏi phát triển phần mềm trung
                  gian tùy chỉnh.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

const DataAnalyticsTab = ({ dataPoints }) => (
  <div>
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
      <div className="lg:col-span-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Phân tích dữ liệu & Thông minh kinh doanh
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway đã chuyển đổi quy trình ra quyết định thông qua phân tích dữ
          liệu toàn diện và học máy, biến các bộ dữ liệu khổng lồ thành những
          hiểu biết có thể thực hiện được để thúc đẩy các sáng kiến chiến lược
          và cải tiến hoạt động.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataPoints.map((point) => {
            const colorMap = {
              blue: "border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20",
              green:
                "border-green-200 dark:border-green-700/50 bg-green-50 dark:bg-green-900/20",
              purple:
                "border-purple-200 dark:border-purple-700/50 bg-purple-50 dark:bg-purple-900/20",
              orange:
                "border-orange-200 dark:border-orange-700/50 bg-orange-50 dark:bg-orange-900/20",
            };

            const textColors = {
              blue: "text-blue-600 dark:text-blue-400",
              green: "text-green-600 dark:text-green-400",
              purple: "text-purple-600 dark:text-purple-400",
              orange: "text-orange-600 dark:text-orange-400",
            };

            return (
              <motion.div
                key={`data-point-${point.id}`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className={`rounded-xl border ${colorMap[point.color]} p-5`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {point.title}
                  </h4>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      point.change.startsWith("+")
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {point.change}
                  </div>
                </div>

                <div
                  className={`text-3xl font-bold mb-2 ${
                    textColors[point.color]
                  }`}
                >
                  {point.value}
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {point.prediction}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-xl text-white p-6 shadow-lg">
          <h4 className="font-bold text-xl mb-5">
            Thông tin dữ liệu quan trọng
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                id: "response",
                title: "Tỷ lệ phản hồi cao hơn 24%",
                description:
                  "Đề xuất sản phẩm được cá nhân hóa bởi AI vượt trội hơn các chương trình khuyến mãi chung 24% trong các chiến dịch do nhà phân phối dẫn đầu.",
              },
              {
                id: "forecast",
                title: "Dự báo bán hàng chính xác 86%",
                description:
                  "Các mô hình học máy hiện dự đoán doanh số trước một tháng với độ chính xác 86%, tăng từ 62% với các phương pháp truyền thống.",
              },
              {
                id: "cost",
                title: "Giảm chi phí hàng năm 43 triệu USD",
                description:
                  "Tối ưu hóa tồn kho dự đoán đã giảm các tình huống tồn kho quá mức và hết hàng, tiết kiệm 43 triệu USD hàng năm.",
              },
              {
                id: "churn",
                title: "Độ chính xác dự đoán bỏ cuộc 37%",
                description:
                  "Hệ thống cảnh báo sớm xác định các nhà phân phối có nguy cơ rời đi với độ chính xác cao hơn 37% so với các phương pháp trước đây.",
              },
            ].map((insight) => (
              <motion.div
                key={`insight-${insight.id}`}
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <h5 className="font-bold text-lg mb-2">{insight.title}</h5>
                <p className="text-sm text-blue-100">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">
              Khung phân tích dữ liệu
            </h4>
          </div>

          <div className="p-6">
            <div className="space-y-8">
              {[
                {
                  id: "collection",
                  step: "Thu thập dữ liệu",
                  description:
                    "Thu thập dữ liệu có cấu trúc và phi cấu trúc từ nhiều nguồn",
                  elements: [
                    "Tương tác khách hàng (CRM)",
                    "Hành vi thương mại điện tử",
                    "Tương tác mạng xã hội",
                    "Hiệu suất nhà phân phối",
                    "Xu hướng thị trường & Cạnh tranh",
                  ],
                },
                {
                  id: "processing",
                  step: "Xử lý dữ liệu",
                  description:
                    "Làm sạch, chuyển đổi và tích hợp các nguồn dữ liệu khác nhau",
                  elements: [
                    "Làm sạch & chuẩn hóa dữ liệu",
                    "Quy trình ETL",
                    "Lưu trữ dữ liệu",
                    "Đường ống xử lý thời gian thực",
                    "Kiến trúc hồ dữ liệu",
                  ],
                },
                {
                  id: "analysis",
                  step: "Phân tích & mô hình hóa",
                  description:
                    "Áp dụng các phương pháp thống kê và thuật toán học máy",
                  elements: [
                    "Phân tích dự đoán",
                    "Phân khúc khách hàng",
                    "Mô hình hóa khuynh hướng",
                    "Dự báo chuỗi thời gian",
                    "Phân tích hiệu ứng mạng",
                  ],
                },
                {
                  id: "visualization",
                  step: "Trực quan hóa & báo cáo",
                  description:
                    "Chuyển đổi hiểu biết thành bảng điều khiển và báo cáo có thể thực hiện",
                  elements: [
                    "Bảng điều khiển điều hành",
                    "Báo cáo hoạt động",
                    "Bảng điểm hiệu suất nhà phân phối",
                    "Bản đồ cơ hội thị trường",
                    "Thông báo & cảnh báo tự động",
                  ],
                },
              ].map((phase, i) => (
                <motion.div
                  key={`phase-${phase.id}`}
                  whileHover={{ x: 5 }}
                  className="relative"
                >
                  {/* Đường kết nối */}
                  {i < 3 && (
                    <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                  )}

                  {/* Vòng tròn giai đoạn */}
                  <div className="flex items-start gap-5">
                    <div className="relative z-10 w-14 h-14 rounded-full bg-blue-500 dark:bg-blue-400 text-white flex items-center justify-center font-bold text-lg">
                      {i + 1}
                    </div>

                    <div>
                      <h5 className="font-bold text-gray-900 dark:text-white text-lg">
                        {phase.step}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {phase.description}
                      </p>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600">
                        <ul className="space-y-2">
                          {phase.elements.map((element, j) => (
                            <li
                              key={`phase-${phase.id}-element-${j}`}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                              <span className="text-gray-700 dark:text-gray-300">
                                {element}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800/30 shadow-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500 dark:text-amber-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Thách thức quản trị dữ liệu
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Thách thức lớn nhất của Amway trong việc triển khai phân tích dữ
                liệu là thiết lập quản trị dữ liệu nhất quán trên hơn 100 thị
                trường toàn cầu với các yêu cầu quy định khác nhau, đặc biệt là
                ở khu vực châu Á Thái Bình Dương và châu Âu.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Điều này đòi hỏi việc tạo ra một khung quản trị dữ liệu linh
                hoạt, duy trì tính nhất quán toàn cầu đồng thời tính đến các nhu
                cầu tuân thủ địa phương.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FutureTrendsTab = ({ futureImpact }) => (
  <div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Xu hướng công nghệ tương lai
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway đang định vị mình ở vị trí hàng đầu trong đổi mới công nghệ
          trong ngành MLM, với các khoản đầu tư chiến lược vào các công nghệ mới
          nổi sẽ định hình lại hoạt động bán hàng trực tiếp trong những năm tới.
        </p>

        <div className="mt-8 space-y-6">
          {[
            {
              id: "ai",
              title: "Trí tuệ nhân tạo & Học máy",
              description:
                "AI sẽ cung cấp các đề xuất cá nhân hóa, phân tích dự đoán và dịch vụ khách hàng tự động, cho phép nhà phân phối tập trung vào xây dựng mối quan hệ thay vì các nhiệm vụ hành chính.",
              icon: Zap,
              color: "purple",
            },
            {
              id: "immersive",
              title: "Công nghệ đắm chìm (AR/VR)",
              description:
                "Trình diễn sản phẩm ảo, môi trường đào tạo và phòng trưng bày kỹ thuật số sẽ chuyển đổi cách nhà phân phối tương tác với khách hàng và tìm hiểu về sản phẩm.",
              icon: Smartphone,
              color: "blue",
            },
            {
              id: "blockchain",
              title: "Blockchain & Hợp đồng thông minh",
              description:
                "Tính toán hoa hồng tự động, minh bạch và xác minh tính xác thực của sản phẩm sẽ tăng cường niềm tin và giảm chi phí vận hành trong mô hình MLM.",
              icon: Lock,
              color: "green",
            },
            {
              id: "voice",
              title: "Thương mại giọng nói & AI hội thoại",
              description:
                "Đặt hàng bằng giọng nói và trợ lý ảo AI sẽ đơn giản hóa trải nghiệm khách hàng và nhà phân phối trên tất cả các điểm tiếp xúc.",
              icon: Users,
              color: "orange",
            },
          ].map((trend) => {
            const colorMap = {
              purple: "border-l-purple-500 dark:border-l-purple-400",
              blue: "border-l-blue-500 dark:border-l-blue-400",
              green: "border-l-green-500 dark:border-l-green-400",
              orange: "border-l-orange-500 dark:border-l-orange-400",
            };

            const bgColors = {
              purple: "bg-purple-50 dark:bg-purple-900/20",
              blue: "bg-blue-50 dark:bg-blue-900/20",
              green: "bg-green-50 dark:bg-green-900/20",
              orange: "bg-orange-50 dark:bg-orange-900/20",
            };

            const iconColors = {
              purple: "text-purple-500 dark:text-purple-400",
              blue: "text-blue-500 dark:text-blue-400",
              green: "text-green-500 dark:text-green-400",
              orange: "text-orange-500 dark:text-orange-400",
            };

            return (
              <motion.div
                key={`trend-${trend.id}`}
                whileHover={{
                  x: 10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className={`rounded-lg border-l-4 ${colorMap[trend.color]} ${
                  bgColors[trend.color]
                } p-5 shadow-sm`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${
                      iconColors[trend.color]
                    }`}
                  >
                    <trend.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {trend.title}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm pl-10">
                  {trend.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
        >
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Mức độ sẵn sàng đối với công nghệ mới
          </h4>

          {/* Thay thế biểu đồ bằng bảng điểm kết hợp thanh tiến trình */}
          <div className="space-y-6">
            {futureImpact.map((item) => (
              <motion.div key={`impact-${item.id}`} whileHover={{ y: -5 }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item.trend}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.timeframe}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400">
                        Tác động tiềm năng
                      </span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {item.impact}/10
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                        style={{ width: `${(item.impact / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400">
                        Mức độ sẵn sàng
                      </span>
                      <span className="font-medium text-purple-600 dark:text-purple-400">
                        {item.readiness}/10
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 dark:bg-purple-400 rounded-full"
                        style={{ width: `${(item.readiness / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-xl shadow-lg text-white p-6"
        >
          <h4 className="text-xl font-bold mb-4">
            Lộ trình ứng dụng công nghệ
          </h4>

          <div className="space-y-4">
            {[
              {
                phase: "Ngắn hạn (0-12 tháng)",
                items: [
                  "Triển khai trải nghiệm sản phẩm AR trên di động",
                  "Mở rộng tự động hóa quy trình robot (RPA)",
                  "Nâng cấp cơ sở hạ tầng phân tích dữ liệu",
                ],
              },
              {
                phase: "Trung hạn (1-2 năm)",
                items: [
                  "Tích hợp AI trong đề xuất sản phẩm",
                  "Triển khai blockchain trong quản lý hoa hồng",
                  "Mở rộng khả năng thương mại giọng nói",
                ],
              },
              {
                phase: "Dài hạn (3-5 năm)",
                items: [
                  "Hệ sinh thái kỹ thuật số đầy đủ tính năng",
                  "Ảo hóa hoàn toàn quy trình đào tạo và onboarding",
                  "AI tự quản lý có khả năng đề xuất chiến lược kinh doanh",
                ],
              },
            ].map((phase, i) => (
              <motion.div
                key={`phase-${i}`}
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <h5 className="font-bold text-lg mb-3">{phase.phase}</h5>
                <ul className="space-y-2">
                  {phase.items.map((item, j) => (
                    <li
                      key={`phase-${i}-item-${j}`}
                      className="flex items-start gap-2"
                    >
                      <ChevronRight className="h-5 w-5 text-indigo-300 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>

    <div className="mt-10 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 rounded-lg">
          <AlertCircle className="h-6 w-6" />
        </div>

        <div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Khuyến nghị chiến lược công nghệ
          </h4>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Dựa trên tình hình ngành và tiến bộ công nghệ hiện tại, Amway cần ưu
            tiên các sáng kiến sau để duy trì vị thế dẫn đầu thị trường:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: "invest",
                title: "Đầu tư vào AI tùy chỉnh",
                description:
                  "Phát triển các mô hình AI độc quyền cho dự đoán và cá nhân hóa thay vì phụ thuộc vào giải pháp AI thương mại.",
                icon: (
                  <Zap className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                ),
              },
              {
                id: "unified",
                title: "Xây dựng nền tảng đa kênh thống nhất",
                description:
                  "Tạo trải nghiệm liền mạch giữa các kênh bán hàng, ưu tiên tích hợp di động và web.",
                icon: (
                  <Smartphone className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                ),
              },
              {
                id: "talent",
                title: "Phát triển tài năng kỹ thuật số",
                description:
                  "Đầu tư vào đào tạo kỹ thuật số cho nhà phân phối và xây dựng đội ngũ phát triển công nghệ nội bộ.",
                icon: (
                  <Users className="h-5 w-5 text-green-500 dark:text-green-400" />
                ),
              },
              {
                id: "data",
                title: "Cải thiện kiến trúc dữ liệu",
                description:
                  "Tiếp tục hiện đại hóa cơ sở hạ tầng dữ liệu để hỗ trợ ứng dụng AI và phân tích thời gian thực.",
                icon: (
                  <Database className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                ),
              },
            ].map((rec) => (
              <motion.div
                key={`rec-${rec.id}`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-100 dark:border-gray-600 flex items-start gap-3"
              >
                <div className="flex-shrink-0 mt-1">{rec.icon}</div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    {rec.title}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {rec.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AmwayDetailCaseStudy;
