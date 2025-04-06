import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Check,
  X,
  Info,
  ChevronRight,
  Download,
  ExternalLink,
  Filter,
  Search,
  ArrowDownCircle,
} from "lucide-react";
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
 * Công cụ so sánh tương tác nâng cao cho các giải pháp Marketing Automation
 */
const CompareTool = ({ className }) => {
  const [selectedTools, setSelectedTools] = useState(["epixel", "global"]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [highlightedFeature, setHighlightedFeature] = useState(null);
  const [expandedView, setExpandedView] = useState(false);

  const tools = [
    { id: "epixel", name: "Epixel MLM Software", icon: "💎", color: "blue" },
    { id: "global", name: "Global MLM Software", icon: "🌐", color: "green" },
    {
      id: "bi",
      name: "Công cụ BI (Tableau/Sisense)",
      icon: "📊",
      color: "purple",
    },
    { id: "mamlm", name: "MAMLM Platform", icon: "🚀", color: "indigo" },
  ];

  const featureCategories = [
    { id: "all", name: "Tất cả" },
    { id: "basic", name: "Cơ bản" },
    { id: "advanced", name: "Nâng cao" },
    { id: "analytics", name: "Phân tích" },
    { id: "integration", name: "Tích hợp" },
  ];

  const features = [
    {
      id: "crm",
      name: "Quản lý CRM",
      category: "basic",
      description:
        "Hệ thống quản lý thông tin liên hệ khách hàng, phân nhóm và quản lý mạng lưới phân phối",
      tools: {
        epixel: {
          supported: true,
          note: "Quản lý mạng lưới phân phối đầy đủ, CRM tích hợp",
          rating: 4.2,
        },
        global: {
          supported: true,
          note: "Quản lý thông tin liên hệ, tự động cập nhật CRM",
          rating: 4.5,
        },
        bi: {
          supported: false,
          note: "Không hỗ trợ trực tiếp, chỉ phân tích dữ liệu",
          rating: 0,
        },
        mamlm: {
          supported: true,
          note: "Quản lý CRM toàn diện với tính năng ML để dự đoán hành vi",
          rating: 4.8,
        },
      },
    },
    {
      id: "commission",
      name: "Quản lý hoa hồng",
      category: "basic",
      description:
        "Tự động tính toán, xử lý và phân phối hoa hồng dựa trên hiệu suất",
      tools: {
        epixel: {
          supported: true,
          note: "Tự động hóa tính toán hoa hồng, báo cáo minh bạch",
          rating: 4.3,
        },
        global: {
          supported: true,
          note: "Tự động tính toán và phân phối hoa hồng",
          rating: 4.1,
        },
        bi: {
          supported: false,
          note: "Không áp dụng trực tiếp",
          rating: 0,
        },
        mamlm: {
          supported: true,
          note: "Hệ thống tính hoa hồng phức tạp với blockchain",
          rating: 4.9,
        },
      },
    },
    {
      id: "email",
      name: "Email Marketing",
      category: "basic",
      description:
        "Tự động gửi email cá nhân hóa, chiến dịch drip, và nuôi dưỡng khách hàng",
      tools: {
        epixel: {
          supported: true,
          note: "Hỗ trợ các chiến dịch email tự động",
          rating: 3.8,
        },
        global: {
          supported: true,
          note: "Hỗ trợ tự động nuôi dưỡng khách hàng qua email",
          rating: 4.0,
        },
        bi: {
          supported: false,
          note: "Không áp dụng trực tiếp",
          rating: 0,
        },
        mamlm: {
          supported: true,
          note: "Email marketing AI-driven với A/B testing tự động",
          rating: 4.7,
        },
      },
    },
    {
      id: "analysis",
      name: "Phân tích dữ liệu",
      category: "analytics",
      description:
        "Khả năng phân tích dữ liệu kinh doanh, báo cáo và trực quan hóa thông tin",
      tools: {
        epixel: {
          supported: true,
          note: "Báo cáo tự động, tích hợp BI cơ bản",
          rating: 3.5,
        },
        global: {
          supported: true,
          note: "Tích hợp các công cụ phân tích và báo cáo",
          rating: 3.7,
        },
        bi: {
          supported: true,
          note: "Phân tích chuyên sâu là thế mạnh chính",
          rating: 4.9,
        },
        mamlm: {
          supported: true,
          note: "Phân tích dữ liệu thời gian thực với AI predictive",
          rating: 4.6,
        },
      },
    },
    {
      id: "multichannel",
      name: "Tích hợp đa kênh",
      category: "integration",
      description:
        "Khả năng kết nối và quản lý tương tác qua nhiều kênh tiếp thị khác nhau",
      tools: {
        epixel: {
          supported: true,
          note: "Tích hợp thông báo qua SMS, email và mạng xã hội",
          rating: 4.1,
        },
        global: {
          supported: true,
          note: "Tích hợp tương tác đa kênh",
          rating: 4.0,
        },
        bi: {
          supported: false,
          note: "Không áp dụng trực tiếp",
          rating: 0,
        },
        mamlm: {
          supported: true,
          note: "Tích hợp toàn diện với WhatsApp, Telegram, và các mạng xã hội",
          rating: 4.7,
        },
      },
    },
    {
      id: "aifeatures",
      name: "Tính năng AI",
      category: "advanced",
      description:
        "Công nghệ trí tuệ nhân tạo và học máy để tối ưu hóa quy trình và tăng hiệu quả",
      tools: {
        epixel: {
          supported: false,
          note: "Không có tính năng AI",
          rating: 0,
        },
        global: {
          supported: true,
          note: "Phân tích dự đoán cơ bản",
          rating: 3.2,
        },
        bi: {
          supported: true,
          note: "Phân tích dự đoán và mô hình học máy",
          rating: 4.2,
        },
        mamlm: {
          supported: true,
          note: "Tính năng AI toàn diện cho phân tích và tự động hóa",
          rating: 4.8,
        },
      },
    },
    {
      id: "mobileapp",
      name: "Ứng dụng di động",
      category: "integration",
      description:
        "Ứng dụng di động cho nhà phân phối và khách hàng trên iOS/Android",
      tools: {
        epixel: {
          supported: true,
          note: "Ứng dụng di động cơ bản cho nhà phân phối",
          rating: 3.5,
        },
        global: {
          supported: true,
          note: "Ứng dụng đầy đủ tính năng cho cả nhà phân phối và khách hàng",
          rating: 4.3,
        },
        bi: {
          supported: true,
          note: "Ứng dụng xem báo cáo di động",
          rating: 3.8,
        },
        mamlm: {
          supported: true,
          note: "Ứng dụng toàn diện với tích hợp mạng xã hội và thông báo đẩy",
          rating: 4.7,
        },
      },
    },
    {
      id: "customization",
      name: "Tùy biến",
      category: "advanced",
      description: "Khả năng tùy chỉnh theo nhu cầu cụ thể của doanh nghiệp",
      tools: {
        epixel: {
          supported: true,
          note: "Tùy biến trung bình theo yêu cầu",
          rating: 3.7,
        },
        global: {
          supported: true,
          note: "Tùy biến cao với nhiều tùy chọn",
          rating: 4.2,
        },
        bi: {
          supported: true,
          note: "Tùy biến cao cho báo cáo và bảng điều khiển",
          rating: 4.5,
        },
        mamlm: {
          supported: true,
          note: "Tùy biến hoàn toàn với API mở và mô-đun mở rộng",
          rating: 4.9,
        },
      },
    },
  ];

  // Toggle tool selection
  const toggleTool = (toolId) => {
    if (selectedTools.includes(toolId)) {
      if (selectedTools.length > 1) {
        setSelectedTools(selectedTools.filter((id) => id !== toolId));
      }
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  // Show feature details in modal
  const showFeatureInfo = (feature) => {
    setCurrentFeature(feature);
    setShowInfoModal(true);
  };

  // Filter features based on search and category
  const filteredFeatures = features.filter((feature) => {
    const matchesSearch =
      searchQuery === "" ||
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || feature.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Find the best tool for each feature
  const getBestToolForFeature = (feature) => {
    let bestTool = null;
    let highestRating = -1;

    Object.entries(feature.tools).forEach(([toolId, details]) => {
      if (details.rating > highestRating) {
        highestRating = details.rating;
        bestTool = toolId;
      }
    });

    return bestTool;
  };

  // Calculate overall score for each tool
  const calculateOverallScores = () => {
    const scores = {};

    tools.forEach((tool) => {
      let totalScore = 0;
      let totalFeatures = 0;

      features.forEach((feature) => {
        if (feature.tools[tool.id] && feature.tools[tool.id].rating > 0) {
          totalScore += feature.tools[tool.id].rating;
          totalFeatures++;
        }
      });

      scores[tool.id] =
        totalFeatures > 0 ? (totalScore / totalFeatures).toFixed(1) : "N/A";
    });

    return scores;
  };

  const overallScores = calculateOverallScores();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const getToolColor = (toolId) => {
    const tool = tools.find((t) => t.id === toolId);
    return tool ? tool.color : "gray";
  };

  const colorVariants = {
    blue: "bg-blue-500 dark:bg-blue-600",
    green: "bg-green-500 dark:bg-green-600",
    purple: "bg-purple-500 dark:bg-purple-600",
    indigo: "bg-indigo-500 dark:bg-indigo-600",
    gray: "bg-gray-500 dark:bg-gray-600",
  };

  const lightColorVariants = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    indigo:
      "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    gray: "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800",
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card
        variant="default"
        className="shadow-xl overflow-hidden border border-gray-200/70 dark:border-gray-700/50 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95"
      >
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <motion.div variants={itemVariants}>
              <CardTitle className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                So sánh giải pháp Marketing Automation
              </CardTitle>
            </motion.div>

            {/* Search and expand controls */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 items-center"
            >
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  placeholder="Tìm tính năng..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 w-full max-w-[200px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExpandedView(!expandedView)}
                className="border-gray-200 dark:border-gray-700"
              >
                {expandedView ? "Thu gọn" : "Mở rộng"}
                <ArrowDownCircle
                  className={`ml-1 h-4 w-4 transition-transform ${
                    expandedView ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </motion.div>
          </div>

          {/* Tool selection buttons and categories */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-5">
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
            >
              {tools.map((tool) => {
                const isSelected = selectedTools.includes(tool.id);
                return (
                  <motion.div
                    key={tool.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTool(tool.id)}
                      className={cn(
                        isSelected
                          ? `${colorVariants[tool.color]} border-none`
                          : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700",
                        "flex items-center gap-1.5"
                      )}
                    >
                      <span className="text-lg">{tool.icon}</span>
                      <span>{tool.name}</span>
                      {isSelected && overallScores[tool.id] !== "N/A" && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 dark:bg-black/20 rounded-full">
                          {overallScores[tool.id]}
                        </span>
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-1.5 mt-2 sm:mt-0"
            >
              {featureCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    activeCategory === category.id
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700",
                    "text-xs px-2.5"
                  )}
                >
                  {category.name}
                </Button>
              ))}
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-900 z-10"
                  >
                    Tính năng
                  </th>
                  {selectedTools.map((toolId) => {
                    const tool = tools.find((t) => t.id === toolId);
                    return (
                      <th
                        key={toolId}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{tool.icon}</span>
                          {tool.name}
                        </div>
                        {overallScores[toolId] !== "N/A" && (
                          <div className="mt-1 text-xs font-normal flex items-center">
                            <span
                              className={`inline-block w-16 h-1.5 mr-2 rounded-full bg-gradient-to-r ${getScoreGradient(
                                parseFloat(overallScores[toolId])
                              )}`}
                            ></span>
                            Điểm:{" "}
                            <span className="font-semibold ml-1">
                              {overallScores[toolId]}/5
                            </span>
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence>
                  {filteredFeatures.map((feature) => {
                    const bestTool = getBestToolForFeature(feature);
                    return (
                      <motion.tr
                        key={feature.id}
                        className={cn(
                          "hover:bg-blue-50/40 dark:hover:bg-blue-900/10 relative",
                          highlightedFeature === feature.id
                            ? "bg-blue-50/70 dark:bg-blue-900/20"
                            : ""
                        )}
                        onMouseEnter={() => setHighlightedFeature(feature.id)}
                        onMouseLeave={() => setHighlightedFeature(null)}
                        variants={itemVariants}
                        layout
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800 z-10 border-r border-gray-100 dark:border-gray-700">
                          <div className="flex items-center">
                            <span>{feature.name}</span>
                            <button
                              onClick={() => showFeatureInfo(feature)}
                              className="ml-2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-full"
                              aria-label={`Thông tin chi tiết về ${feature.name}`}
                            >
                              <Info size={16} />
                            </button>
                          </div>
                          {expandedView && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 pr-8">
                              {feature.description}
                            </p>
                          )}
                        </td>
                        {selectedTools.map((toolId) => {
                          const supported = feature.tools[toolId]?.supported;
                          const isBest = bestTool === toolId;
                          return (
                            <td
                              key={toolId}
                              className={cn(
                                "px-6 py-4 whitespace-normal text-sm text-gray-600 dark:text-gray-300",
                                highlightedFeature === feature.id && isBest
                                  ? "bg-green-50/30 dark:bg-green-900/10"
                                  : ""
                              )}
                            >
                              <div className="flex items-start">
                                <div
                                  className={cn(
                                    "flex-shrink-0 h-5 w-5 mr-2 rounded-full flex items-center justify-center",
                                    supported
                                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                  )}
                                >
                                  {supported ? (
                                    <Check size={12} />
                                  ) : (
                                    <X size={12} />
                                  )}
                                </div>
                                <div>
                                  <span>{feature.tools[toolId].note}</span>
                                  {feature.tools[toolId].rating > 0 && (
                                    <div className="mt-1 flex items-center">
                                      <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full rounded-full ${getScoreGradient(
                                            feature.tools[toolId].rating
                                          )}`}
                                          style={{
                                            width: `${
                                              (feature.tools[toolId].rating /
                                                5) *
                                              100
                                            }%`,
                                          }}
                                        ></div>
                                      </div>
                                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                        {feature.tools[toolId].rating.toFixed(
                                          1
                                        )}
                                      </span>
                                      {isBest && supported && (
                                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                                          Tốt nhất
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
                {filteredFeatures.length === 0 && (
                  <tr>
                    <td
                      colSpan={selectedTools.length + 1}
                      className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Search className="w-8 h-8 mb-2 text-gray-400" />
                        <p>Không tìm thấy tính năng phù hợp.</p>
                        <p className="text-sm mt-1">
                          Thử tìm kiếm với từ khóa khác hoặc thay đổi danh mục.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal for feature details */}
      <Modal open={showInfoModal} onClose={() => setShowInfoModal(false)}>
        <ModalContent className="max-w-3xl">
          <ModalCloseButton onClick={() => setShowInfoModal(false)} />
          <ModalHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <ModalTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              {currentFeature?.name}
            </ModalTitle>
          </ModalHeader>
          <ModalBody className="py-6">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {currentFeature?.description}
            </p>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                Đánh giá chi tiết:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFeature &&
                  tools.map((tool) => {
                    const toolDetail = currentFeature.tools[tool.id];
                    const colorClass =
                      lightColorVariants[getToolColor(tool.id)];
                    return (
                      <div
                        key={tool.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          colorClass,
                          "relative overflow-hidden"
                        )}
                      >
                        {toolDetail.rating ===
                          Math.max(
                            ...Object.values(currentFeature.tools).map(
                              (t) => t.rating || 0
                            )
                          ) &&
                          toolDetail.rating > 0 && (
                            <div className="absolute top-0 right-0">
                              <div className="bg-green-500 text-white text-xs px-2 py-1 transform rotate-45 translate-x-2 -translate-y-1 shadow-sm">
                                Top
                              </div>
                            </div>
                          )}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{tool.icon}</span>
                          <h5 className="font-medium">{tool.name}</h5>
                        </div>
                        <div className="flex items-start mb-3">
                          <div
                            className={cn(
                              "flex-shrink-0 h-5 w-5 mr-2 rounded-full flex items-center justify-center mt-0.5",
                              toolDetail.supported
                                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                            )}
                          >
                            {toolDetail.supported ? (
                              <Check size={12} />
                            ) : (
                              <X size={12} />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {toolDetail.note}
                          </p>
                        </div>

                        {toolDetail.rating > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <span>Điểm đánh giá</span>
                              <span className="font-medium">
                                {toolDetail.rating.toFixed(1)}/5
                              </span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getScoreGradient(
                                  toolDetail.rating
                                )}`}
                                style={{
                                  width: `${(toolDetail.rating / 5) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2 text-blue-500" />
                Lưu ý khi chọn giải pháp
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Khi lựa chọn giải pháp {currentFeature?.name.toLowerCase()}, cần
                cân nhắc quy mô doanh nghiệp, ngân sách, và mục tiêu dài hạn.
                Giải pháp tốt nhất là giải pháp đáp ứng được nhu cầu cụ thể của
                doanh nghiệp bạn.
              </p>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 border-gray-200 dark:border-gray-700"
            >
              <Download className="h-4 w-4" />
              Tải báo cáo
            </Button>

            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              onClick={() => setShowInfoModal(false)}
            >
              Chi tiết về giải pháp
              <ChevronRight className="h-4 w-4" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

// Helper function to get score gradient color
function getScoreGradient(score) {
  if (score >= 4.5) return "bg-gradient-to-r from-green-500 to-emerald-500";
  if (score >= 4.0) return "bg-gradient-to-r from-green-400 to-emerald-400";
  if (score >= 3.5) return "bg-gradient-to-r from-green-400 to-yellow-400";
  if (score >= 3.0) return "bg-gradient-to-r from-yellow-400 to-yellow-500";
  if (score >= 2.0) return "bg-gradient-to-r from-yellow-500 to-orange-500";
  return "bg-gradient-to-r from-orange-500 to-red-500";
}

export default CompareTool;
