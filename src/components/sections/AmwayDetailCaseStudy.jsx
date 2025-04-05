import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
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
  PieChart, 
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
  DollarSign
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { MainSection } from "../layout/main-layout";
import { Grid, GridItem, Flex } from "../layout/container";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const AmwayDetailCaseStudy = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("tech");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [highlightedPoint, setHighlightedPoint] = useState(null);
  const [showCase1, setShowCase1] = useState(false);
  const [showCase2, setShowCase2] = useState(false);
  const [hoveredChart, setHoveredChart] = useState(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  
  // Technology integration tab features
  const techFeatures = [
    {
      id: "crm",
      title: "CRM Integration",
      icon: Database,
      description: "Advanced customer management & distribution network tracking",
      stats: { effectiveness: 86, adoption: 78, roi: 92 }
    },
    {
      id: "mobile",
      title: "Mobile Applications",
      icon: Smartphone,
      description: "Seamless ordering and network management on-the-go",
      stats: { effectiveness: 91, adoption: 85, roi: 88 }
    },
    {
      id: "blockchain",
      title: "Blockchain Technology",
      icon: Lock,
      description: "Enhanced transparency in transactions and commissions",
      stats: { effectiveness: 79, adoption: 62, roi: 74 }
    },
    {
      id: "analytics",
      title: "Advanced Analytics",
      icon: BarChart2,
      description: "Data-driven insights for performance optimization",
      stats: { effectiveness: 94, adoption: 76, roi: 89 }
    }
  ];

  // CRM features
  const crmFeatures = [
    {
      id: "automation",
      title: "Marketing Automation",
      icon: Zap,
      description: "Automated campaign execution across multiple channels",
      color: "blue"
    },
    {
      id: "email",
      title: "Email Campaigns",
      icon: Mail,
      description: "Personalized drip campaigns for customer nurturing",
      color: "indigo"
    },
    {
      id: "segmentation",
      title: "Customer Segmentation",
      icon: Filter,
      description: "Advanced audience targeting based on behavior & demographics",
      color: "purple"
    },
    {
      id: "network",
      title: "Network Management",
      icon: Users,
      description: "Comprehensive distributor relationship and performance tracking",
      color: "pink"
    }
  ];

  // Data analytics integration
  const dataPoints = [
    {
      id: "sales",
      title: "Sales Performance",
      value: "$7.7B",
      change: "-4.9%",
      prediction: "Forecasted to stabilize by 2026",
      color: "blue"
    },
    {
      id: "retention",
      title: "Customer Retention",
      value: "68%",
      change: "+2.3%",
      prediction: "Continued improvement with personalization",
      color: "green"
    },
    {
      id: "growth",
      title: "Distributor Growth",
      value: "2.4M",
      change: "-1.8%",
      prediction: "Expected to rise with digital transformation",
      color: "purple"
    },
    {
      id: "engagement",
      title: "Digital Engagement",
      value: "43%",
      change: "+15.6%",
      prediction: "Rapid growth as digital initiatives expand",
      color: "orange"
    }
  ];

  // Future trends data
  const futureImpact = [
    { id: "ai", trend: "AI & Machine Learning", impact: 9.2, readiness: 6.8, timeframe: "1-2 years" },
    { id: "vr", trend: "Virtual Sales Experiences", impact: 8.7, readiness: 7.2, timeframe: "Now" },
    { id: "blockchain", trend: "Blockchain Integration", impact: 7.9, readiness: 5.4, timeframe: "2-3 years" },
    { id: "personalize", trend: "Personalization at Scale", impact: 9.5, readiness: 7.8, timeframe: "Now" },
    { id: "ar", trend: "Augmented Reality Product Demos", impact: 8.3, readiness: 6.1, timeframe: "1-2 years" }
  ];

  // FAQ items
  const faqs = [
    {
      id: "commission",
      question: "How does Amway manage distributor commissions through technology?",
      answer: "Amway uses an integrated blockchain-based commission system that automatically calculates and distributes earnings based on sales data and network performance. This system provides real-time transparency, allowing distributors to track their earnings through mobile apps and web dashboards. The technology has reduced commission processing time by 74% while increasing accuracy to 99.8%."
    },
    {
      id: "crm-roi",
      question: "What CRM features have delivered the highest ROI for Amway?",
      answer: "Amway's highest ROI CRM features include personalized customer journey orchestration (215% ROI), predictive analytics for purchase recommendations (187% ROI), and automated multi-channel campaign management (163% ROI). These features have significantly improved customer retention rates and increased average order values by creating seamless, personalized experiences across all touchpoints."
    },
    {
      id: "big-data",
      question: "How is Big Data analytics transforming Amway's MLM operations?",
      answer: "Big Data analytics has revolutionized Amway's operations by enabling predictive demand forecasting (reducing inventory costs by 23%), identifying high-potential distributors through behavioral pattern recognition, optimizing product development through customer feedback analysis, and creating territory-specific strategies based on regional performance data. These insights have transformed decision-making from reactive to proactive."
    },
    {
      id: "security",
      question: "What security measures protect Amway's digital systems?",
      answer: "Amway implements enterprise-grade security through multi-layered protection including end-to-end encryption for all transactions, multi-factor authentication for system access, regular penetration testing and security audits, advanced threat detection systems, and strict compliance with international data protection regulations including GDPR. Their security infrastructure is continuously updated to address emerging threats."
    },
    {
      id: "emerging-tech",
      question: "Which emerging technologies will shape Amway's future?",
      answer: "Key technologies shaping Amway's future include AI-powered personalization engines that tailor recommendations at individual levels, augmented reality product demonstrations allowing virtual product testing, blockchain-based product authentication to combat counterfeiting, voice commerce integration for frictionless ordering, and IoT-enabled products that enhance customer experience while generating valuable usage data for continuous improvement."
    }
  ];

  // Timeline data
  const timeline = [
    { id: "2018", year: 2018, event: "Digital Transformation Initiative Launched", description: "Comprehensive overhaul of legacy systems" },
    { id: "2019", year: 2019, event: "Global CRM Implementation", description: "Unified customer data across 100+ markets" },
    { id: "2020", year: 2020, event: "Mobile App Relaunch", description: "Enhanced distributor tools and customer interface" },
    { id: "2021", year: 2021, event: "Advanced Analytics Platform", description: "Predictive insights for distributors and management" },
    { id: "2022", year: 2022, event: "Blockchain Pilot Program", description: "Transparent commission structure and payments" },
    { id: "2023", year: 2023, event: "AI-Powered Marketing Automation", description: "Personalized campaigns at scale with machine learning" },
    { id: "2024", year: 2024, event: "Immersive AR Product Experiences", description: "Virtual product demonstrations and training" },
    { id: "2025", year: 2025, event: "Planned: Full Digital Integration", description: "Seamless omnichannel presence and operations" }
  ];

  // Stats data with unique ids
  const statsData = [
    { 
      id: "revenue", 
      label: "Annual Revenue", 
      value: "$7.7B", 
      change: "-4.9%", 
      icon: <DollarSign className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
      description: "2023 fiscal year"
    },
    { 
      id: "digital", 
      label: "Digital Engagement", 
      value: "43%", 
      change: "+15.6%", 
      icon: <Smartphone className="h-5 w-5 text-purple-500 dark:text-purple-400" />,
      description: "Orders via digital channels"
    },
    { 
      id: "distributors", 
      label: "Active Distributors", 
      value: "2.4M", 
      change: "-1.8%", 
      icon: <Users className="h-5 w-5 text-green-500 dark:text-green-400" />,
      description: "Across 100+ markets"
    },
    { 
      id: "investment", 
      label: "Tech Investment", 
      value: "$380M", 
      change: "+24.2%", 
      icon: <Zap className="h-5 w-5 text-amber-500 dark:text-amber-400" />,
      description: "Digital infrastructure spend"
    }
  ];

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const windowScroll = scrollTop;
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Only update if section is in view
      if (containerRect.top < clientHeight && containerRect.bottom > 0) {
        const scrolled = (windowScroll - (containerRect.top + windowScroll - clientHeight)) / 
                        (containerRect.height + clientHeight);
        setScrollProgress(Math.min(Math.max(scrolled, 0), 1));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse position for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track section visibility
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  // Auto-reveal case studies
  useEffect(() => {
    if (scrollProgress > 0.3 && !showCase1) {
      setShowCase1(true);
    }
    if (scrollProgress > 0.6 && !showCase2) {
      setShowCase2(true);
    }
  }, [scrollProgress, showCase1, showCase2]);

  // Toggle FAQ expansion
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div
      id="amway-detail"
      ref={containerRef}
      className="relative overflow-hidden"
    >
      {/* Progress indicator */}
      <div className="fixed top-1/2 right-6 w-1 h-64 bg-gray-200 dark:bg-gray-700 rounded-full transform -translate-y-1/2 z-50 hidden lg:block">
        <motion.div 
          className="w-1 bg-blue-500 dark:bg-blue-400 rounded-full"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-800 via-indigo-900 to-purple-900 overflow-hidden">
          {/* Grid pattern overlay */}
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
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
          
          {/* Animated glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 filter blur-[100px] opacity-20 animate-float"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-indigo-500 filter blur-[120px] opacity-20 animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-purple-500 filter blur-[80px] opacity-15 animate-float-slow"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-sm font-medium mb-4">
              Case Study Analysis
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Amway<span className="text-blue-300">:</span> Digital Transformation
              <br />
              in<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"> Network Marketing</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-blue-100 mb-8">
              An in-depth analysis of how Amway integrates technology, automation, and data analytics to revolutionize its MLM business model
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8"
            >
              <Button 
                onClick={() => {
                  const element = document.getElementById("study-content");
                  element.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-indigo-700 hover:bg-blue-50 px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg"
              >
                Explore the Study
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 flex flex-col items-center"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <p className="text-sm mb-2">Scroll to explore</p>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </div>

      {/* Main Content */}
      <section 
        id="study-content" 
        ref={sectionRef} 
        className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/10"
      >
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Introduction & Key Performance Indicators */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="mb-20"
          >
            <motion.div 
              variants={itemVariants}
              className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8"
            >
              <div className="md:w-1/2">
                <div className="inline-block px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4">
                  Executive Summary
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Digital Transformation Journey
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Amway, a global leader in direct selling with annual revenue of $7.7 billion, has embarked on a comprehensive digital transformation to modernize its MLM business model. This case study examines how technology integration, marketing automation, and data analytics have reshaped the company's approach to distributor management and customer engagement.
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <Button 
                    variant="outline" 
                    className="rounded-full flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
                  >
                    <Download className="h-4 w-4" />
                    Download Full Report
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="rounded-full flex items-center gap-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Amway Digital Hub
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2 rounded-xl overflow-hidden relative">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative overflow-hidden rounded-xl shadow-xl">
                  {/* Video thumbnail with play button */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40">
                    <img 
                      src="/api/placeholder/800/450" 
                      alt="Amway Digital Transformation Video" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVideoPlaying(true)}
                    className="z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  >
                    <Play className="h-8 w-8 text-blue-600 ml-1" />
                  </motion.button>
                  
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-white text-sm">
                    4:26
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Key Statistics Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            >
              {statsData.map((stat) => (
                <motion.div
                  key={stat.id}
                  custom={stat.id}
                  variants={staggerCardVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                      {stat.icon}
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.change.startsWith('+') 
                        ? 'text-green-500 dark:text-green-400' 
                        : 'text-red-500 dark:text-red-400'
                    } flex items-center`}>
                      {stat.change.startsWith('+') 
                        ? <TrendingUp className="h-3 w-3 mr-1" /> 
                        : <TrendingDown className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </h3>
                  <div className="mt-1">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Digital Transformation Timeline */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={controls}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 text-sm font-medium mb-4">
                Transformation Journey
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Amway's Digital Evolution Timeline
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Tracking the key milestones in Amway's transition from traditional MLM to a technology-driven business model
              </p>
            </div>
            
            <div className="relative">
              {/* Main timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-800/50 rounded-full"></div>
              
              <div className="relative">
                {timeline.map((item, index) => (
                  <motion.div 
                    key={`timeline-${item.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: scrollProgress > (index / timeline.length * 0.7) ? 1 : 0,
                      y: scrollProgress > (index / timeline.length * 0.7) ? 0 : 20
                    }}
                    transition={{ duration: 0.5 }}
                    className={`relative z-10 flex items-center justify-center mb-12 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline content */}
                    <div className="w-full md:w-5/12 px-4">
                      <div className={`p-6 rounded-xl shadow-md transform transition-all duration-500 h-full
                        ${index % 2 === 0 
                          ? 'md:translate-x-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' 
                          : 'md:-translate-x-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                        } border border-gray-100 dark:border-gray-700/50`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center
                            ${index % 2 === 0 
                              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300' 
                              : 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300'
                            }`}
                          >
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {item.year}
                          </div>
                          {item.year <= 2023 && (
                            <div className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 px-2 py-0.5 rounded-full text-xs">
                              Completed
                            </div>
                          )}
                          {item.year > 2023 && (
                            <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs">
                              Planned
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
                    
                    {/* Center point */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center z-10
                        ${index % 2 === 0 
                          ? 'bg-blue-500 dark:bg-blue-400' 
                          : 'bg-purple-500 dark:bg-purple-400'
                        }`}
                      >
                        <span className="text-white text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Empty space on the other side for balance */}
                    <div className="w-full md:w-5/12 px-4"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Interactive Tabs Section */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-4">
                Digital Transformation Analysis
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Technology Integration & Strategy
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Explore the technological pillars of Amway's digital transformation strategy
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-1 bg-gray-100 dark:bg-gray-700">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid grid-cols-4 bg-transparent">
                    <TabsTrigger 
                      value="tech" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                    >
                      <Database className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Tech Integration</span>
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
                      <span className="hidden md:inline">Data Analytics</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="trends" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-lg"
                    >
                      <Zap className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Future Trends</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Tab Content */}
              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "tech" && <TechnologyIntegrationTab techFeatures={techFeatures} />}
                    {activeTab === "crm" && <CrmMarketingTab crmFeatures={crmFeatures} />}
                    {activeTab === "data" && <DataAnalyticsTab dataPoints={dataPoints} />}
                    {activeTab === "trends" && <FutureTrendsTab futureImpact={futureImpact} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Case Studies Section - Reveal on scroll */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 text-sm font-medium mb-4">
                Success Stories
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Real-World Impact
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Examining the results of Amway's digital transformation initiatives across markets
              </p>
            </div>
            
            <div className="space-y-12">
              <AnimatePresence>
                {showCase1 && (
                  <motion.div
                    key="case1"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl overflow-hidden shadow-xl border border-blue-100 dark:border-blue-800/30"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                      <div className="col-span-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-800">
                          <img 
                            src="/api/placeholder/600/800" 
                            alt="Asia Pacific Digital Transformation" 
                            className="h-full w-full object-cover mix-blend-overlay opacity-60"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/90 via-blue-700/60 to-transparent"></div>
                        <div className="relative p-6 md:p-8 flex h-full">
                          <div className="mt-auto">
                            <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm inline-block mb-4">
                              Case Study #1
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                              Asia Pacific Market Transformation
                            </h3>
                            <div className="flex items-center text-blue-100 mb-4">
                              <Users className="h-5 w-5 mr-2" />
                              <span>12.4M customers across 8 markets</span>
                            </div>
                            <div className="flex space-x-3 mt-4">
                              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">Mobile-First</span>
                              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">Social Commerce</span>
                              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">WeChat Integration</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-3 p-6 md:p-8">
                        <div className="space-y-6">
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Revenue Growth
                              </p>
                              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                +16.8%
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Mobile Orders
                              </p>
                              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                74%
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Digital Engagement
                              </p>
                              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                4.7M
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Challenge
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              Amway faced declining engagement in the Asia Pacific region, with traditional MLM methods failing to resonate with tech-savvy Millennial and Gen Z consumers. Mobile adoption was high, but Amway's systems were primarily desktop-focused.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Solution
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              The company implemented a mobile-first strategy with integrated social commerce capabilities, allowing distributors to share and sell products directly through popular platforms like WeChat and LINE. Key initiatives included:
                            </p>
                            <ul className="space-y-2 mb-4">
                              {[
                                "WeChat Mini-Program integration for seamless product browsing and purchasing",
                                "Social sharing automation with personalized affiliate links",
                                "Mobile AR product experiences for virtual try-before-you-buy",
                                "Gamified distributor training and customer engagement"
                              ].map((item, i) => (
                                <li key={`case1-item-${i}`} className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Results
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              Within 18 months, Amway APAC achieved a 16.8% revenue growth, with 74% of orders coming through mobile channels. Distributor acquisition costs decreased by 42%, while average distributor age dropped from 47 to 39 years.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {showCase2 && (
                  <motion.div
                    key="case2"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl overflow-hidden shadow-xl border border-purple-100 dark:border-purple-800/30"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                      <div className="col-span-3 p-6 md:p-8 order-2 lg:order-1">
                        <div className="space-y-6">
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Automation ROI
                              </p>
                              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                314%
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Productivity Gain
                              </p>
                              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                +42%
                              </p>
                            </div>
                            <div className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-4 text-center">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                                Commission Accuracy
                              </p>
                              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                99.8%
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Challenge
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              Amway's European operations struggled with inefficient manual processes for commission calculations, distributor onboarding, and compliance management. This created delays, errors, and distributor dissatisfaction.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Solution
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              Amway developed an integrated automation platform called "AmwayNext" that revolutionized operations through:
                            </p>
                            <ul className="space-y-2 mb-4">
                              {[
                                "Blockchain-based commission calculations with real-time dashboard visibility",
                                "AI-powered compliance monitoring for regulatory adherence across different EU markets",
                                "Automated distributor onboarding with KYC verification",
                                "Predictive inventory management tied to distributor activity patterns"
                              ].map((item, i) => (
                                <li key={`case2-item-${i}`} className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                              Results
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              The solution delivered a 314% ROI within two years, with commission processing time reduced from 5 days to 4 hours. Compliance violations decreased by 87%, while distributor satisfaction scores improved from 72% to 91%.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-2 relative overflow-hidden order-1 lg:order-2">
                        <div className="absolute inset-0 bg-purple-600 dark:bg-purple-800">
                          <img 
                            src="/api/placeholder/600/800" 
                            alt="European Operations Automation" 
                            className="h-full w-full object-cover mix-blend-overlay opacity-60"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-800/90 via-purple-700/60 to-transparent"></div>
                        <div className="relative p-6 md:p-8 flex h-full">
                          <div className="mt-auto">
                            <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm inline-block mb-4">
                              Case Study #2
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                              European Operations Automation
                            </h3>
                            <div className="flex items-center text-purple-100 mb-4">
                              <Zap className="h-5 w-5 mr-2" />
                              <span>Serving 18 markets across Europe</span>
                            </div>
                            <div className="flex space-x-3 mt-4">
                              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">Blockchain</span>
                              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">Automation</span>
                              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">Compliance</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 text-sm font-medium mb-4">
                Questions & Answers
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                Detailed insights into Amway's digital transformation approach
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                {faqs.map((faq, index) => (
                  <div
                    key={`faq-${faq.id}`}
                    className={`border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-all ${
                      expandedFaq === index ? 'bg-gray-50 dark:bg-gray-700/50' : ''
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

                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          key={`faq-answer-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative">
              {/* Background elements */}
              <div className="absolute inset-0 overflow-hidden opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                      <rect width="100" height="100" fill="url(#smallGrid)" />
                      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
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
                    Ready to Transform Your MLM Business?
                  </h2>
                  <p className="text-blue-100 text-lg max-w-2xl">
                    Learn how our Marketing Automation platform can help you achieve similar results to Amway's digital transformation journey.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 shadow-lg hover:shadow-xl transition-all rounded-full"
                  >
                    Request Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 px-8 py-3 backdrop-blur-sm rounded-full"
                  >
                    Download Case Study
                    <Download className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Tab content components
const TechnologyIntegrationTab = ({ techFeatures }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Key Technology Integrations
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway has transformed its traditional MLM approach by integrating cutting-edge technologies that streamline operations, enhance distributor effectiveness, and create seamless customer experiences across all touchpoints.
        </p>
        
        <div className="mt-8 space-y-6">
          {techFeatures.map((feature, index) => (
            <motion.div
              key={`tech-feature-${feature.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-inner">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Implementation Effectiveness
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Performance metrics of key technology pillars in Amway's digital transformation
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
                <motion.div 
                  className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${feature.stats.effectiveness}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Adoption Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-grow">
                      <motion.div 
                        className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.stats.adoption}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {feature.stats.adoption}%
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">ROI Score</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-grow">
                      <motion.div 
                        className="h-full bg-purple-500 dark:bg-purple-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.stats.roi}%` }}
                        transition={{ duration: 1, delay: 0.9 }}
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
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">Integration Insight</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Blockchain technology shows the lowest adoption rate but is projected to become a critical differentiator by 2026 as transparency requirements increase across global markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Traditional vs. Digital MLM Approach
      </h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 dark:bg-blue-800/50">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                Business Area
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                Traditional MLM
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                Technology-Enabled MLM
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-blue-200 dark:border-blue-700/50">
                Impact
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-200 dark:divide-blue-700/50">
            {[
              {
                id: "recruitment",
                area: "Distributor Recruitment",
                traditional: "In-person presentations, manual registration",
                digital: "AI-matched leads, digital onboarding, video training",
                impact: "74% faster onboarding, 62% lower acquisition cost"
              },
              {
                id: "ordering",
                area: "Order Processing",
                traditional: "Paper orders, manual entry, batch processing",
                digital: "Mobile ordering, subscription automation, real-time inventory",
                impact: "98% order accuracy, 3.2x faster fulfillment"
              },
              {
                id: "compensation",
                area: "Compensation Management",
                traditional: "Manual calculations, monthly processing, limited transparency",
                digital: "Blockchain-verified transactions, real-time dashboards",
                impact: "99.8% accuracy, 83% reduction in disputes"
              },
              {
                id: "relationship",
                area: "Customer Relationship",
                traditional: "Generic marketing, intermittent communication",
                digital: "Personalized engagement, omnichannel presence, predictive recommendations",
                impact: "32% higher customer lifetime value, 28% better retention"
              },
            ].map((row, index) => (
              <tr key={`approach-${row.id}`} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/10'}>
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
              </tr>
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
          Marketing Automation & CRM Strategy
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway has modernized its customer relationship management and marketing processes, shifting from a traditional sales-oriented model to a digitally-driven, personalized engagement strategy that leverages automation and data intelligence.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {crmFeatures.map((feature, index) => {
            const colorMap = {
              blue: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 border-blue-200 dark:border-blue-700/30",
              indigo: "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/30 border-indigo-200 dark:border-indigo-700/30",
              purple: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 border-purple-200 dark:border-purple-700/30",
              pink: "from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/30 border-pink-200 dark:border-pink-700/30"
            };
            
            const iconColors = {
              blue: "text-blue-600 dark:text-blue-400",
              indigo: "text-indigo-600 dark:text-indigo-400",
              purple: "text-purple-600 dark:text-purple-400",
              pink: "text-pink-600 dark:text-pink-400"
            };
            
            return (
              <motion.div
                key={`crm-feature-${feature.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`bg-gradient-to-br ${colorMap[feature.color]} border rounded-xl p-5 shadow-sm`}
              >
                <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm inline-block mb-4 ${iconColors[feature.color]}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/30">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            Key Automation Workflows
          </h4>
          
          <div className="space-y-6">
            {[
              {
                id: "onboarding",
                name: "Distributor Onboarding Journey",
                stages: [
                  "Registration & KYC Verification",
                  "Welcome Email Series (5 emails)",
                  "Product Training Nudges",
                  "Business Building Milestones",
                  "Ongoing Performance Coaching"
                ],
                metrics: [
                  "74% completion rate",
                  "3.2x faster time to first sale",
                  "41% higher 90-day retention"
                ]
              },
              {
                id: "nurture",
                name: "Customer Nurture Sequence",
                stages: [
                  "Welcome Series",
                  "Product Education",
                  "Social Proof & Testimonials",
                  "Cross-sell Recommendations",
                  "Loyalty Program Engagement"
                ],
                metrics: [
                  "28% increase in repeat purchases",
                  "47% higher email engagement",
                  "32% increase in average order value"
                ]
              }
            ].map((workflow, i) => (
              <div key={`workflow-${workflow.id}`} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-indigo-100 dark:border-indigo-800/30">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">{workflow.name}</h5>
                
                <div className="relative">
                  {/* Connecting line */}
                  <div className="absolute top-4 left-3 h-full w-0.5 bg-indigo-200 dark:bg-indigo-700/50"></div>
                  
                  <div className="space-y-4 relative">
                    {workflow.stages.map((stage, j) => (
                      <div key={`workflow-${workflow.id}-stage-${j}`} className="flex items-center ml-1">
                        <div className="w-5 h-5 rounded-full bg-indigo-500 dark:bg-indigo-400 z-10 flex-shrink-0"></div>
                        <div className="ml-4 text-sm text-gray-600 dark:text-gray-300">{stage}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h6 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">PERFORMANCE METRICS</h6>
                  <div className="flex flex-wrap gap-2">
                    {workflow.metrics.map((metric, j) => (
                      <span key={`workflow-${workflow.id}-metric-${j}`} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs rounded-md">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="order-1 lg:order-2">
        <div className="sticky top-24 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-xl text-white overflow-hidden shadow-xl">
            <div className="p-6">
              <h4 className="font-bold text-xl mb-4">CRM Implementation Impact</h4>
              <p className="text-indigo-100 mb-6">
                Key performance indicators after implementing Amway's integrated CRM and marketing automation platform
              </p>
              
              <div className="space-y-6">
                {[
                  { id: "response", label: "Lead Response Time", before: "24 hours", after: "8 minutes", improvement: "-99.4%" },
                  { id: "setup", label: "Campaign Setup Time", before: "2 weeks", after: "3 hours", improvement: "-98.9%" },
                  { id: "conversion", label: "Conversion Rate", before: "2.4%", after: "6.8%", improvement: "+183%" },
                  { id: "satisfaction", label: "Customer Satisfaction", before: "72%", after: "91%", improvement: "+26%" }
                ].map((metric, i) => (
                  <div key={`impact-${metric.id}`} className="flex justify-between items-center pb-2 border-b border-indigo-500 dark:border-indigo-400/30">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <div className="flex items-center gap-3">
                      <div className="text-xs px-2 py-1 bg-white/10 rounded">
                        {metric.before}
                      </div>
                      <ChevronRight className="h-4 w-4 text-indigo-300" />
                      <div className="text-xs px-2 py-1 bg-white/20 rounded font-medium">
                        {metric.after}
                      </div>
                      <div className={`text-xs font-medium ${
                        metric.improvement.startsWith('+') 
                          ? 'text-green-300' 
                          : 'text-red-300'
                      }`}>
                        {metric.improvement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Technology Stack</h4>
            
            <div className="space-y-4">
              {[
                { id: "crm", name: "CRM Platform", value: "Salesforce Marketing Cloud" },
                { id: "email", name: "Email Automation", value: "Salesforce Pardot" },
                { id: "cdp", name: "Customer Data Platform", value: "Segment" },
                { id: "personalization", name: "Personalization Engine", value: "Dynamic Yield" },
                { id: "analytics", name: "Analytics Platform", value: "Looker + Tableau" }
              ].map((tech, i) => (
                <div key={`tech-${tech.id}`} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{tech.name}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{tech.value}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Integration between legacy systems and new platforms was the most significant technical challenge, requiring custom middleware development.
                </p>
              </div>
            </div>
          </div>
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
          Data Analytics & Business Intelligence
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway has transformed its decision-making processes through comprehensive data analytics and machine learning, turning vast datasets into actionable insights that drive strategic initiatives and operational improvements.
        </p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataPoints.map((point, index) => {
            const colorMap = {
              blue: "border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20",
              green: "border-green-200 dark:border-green-700/50 bg-green-50 dark:bg-green-900/20",
              purple: "border-purple-200 dark:border-purple-700/50 bg-purple-50 dark:bg-purple-900/20",
              orange: "border-orange-200 dark:border-orange-700/50 bg-orange-50 dark:bg-orange-900/20"
            };
            
            const textColors = {
              blue: "text-blue-600 dark:text-blue-400",
              green: "text-green-600 dark:text-green-400",
              purple: "text-purple-600 dark:text-purple-400",
              orange: "text-orange-600 dark:text-orange-400"
            };
            
            return (
              <motion.div
                key={`data-point-${point.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`rounded-xl border ${colorMap[point.color]} p-5`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {point.title}
                  </h4>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    point.change.startsWith('+') 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}>
                    {point.change}
                  </div>
                </div>
                
                <div className={`text-3xl font-bold mb-2 ${textColors[point.color]}`}>
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
          <h4 className="font-bold text-xl mb-5">Key Data Insights</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                id: "response",
                title: "24% Higher Response Rate",
                description: "AI-powered personalized product recommendations outperform generic promotions by 24% in distributor-led campaigns."
              },
              {
                id: "forecast",
                title: "86% Accurate Sales Forecasting",
                description: "Machine learning models now predict month-ahead sales with 86% accuracy, up from 62% with traditional methods."
              },
              {
                id: "cost",
                title: "$43M Annual Cost Reduction",
                description: "Predictive inventory optimization has reduced overstock and stockout situations, saving $43M annually."
              },
              {
                id: "churn",
                title: "37% Churn Prediction Accuracy",
                description: "Early warning system identifies distributors at risk of leaving with 37% higher accuracy than previous methods."
              }
            ].map((insight, i) => (
              <div key={`insight-${insight.id}`} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h5 className="font-bold text-lg mb-2">{insight.title}</h5>
                <p className="text-sm text-blue-100">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">Data Analysis Framework</h4>
          </div>
          
          <div className="p-6">
            <div className="space-y-8">
              {[
                {
                  id: "collection",
                  step: "Data Collection",
                  description: "Structured and unstructured data gathering from multiple sources",
                  elements: [
                    "Customer Interactions (CRM)",
                    "E-commerce Behavior",
                    "Social Media Engagement",
                    "Distributor Performance",
                    "Market Trends & Competition"
                  ]
                },
                {
                  id: "processing",
                  step: "Data Processing",
                  description: "Cleaning, transformation and integration of disparate data sources",
                  elements: [
                    "Data Cleansing & Normalization",
                    "ETL Processes",
                    "Data Warehousing",
                    "Real-time Processing Pipelines",
                    "Data Lake Architecture"
                  ]
                },
                {
                  id: "analysis",
                  step: "Analysis & Modeling",
                  description: "Applying statistical methods and machine learning algorithms",
                  elements: [
                    "Predictive Analytics",
                    "Customer Segmentation",
                    "Propensity Modeling",
                    "Time Series Forecasting",
                    "Network Effect Analysis"
                  ]
                },
                {
                  id: "visualization",
                  step: "Visualization & Reporting",
                  description: "Converting insights into actionable dashboards and reports",
                  elements: [
                    "Executive Dashboards",
                    "Operational Reports",
                    "Distributor Performance Scorecards",
                    "Market Opportunity Maps",
                    "Automated Alerts & Notifications"
                  ]
                }
              ].map((phase, i) => (
                <div key={`phase-${phase.id}`} className="relative">
                  {/* Connection line */}
                  {i < 3 && (
                    <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
                  )}
                  
                  {/* Phase circle */}
                  <div className="flex items-start gap-5">
                    <div className="relative z-10 w-14 h-14 rounded-full bg-blue-500 dark:bg-blue-400 text-white flex items-center justify-center font-bold text-lg">
                      {i + 1}
                    </div>
                    
                    <div>
                      <h5 className="font-bold text-gray-900 dark:text-white text-lg">{phase.step}</h5>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{phase.description}</p>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600">
                        <ul className="space-y-2">
                          {phase.elements.map((element, j) => (
                            <li key={`phase-${phase.id}-element-${j}`} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                              <span className="text-gray-700 dark:text-gray-300">{element}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800/30 shadow-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500 dark:text-amber-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Data Governance Challenge</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Amway's most significant challenge in implementing data analytics was establishing consistent data governance across 100+ global markets with different regulatory requirements, particularly in Asia Pacific and European regions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                This required creating a flexible data governance framework that maintained global consistency while accounting for local compliance needs.
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
          Future Technology Trends
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Amway is positioning itself at the forefront of technological innovation in the MLM industry, with strategic investments in emerging technologies that will reshape direct selling in the coming years.
        </p>
        
        <div className="mt-8 space-y-6">
          {[
            {
              id: "ai",
              title: "Artificial Intelligence & Machine Learning",
              description: "AI will power personalized recommendations, predictive analytics, and automated customer service, enabling distributors to focus on relationship building rather than administrative tasks.",
              icon: Zap,
              color: "purple"
            },
            {
              id: "immersive",
              title: "Immersive Technologies (AR/VR)",
              description: "Virtual product demonstrations, training environments, and digital showrooms will transform how distributors engage with customers and learn about products.",
              icon: Smartphone,
              color: "blue"
            },
            {
              id: "blockchain",
              title: "Blockchain & Smart Contracts",
              description: "Transparent, automated commission calculations and product authenticity verification will increase trust and reduce operational overhead in the MLM model.",
              icon: Lock,
              color: "green"
            },
            {
              id: "voice",
              title: "Voice Commerce & Conversational AI",
              description: "Voice-activated ordering and AI-powered virtual assistants will simplify the customer and distributor experience across touchpoints.",
              icon: Users,
              color: "orange"
            }
          ].map((trend, index) => {
            const colorMap = {
              purple: "border-l-purple-500 dark:border-l-purple-400",
              blue: "border-l-blue-500 dark:border-l-blue-400",
              green: "border-l-green-500 dark:border-l-green-400",
              orange: "border-l-orange-500 dark:border-l-orange-400"
            };
            
            const bgColors = {
              purple: "bg-purple-50 dark:bg-purple-900/20",
              blue: "bg-blue-50 dark:bg-blue-900/20",
              green: "bg-green-50 dark:bg-green-900/20",
              orange: "bg-orange-50 dark:bg-orange-900/20"
            };
            
            const iconColors = {
              purple: "text-purple-500 dark:text-purple-400",
              blue: "text-blue-500 dark:text-blue-400",
              green: "text-green-500 dark:text-green-400",
              orange: "text-orange-500 dark:text-orange-400"
            };
            
            return (
              <motion.div
                key={`trend-${trend.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`rounded-lg border-l-4 ${colorMap[trend.color]} ${bgColors[trend.color]} p-5 shadow-sm`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${iconColors[trend.color]}`}>
                    <trend.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {trend.title}
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm pl-10">