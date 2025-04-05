import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Check, X, Info } from "lucide-react";
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

/**
 * Công cụ so sánh tương tác cho các giải pháp Marketing Automation
 */
const CompareTool = ({ className }) => {
  const [selectedTools, setSelectedTools] = useState(["epixel", "global"]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(null);

  const tools = [
    { id: "epixel", name: "Epixel MLM Software" },
    { id: "global", name: "Global MLM Software" },
    { id: "bi", name: "Công cụ BI (Tableau/Sisense)" },
    { id: "mamlm", name: "MAMLM Platform" },
  ];

  const features = [
    {
      id: "crm",
      name: "Quản lý CRM",
      description:
        "Hệ thống quản lý thông tin liên hệ khách hàng, phân nhóm và quản lý mạng lưới phân phối",
      tools: {
        epixel: {
          supported: true,
          note: "Quản lý mạng lưới phân phối đầy đủ, CRM tích hợp",
        },
        global: {
          supported: true,
          note: "Quản lý thông tin liên hệ, tự động cập nhật CRM",
        },
        bi: {
          supported: false,
          note: "Không hỗ trợ trực tiếp, chỉ phân tích dữ liệu",
        },
        mamlm: {
          supported: true,
          note: "Quản lý CRM toàn diện với tính năng ML để dự đoán hành vi",
        },
      },
    },
    {
      id: "commission",
      name: "Quản lý hoa hồng",
      description:
        "Tự động tính toán, xử lý và phân phối hoa hồng dựa trên hiệu suất",
      tools: {
        epixel: {
          supported: true,
          note: "Tự động hóa tính toán hoa hồng, báo cáo minh bạch",
        },
        global: {
          supported: true,
          note: "Tự động tính toán và phân phối hoa hồng",
        },
        bi: { supported: false, note: "Không áp dụng trực tiếp" },
        mamlm: {
          supported: true,
          note: "Hệ thống tính hoa hồng phức tạp với blockchain",
        },
      },
    },
    {
      id: "email",
      name: "Email Marketing",
      description:
        "Tự động gửi email cá nhân hóa, chiến dịch drip, và nuôi dưỡng khách hàng",
      tools: {
        epixel: {
          supported: true,
          note: "Hỗ trợ các chiến dịch email tự động",
        },
        global: {
          supported: true,
          note: "Hỗ trợ tự động nuôi dưỡng khách hàng qua email",
        },
        bi: { supported: false, note: "Không áp dụng trực tiếp" },
        mamlm: {
          supported: true,
          note: "Email marketing AI-driven với A/B testing tự động",
        },
      },
    },
    {
      id: "analysis",
      name: "Phân tích dữ liệu",
      description:
        "Khả năng phân tích dữ liệu kinh doanh, báo cáo và trực quan hóa thông tin",
      tools: {
        epixel: {
          supported: true,
          note: "Báo cáo tự động, tích hợp BI cơ bản",
        },
        global: {
          supported: true,
          note: "Tích hợp các công cụ phân tích và báo cáo",
        },
        bi: { supported: true, note: "Phân tích chuyên sâu là thế mạnh chính" },
        mamlm: {
          supported: true,
          note: "Phân tích dữ liệu thời gian thực với AI predictive",
        },
      },
    },
    {
      id: "multichannel",
      name: "Tích hợp đa kênh",
      description:
        "Khả năng kết nối và quản lý tương tác qua nhiều kênh tiếp thị khác nhau",
      tools: {
        epixel: {
          supported: true,
          note: "Tích hợp thông báo qua SMS, email và mạng xã hội",
        },
        global: { supported: true, note: "Tích hợp tương tác đa kênh" },
        bi: { supported: false, note: "Không áp dụng trực tiếp" },
        mamlm: {
          supported: true,
          note: "Tích hợp toàn diện với WhatsApp, Telegram, và các mạng xã hội",
        },
      },
    },
  ];

  const toggleTool = (toolId) => {
    if (selectedTools.includes(toolId)) {
      if (selectedTools.length > 1) {
        setSelectedTools(selectedTools.filter((id) => id !== toolId));
      }
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const showFeatureInfo = (feature) => {
    setCurrentFeature(feature);
    setShowInfoModal(true);
  };

  return (
    <div className={className}>
      <Card variant="default" className="shadow-lg overflow-hidden">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle>Công cụ so sánh các giải pháp</CardTitle>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={
                    selectedTools.includes(tool.id) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => toggleTool(tool.id)}
                  className={
                    selectedTools.includes(tool.id) ? "bg-blue-600" : ""
                  }
                >
                  {tool.name}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
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
                        {tool.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {features.map((feature) => (
                  <tr
                    key={feature.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <span>{feature.name}</span>
                        <button
                          onClick={() => showFeatureInfo(feature)}
                          className="ml-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          <Info size={16} />
                        </button>
                      </div>
                    </td>
                    {selectedTools.map((toolId) => {
                      const supported = feature.tools[toolId]?.supported;
                      return (
                        <td
                          key={toolId}
                          className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300"
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
                            <span>{feature.tools[toolId].note}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal for feature details */}
      <Modal open={showInfoModal} onClose={() => setShowInfoModal(false)}>
        <ModalContent>
          <ModalCloseButton onClick={() => setShowInfoModal(false)} />
          <ModalHeader>
            <ModalTitle>{currentFeature?.name}</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {currentFeature?.description}
            </p>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Chi tiết hỗ trợ:
            </h4>
            <div className="space-y-3">
              {currentFeature &&
                tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md"
                  >
                    <div className="flex items-start">
                      <div
                        className={cn(
                          "flex-shrink-0 h-5 w-5 mr-2 rounded-full flex items-center justify-center",
                          currentFeature.tools[tool.id].supported
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        )}
                      >
                        {currentFeature.tools[tool.id].supported ? (
                          <Check size={12} />
                        ) : (
                          <X size={12} />
                        )}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {tool.name}
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {currentFeature.tools[tool.id].note}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowInfoModal(false)} variant="outline">
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CompareTool;
