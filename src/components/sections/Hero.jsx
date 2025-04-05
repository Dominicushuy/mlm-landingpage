/**
 * Modern Hero Section with Glassmorphism, 3D Effects and Framer Motion Animations
 * Uses the latest UI/UX trends for 2025
 *
 * Features:
 * - Glassmorphism with gradient backgrounds and particle animation
 * - Serif/sans-serif font pairing for modern typography
 * - Micro-interactions on hover/active states
 * - Animated section transitions using Framer Motion
 * - Subtle 3D elements with CSS transforms and perspective
 * - Enhanced visual hierarchy for primary CTA
 */

import React, { forwardRef, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion"; // Requires installation
import { Check, ArrowRight, PlusCircle } from "lucide-react";
import { Section } from "../layout/section";
import { Container, Grid, GridItem, Flex } from "../layout/container";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveCard } from "../ui/responsive-card";
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

const Hero = forwardRef(({ isVisible, scrollToSection, darkMode }, ref) => {
  // State management
  const [typedText, setTypedText] = useState("");
  const fullText = "dành cho MLM";
  const [showDemo, setShowDemo] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);

  // Typing effect animation
  useEffect(() => {
    if (isVisible) {
      let i = 0;
      const typing = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
        }
      }, 100);
      return () => clearInterval(typing);
    }
  }, [isVisible]);

  // Track mouse position for 3D parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
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

  // Animation variants for staggered animations
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

  // Button animation variants
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.98 },
  };

  return (
    <Section
      id="intro"
      ref={(node) => {
        ref.current = node;
        heroRef.current = node;
      }}
      variant={darkMode ? "gradient" : "default"}
      className="min-h-[90vh] flex items-center relative overflow-hidden"
      isVisible={isVisible}
      animation="fade-in"
    >
      {/* Particle animation background */}
      <ParticlesBackground />

      {/* Glassmorphism decorative elements */}
      <GlassmorphismBackground
        darkMode={darkMode}
        mousePosition={mousePosition}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={parentVariants}
        >
          {/* Standard Tailwind grid with explicit breakpoints */}
          <div className="py-12 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left column - Main content */}
              <div className="order-1 md:order-1">
                <motion.div
                  variants={childVariants}
                  className="space-y-6 relative z-10"
                >
                  {/* Badge - Enhanced with glassmorphism */}
                  <motion.div variants={childVariants} className="inline-block">
                    <div className="flex items-center space-x-2 mb-4 bg-blue-100/80 backdrop-blur-sm dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-800/50">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      <span>Kỷ nguyên mới của Marketing Automation</span>
                    </div>
                  </motion.div>

                  {/* Main heading - Using serif font for contrast */}
                  <motion.h1
                    variants={childVariants}
                    className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-blue-800 dark:text-blue-300 leading-tight"
                  >
                    Marketing{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                      Automation
                    </span>
                    <br />
                    <span className="relative">
                      <span className="mr-1">{typedText}</span>
                      <span
                        className={`absolute w-0.5 h-8 bg-blue-600 dark:bg-blue-400 -right-1 bottom-1 ${
                          typedText === fullText ? "animate-blink" : "opacity-0"
                        }`}
                      ></span>
                    </span>
                  </motion.h1>

                  {/* Description - Using sans-serif font */}
                  <motion.p
                    variants={childVariants}
                    className="text-xl font-sans text-gray-600 dark:text-gray-300 max-w-xl"
                  >
                    Chuyển đổi số và tự động hóa tiếp thị cho mô hình kinh doanh
                    đa cấp trong kỷ nguyên thương mại điện tử.
                  </motion.p>

                  {/* Feature list */}
                  <motion.div
                    variants={childVariants}
                    className="space-y-4 pt-2"
                  >
                    <FeatureCheckItem text="Tăng hiệu quả hoạt động và doanh thu" />
                    <FeatureCheckItem text="Cá nhân hoá trải nghiệm khách hàng" />
                    <FeatureCheckItem text="Tăng cường minh bạch trong quản lý" />
                  </motion.div>

                  {/* CTA Buttons - Enhanced with animations */}
                  <motion.div variants={childVariants}>
                    <div className="flex gap-4 pt-4">
                      {/* Primary CTA - With glow effect */}
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="relative"
                      >
                        {/* Glow effect behind the button */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 blur opacity-40 rounded-md transform scale-105"></div>

                        {/* Main button with z-index to sit above glow */}
                        <Button
                          onClick={() => scrollToSection("invest")}
                          variant="default"
                          className="relative z-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow-lg"
                        >
                          Tìm hiểu về đầu tư
                          <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                        </Button>
                      </motion.div>

                      {/* Secondary CTA */}
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          onClick={() => setShowDemo(!showDemo)}
                          variant="outline"
                          className="backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 dark:text-blue-200 transition-all duration-300"
                        >
                          Xem demo
                          <PlusCircle className="ml-2 -mr-1 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right column - Feature card with 3D effect */}
              <div className="order-2 md:order-2">
                <motion.div
                  variants={childVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{
                    // 3D transformation based on mouse position
                    transformStyle: "preserve-3d",
                    transform: `perspective(1000px) rotateY(${
                      (mousePosition.x - 0.5) * 5
                    }deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)`,
                  }}
                  className="transition-all duration-300 relative z-10"
                >
                  {/* Content with integrated design - no extra card wrapper */}
                  <div className="rounded-xl overflow-hidden shadow-xl">
                    {/* Solutions section with gradient background */}
                    <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 dark:from-blue-800 dark:via-blue-700 dark:to-blue-600 p-6 text-white relative overflow-hidden">
                      {/* Creative background elements */}
                      <div className="absolute inset-0">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          className="absolute inset-0 opacity-10"
                        >
                          <defs>
                            <linearGradient
                              id="grid-gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#fff"
                                stopOpacity="0.1"
                              />
                              <stop
                                offset="50%"
                                stopColor="#fff"
                                stopOpacity="0.2"
                              />
                              <stop
                                offset="100%"
                                stopColor="#fff"
                                stopOpacity="0.1"
                              />
                            </linearGradient>
                          </defs>
                          <pattern
                            id="grid"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M 10 0 L 0 0 0 10"
                              fill="none"
                              stroke="url(#grid-gradient)"
                              strokeWidth="0.5"
                            />
                          </pattern>
                          <rect width="100" height="100" fill="url(#grid)" />
                        </svg>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform -translate-y-1/3 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-300/10 rounded-full blur-lg transform translate-y-1/3 -translate-x-1/3"></div>
                      </div>

                      {/* Floating icons */}
                      <motion.div
                        className="absolute -right-3 top-10 text-white/20 transform rotate-12"
                        animate={{
                          y: [0, -10, 0],
                          rotate: [12, 5, 12],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                      </motion.div>

                      <motion.div
                        className="absolute left-0 bottom-12 text-white/10 transform -rotate-12"
                        animate={{
                          y: [0, 10, 0],
                          rotate: [-12, -5, -12],
                        }}
                        transition={{
                          duration: 7,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                          <line x1="9" y1="9" x2="9.01" y2="9"></line>
                          <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                      </motion.div>

                      {/* Modern title design with animated line */}
                      <div className="relative z-10 mb-6">
                        <h2 className="text-2xl font-serif font-bold mb-1 inline-block relative">
                          Chúng tôi mang đến giải pháp
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-200 dark:to-indigo-200"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: 1,
                              delay: 0.8,
                              ease: "easeOut",
                            }}
                          />
                        </h2>
                        <p className="text-blue-100 opacity-80 mt-2 text-sm">
                          Những công nghệ hiện đại tạo nên sự khác biệt
                        </p>
                      </div>

                      {/* Solution items with enhanced hover effects */}
                      <div className="space-y-1 relative z-10">
                        {[
                          "Tự động hóa quản lý liên hệ và CRM",
                          "Tự động hóa Email Marketing và nuôi dưỡng khách hàng",
                          "Tự động hóa quản lý hoa hồng và lợi ích",
                          "Tích hợp công cụ phân tích dữ liệu (BI) và báo cáo",
                          "Tự động hóa phân phối thông báo qua đa kênh",
                        ].map((text, index) => (
                          <motion.div
                            key={index}
                            className="relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.9 + index * 0.1,
                              duration: 0.5,
                            }}
                          >
                            <EnhancedSolutionItem text={text} index={index} />
                          </motion.div>
                        ))}
                      </div>

                      {/* Animated glow spot */}
                      <motion.div
                        className="absolute w-32 h-32 rounded-full bg-blue-300/30 blur-xl"
                        animate={{
                          x: [0, 100, 50, 0],
                          y: [0, 30, 60, 0],
                          opacity: [0.2, 0.4, 0.2, 0.2],
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    </div>

                    {/* Progress bars section with cleaner integrated design */}
                    <div className="bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-800/90 backdrop-blur-sm p-6 relative">
                      <div className="relative z-10">
                        <ProgressBar3D
                          label="Tiết kiệm thời gian & nguồn lực"
                          value={85}
                          color="from-blue-500 to-blue-600"
                        />
                        <ProgressBar3D
                          label="Tăng hiệu quả marketing"
                          value={78}
                          color="from-indigo-500 to-indigo-600"
                          delay={0.1}
                        />
                        <ProgressBar3D
                          label="Cải thiện trải nghiệm khách hàng"
                          value={82}
                          color="from-purple-500 to-purple-600"
                          delay={0.2}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Scroll để khám phá
        </span>
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full p-1">
          <motion.div
            className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mx-auto"
            animate={{
              y: [0, 12, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Demo Modal using the Modal component from our design system */}
      <Modal open={showDemo} onClose={() => setShowDemo(false)} size="lg">
        <ModalContent>
          <ModalCloseButton onClick={() => setShowDemo(false)} />
          <ModalHeader>
            <ModalTitle>Demo Marketing Automation</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-6 backdrop-blur-sm">
              <p className="text-gray-700 dark:text-gray-300">
                Nhập email của bạn để xem cách Marketing Automation hoạt động.
                Bạn sẽ nhận được một chuỗi email tự động thể hiện quy trình nuôi
                dưỡng khách hàng.
              </p>
            </div>

            <form className="space-y-4">
              <FormItem>
                <FormLabel htmlFor="email">Địa chỉ email</FormLabel>
                <Input type="email" id="email" placeholder="you@example.com" />
              </FormItem>
            </form>
          </ModalBody>
          <ModalFooter>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="default"
                className="px-6 bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Bắt đầu Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Section>
  );
});

/**
 * Creates a particle animation background
 * Performance optimized by using simple divs with Framer Motion animations
 * rather than a heavy canvas implementation
 */
const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Generate 20 random particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500/10 dark:bg-blue-400/10 rounded-full z-0"
          style={{
            width: Math.random() * 8 + 3, // Smaller particles
            height: Math.random() * 8 + 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 20 - 10], // Less movement
            x: [0, Math.random() * 20 - 10],
            opacity: [0.05, 0.2, 0.05], // More subtle opacity
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

/**
 * Creates a glassmorphism effect background with interactive elements
 * Elements respond to mouse movement for a parallax effect
 */
const GlassmorphismBackground = ({ darkMode, mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large gradient circles with glassmorphism */}
      <motion.div
        className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-blue-400/15 to-indigo-500/15 dark:from-blue-500/5 dark:to-indigo-600/5 blur-3xl z-0"
        animate={{
          x: mousePosition.x * 20 - 10,
          y: mousePosition.y * 20 - 10,
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-purple-400/15 to-pink-500/15 dark:from-purple-500/5 dark:to-pink-600/5 blur-3xl z-0"
        animate={{
          x: mousePosition.x * -20 + 10,
          y: mousePosition.y * -20 + 10,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Glassmorphism circle elements - repositioned to avoid text overlap */}
      <div className="absolute top-1/3 right-10 w-48 h-48 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 dark:border-white/5 z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-36 h-36 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 dark:border-white/5 z-0"></div>

      {/* Additional decorative geometric elements - repositioned and reduced size */}
      <div className="absolute top-2/3 left-16 w-16 h-16 rounded-md bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-2xl border border-white/10 dark:border-white/5 transform rotate-45 z-0"></div>
      <div className="absolute bottom-1/5 right-1/5 w-24 h-24 rounded-md bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-2xl border border-white/10 dark:border-white/5 transform -rotate-12 z-0"></div>
    </div>
  );
};

/**
 * Enhanced feature item with hover animation
 */
const FeatureCheckItem = ({ text }) => (
  <motion.div
    className="flex items-start space-x-3"
    whileHover={{ x: 5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100/80 backdrop-blur-sm dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
      <Check className="h-4 w-4" />
    </div>
    <p className="text-lg font-sans text-gray-600 dark:text-gray-300">{text}</p>
  </motion.div>
);

/**
 * Enhanced solution item with hover effect and animated icons
 */
const EnhancedSolutionItem = ({ text, index }) => {
  // Different icons for each solution item
  const icons = [
    // CRM icon
    <svg
      key="crm"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>,
    // Email icon
    <svg
      key="email"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>,
    // Money icon
    <svg
      key="money"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>,
    // Chart icon
    <svg
      key="chart"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>,
    // Message icon
    <svg
      key="message"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>,
  ];

  return (
    <motion.div
      className="flex items-center py-2.5 px-4 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer"
      whileHover={{
        x: 5,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Animated icon container */}
      <motion.div
        className="flex-shrink-0 h-8 w-8 rounded-md bg-blue-500/30 flex items-center justify-center mr-3"
        whileHover={{
          scale: 1.1,
          backgroundColor: "rgba(59, 130, 246, 0.4)",
        }}
      >
        {icons[index]}
      </motion.div>

      {/* Text with gradient on hover */}
      <div className="relative overflow-hidden">
        <p className="font-medium group-hover:text-blue-100">{text}</p>

        {/* Light line that appears on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-300/0 via-blue-300/80 to-blue-300/0 w-full"
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.3 },
          }}
        />
      </div>
    </motion.div>
  );
};

/**
 * 3D Progress Bar Component with gradient and lighting effects
 */
const ProgressBar3D = ({
  label,
  value,
  color = "from-blue-500 to-blue-600",
  delay = 0,
}) => (
  <div className="text-center mt-6 first:mt-0">
    <p className="text-gray-600 dark:text-gray-300 mb-2 font-sans">{label}</p>
    <div className="relative w-full h-3 bg-gray-200/70 dark:bg-gray-700/70 rounded-full overflow-hidden backdrop-blur-sm">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className={`h-full rounded-full bg-gradient-to-r ${color} relative`}
      >
        {/* 3D effect with lighter gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
      </motion.div>
    </div>
    <div className="relative">
      <motion.p
        className="text-sm text-right text-gray-600 dark:text-gray-300 mt-1 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
      >
        {value}%
      </motion.p>
    </div>
  </div>
);

Hero.displayName = "Hero";

export default Hero;
