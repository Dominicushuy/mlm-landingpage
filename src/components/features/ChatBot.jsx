import React, { useState, useRef, useEffect } from "react";
import { Send, X, User, Bot, ArrowRight } from "lucide-react";

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Chào bạn! Tôi là trợ lý ảo của MAMLM. Tôi có thể giúp gì cho bạn về Marketing Automation?",
      type: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  const quickQuestions = [
    "Làm thế nào để bắt đầu với Marketing Automation?",
    "MAMLM cung cấp giải pháp gì?",
    "Chi phí đầu tư là bao nhiêu?",
    "Có demo cho tôi xem được không?",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: botResponse,
          type: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    const userMessage = {
      id: Date.now(),
      text: question,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateResponse(question);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: botResponse,
          type: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("bắt đầu") || lowerQuery.includes("start")) {
      return `Để bắt đầu với Marketing Automation, bạn nên: 
      1. Xác định mục tiêu chiến dịch 
      2. Thu thập và phân loại dữ liệu khách hàng 
      3. Tích hợp hệ thống CRM 
      4. Tạo nội dung cá nhân hoá 
      5. Triển khai và theo dõi kết quả
      
      Chúng tôi có thể hỗ trợ bạn từng bước trong quá trình này.`;
    }

    if (lowerQuery.includes("giải pháp") || lowerQuery.includes("solution")) {
      return `MAMLM cung cấp các giải pháp toàn diện cho doanh nghiệp MLM:
      • Tự động hóa quản lý liên hệ và CRM
      • Tự động hóa Email Marketing
      • Tự động hóa quản lý hoa hồng
      • Tích hợp phân tích dữ liệu (BI)
      • Tích hợp các kênh tiếp thị số`;
    }

    if (
      lowerQuery.includes("chi phí") ||
      lowerQuery.includes("cost") ||
      lowerQuery.includes("giá")
    ) {
      return `MAMLM có 3 gói dịch vụ chính:
      • Gói Startup: 500 triệu VNĐ
      • Gói Doanh nghiệp: 2 tỷ VNĐ
      • Gói Enterprise: Tuỳ chỉnh theo nhu cầu
      
      Bạn muốn tìm hiểu chi tiết về gói nào?`;
    }

    if (lowerQuery.includes("demo")) {
      return `Chúng tôi có thể cung cấp demo giải pháp Marketing Automation. 
      Vui lòng để lại email của bạn và nhóm kinh doanh sẽ liên hệ trong 24h.
      
      Hoặc bạn có thể xem video demo trên trang chủ của chúng tôi.`;
    }

    // Default response
    return `Cảm ơn bạn đã quan tâm đến giải pháp Marketing Automation của MAMLM. 
    Bạn có thể hỏi tôi về các giải pháp, chi phí đầu tư, hoặc cách bắt đầu với Marketing Automation.
    
    Hoặc nếu bạn muốn được tư vấn trực tiếp, vui lòng để lại thông tin liên hệ.`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed bottom-24 left-8 z-50 w-80 sm:w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Trợ lý MAMLM</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-blue-700 dark:hover:bg-blue-800 rounded-full p-1"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-xs sm:max-w-sm ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  message.type === "user"
                    ? "bg-blue-100 text-blue-600 ml-2"
                    : "bg-blue-600 text-white mr-2"
                }`}
              >
                {message.type === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div>
                <div
                  className={`p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
                <p
                  className={`text-xs mt-1 ${
                    message.type === "user" ? "text-right" : ""
                  } text-gray-500`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex max-w-xs sm:max-w-sm">
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-600 text-white mr-2">
                <Bot className="h-4 w-4" />
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </div>

      {/* Quick questions */}
      <div className="p-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <div className="flex space-x-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="flex-shrink-0 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-xs rounded-full px-3 py-1 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 p-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className={`rounded-full p-2 ${
            input.trim()
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-400"
          } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
