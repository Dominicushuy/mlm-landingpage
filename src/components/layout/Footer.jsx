import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  ChevronUp,
} from "lucide-react";
import { cn } from "../../lib/utils";

const Footer = ({ darkMode }) => {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll position for the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim() !== "") {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.98 },
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background with glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 z-0"></div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl opacity-30"></div>

        {/* Subtle grid patterns */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-5">
          <pattern
            id="footer-grid"
            x="0"
            y="0"
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
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 px-4 pt-16 pb-12 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        {/* Newsletter section */}
        <motion.div
          className="w-full max-w-4xl mx-auto mb-16 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-8 overflow-hidden bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500/20 rounded-full filter blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="mb-6 md:mb-0 max-w-xl">
                <h3 className="mb-2 text-2xl font-bold font-serif text-white">
                  Cập nhật thông tin{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    marketing automation
                  </span>
                </h3>
                <p className="text-blue-100/80">
                  Đăng ký nhận bản tin để cập nhật những thông tin mới nhất về
                  xu hướng marketing automation trong ngành MLM.
                </p>
              </div>

              <div className="w-full md:w-auto">
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Email của bạn"
                    className="w-full px-4 py-3 text-gray-700 bg-white/90 backdrop-blur-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
                    required
                  />
                  <motion.button
                    type="submit"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="px-5 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-r-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center"
                  >
                    {subscribed ? (
                      "Đã đăng ký!"
                    ) : (
                      <>
                        Đăng ký
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main footer grid */}
        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Company info */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-5">
              <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-md mr-2 transition-all duration-300 hover:scale-105">
                MA
              </div>
              <span className="text-3xl font-bold text-blue-400">MLM</span>
            </div>
            <p className="mb-6 text-gray-400">
              Nền tảng Marketing Automation toàn diện cho mô hình kinh doanh đa
              cấp trong kỷ nguyên số.
            </p>
            <div className="flex gap-4 mt-6">
              <SocialLink icon={Facebook} label="Facebook" />
              <SocialLink icon={Linkedin} label="LinkedIn" />
              <SocialLink icon={Twitter} label="Twitter" />
              <SocialLink icon={Instagram} label="Instagram" />
              <SocialLink icon={Youtube} label="Youtube" />
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-5 text-lg font-semibold text-white relative inline-block">
              Giải pháp
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink text="Quản lý liên hệ và CRM" href="#" />
              <FooterLink text="Email Marketing tự động hóa" href="#" />
              <FooterLink text="Quản lý hoa hồng và lợi ích" href="#" />
              <FooterLink text="Phân tích dữ liệu (BI)" href="#" />
              <FooterLink text="Tích hợp đa kênh" href="#" />
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-5 text-lg font-semibold text-white relative inline-block">
              Công ty
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink text="Về chúng tôi" href="#" />
              <FooterLink text="Đối tác chiến lược" href="#" />
              <FooterLink text="Cơ hội nghề nghiệp" href="#" />
              <FooterLink text="Blog & Tin tức" href="#" />
              <FooterLink text="Câu chuyện khách hàng" href="#" />
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-5 text-lg font-semibold text-white relative inline-block">
              Liên hệ
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></span>
            </h3>
            <ul className="space-y-4">
              <ContactItem
                icon={Phone}
                text="+84 123 456 789"
                href="tel:+84123456789"
              />
              <ContactItem
                icon={Mail}
                text="info@mamlm.vn"
                href="mailto:info@mamlm.vn"
              />
              <ContactItem
                icon={MapPin}
                text="Tầng 15, Tòa nhà Landmark 81, TP HCM"
                href="https://maps.google.com/?q=Landmark+81+Ho+Chi+Minh+City"
                showExternal={true}
              />
            </ul>
          </motion.div>
        </motion.div>

        {/* Footer bottom */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-10"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; 2025 MAMLM. Tất cả các quyền được bảo lưu.</p>
          <div className="mt-4 md:mt-0 flex space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Điều khoản dịch vụ
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <div
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer transition-all duration-500 backdrop-blur-sm border border-white/10 shadow-lg",
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <ChevronUp className="w-6 h-6" />
      </div>
    </footer>
  );
};

// Enhanced Footer Link with animation
const FooterLink = ({ text, href }) => (
  <li>
    <motion.a
      href={href}
      className="group flex items-center text-gray-400 hover:text-white transition-colors"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
      {text}
    </motion.a>
  </li>
);

// Enhanced Contact Item with animation
const ContactItem = ({ icon: Icon, text, href, showExternal = false }) => (
  <li>
    <motion.a
      href={href}
      target={showExternal ? "_blank" : "_self"}
      rel={showExternal ? "noopener noreferrer" : ""}
      className="flex items-start group"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex-shrink-0 p-2 bg-blue-600/20 rounded-md group-hover:bg-blue-500/30 transition-colors duration-300 mr-3">
        <Icon className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
      </div>
      <span className="text-gray-400 group-hover:text-white transition-colors">
        {text}
      </span>
    </motion.a>
  </li>
);

// Enhanced Social Link with animation
const SocialLink = ({ icon: Icon, label }) => (
  <motion.a
    href="#"
    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600/20 text-gray-400 hover:text-blue-400 transition-colors"
    whileHover={{
      scale: 1.1,
      rotate: 5,
    }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <span className="sr-only">{label}</span>
    <Icon className="h-5 w-5" />
  </motion.a>
);

export default Footer;
