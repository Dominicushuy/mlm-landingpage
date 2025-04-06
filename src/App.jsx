import React, { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { Navbar } from "./components/navigation/nav-bar";
import Footer from "./components/layout/footer";
import Hero from "./components/sections/Hero";
import MarketAnalysis from "./components/sections/MarketAnalysis";
import EcommerceImpact from "./components/sections/EcommerceImpact";
import CaseStudy from "./components/sections/CaseStudy";
import AmwayDetailCaseStudy from "./components/sections/AmwayDetailCaseStudy";
import Solutions from "./components/sections/Solutions";
import Tools from "./components/sections/Tools";
// import Strategy from "./components/sections/Strategy";
// import Investment from "./components/sections/Investment";
// import DemoSection from "./components/sections/DemoSection";
import { ArrowUp, MessageSquare, Moon, Sun } from "lucide-react";
import { Button } from "./components/ui/button";
import { navItems } from "./data/siteData";
import { MainLayout } from "./components/layout/main-layout";
import { scrollUtils } from "./utils/scrollUtils";
import SectionWrapper from "./components/layout/section-wrapper";
import ChatBot from "./components/features/chat-bot";

// Seamless color transitions between sections
const SECTION_COLORS = {
  // Backgrounds (carefully chosen for seamless transitions)
  intro:
    "bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/5 dark:to-gray-900",
  market: "bg-white dark:bg-gray-900",
  ecommerce: "bg-white dark:bg-gray-900",
  casestudy: "bg-white dark:bg-gray-900",
  amwayDetail: "bg-white dark:bg-gray-900",
  solutions: "bg-white dark:bg-gray-900",
  tools:
    "bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-900/10",
  strategy: "bg-white dark:bg-gray-900",
  demo: "bg-white dark:bg-gray-900",
  invest:
    "bg-gradient-to-b from-white to-blue-600 dark:from-gray-900 dark:to-blue-700",
};

const App = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("darkMode") === "true" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return false;
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  // Create refs for all sections defined in navItems
  const sectionRefs = {};
  navItems.forEach((item) => {
    sectionRefs[item.id] = useRef(null);
  });

  // Use intersection observer to detect which section is currently in view
  // Thêm rootMargin để phát hiện sớm hơn khi phần tử vào viewport
  const isVisible = useIntersectionObserver(sectionRefs, {
    threshold: 0.3,
    rootMargin: "-80px 0px 0px 0px", // Offset for fixed header
    onVisibilityChange: (id, isVisible) => {
      if (isVisible) {
        setActiveSection(id);
        // Update URL hash when scrolling to a section
        window.history.replaceState(null, null, `#${id}`);
      }
    },
  });

  // Enhanced scrollToSection function with consistent handling of section IDs
  const scrollToSection = (sectionId) => {
    // Normalize the section ID in case it has '-section' suffix
    const normalizedId = sectionId.endsWith("-section")
      ? sectionId.replace("-section", "")
      : sectionId;

    // Primary method: Try using the ref
    if (sectionRefs[normalizedId]?.current) {
      const headerOffset = 80; // Adjust based on header height
      const sectionPosition =
        sectionRefs[normalizedId].current.getBoundingClientRect().top;
      const offsetPosition =
        sectionPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      return;
    }

    // Fallback method 1: Try using scrollUtils
    if (scrollUtils && typeof scrollUtils.scrollToElement === "function") {
      // Try both with and without '-section' suffix
      let success = scrollUtils.scrollToElement(normalizedId, { offset: 80 });
      if (!success) {
        success = scrollUtils.scrollToElement(`${normalizedId}-section`, {
          offset: 80,
        });
      }
      if (success) return;
    }

    // Fallback method 2: Try using getElementById directly
    let element = document.getElementById(normalizedId);
    if (!element) {
      element = document.getElementById(`${normalizedId}-section`);
    }

    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      return;
    }

    // If all else fails, log a warning
    console.warn(`Section with ID "${sectionId}" not found`);
  };

  // Check URL hash on initial load to scroll to the correct section
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Normalize the hash in case it contains '-section'
      const normalizedHash = hash.endsWith("-section")
        ? hash.replace("-section", "")
        : hash;

      if (sectionRefs[normalizedHash]) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          scrollToSection(normalizedHash);
        }, 100);
      }
    }
  }, []);

  // Handle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Convert navItems to the format expected by Navbar component
  const navigationItems = navItems.map((item) => ({
    label: item.label,
    id: item.id,
    href: `#${item.id}`,
  }));

  // Create logo element for navbar
  const logo = (
    <div className="flex items-center text-2xl font-bold">
      <div className="bg-blue-600 dark:bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-md mr-2 transition-all duration-300 hover:scale-105">
        MA
      </div>
      <span className="text-blue-700 dark:text-blue-400">MLM</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Navbar with consistent styling */}
      <Navbar
        logo={logo}
        items={navigationItems}
        activeItem={activeSection}
        variant={showScrollTop ? "translucent" : "default"}
        position="sticky"
        shadow={showScrollTop ? "default" : "none"}
        onNavItemClick={(item) => scrollToSection(item.id)}
        actions={[
          <Button
            key="dark-mode"
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="transition-transform duration-200 hover:scale-110"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>,
        ]}
      />

      {/* Main Content with consistent layout */}
      <MainLayout>
        {/* Hero Section - Full Height with special styling */}
        <SectionWrapper
          id="intro"
          padding="none"
          variant={SECTION_COLORS.intro}
        >
          <Hero
            ref={sectionRefs.intro}
            isVisible={isVisible.intro}
            scrollToSection={scrollToSection}
            darkMode={darkMode}
          />
        </SectionWrapper>

        {/* Market Analysis Section */}
        <SectionWrapper
          id="market"
          padding="large"
          variant={SECTION_COLORS.market}
        >
          <MarketAnalysis
            ref={sectionRefs.market}
            isVisible={isVisible.market}
            darkMode={darkMode}
          />
        </SectionWrapper>

        {/* E-commerce Impact Section */}
        <SectionWrapper
          id="ecommerce"
          padding="large"
          variant={SECTION_COLORS.ecommerce}
        >
          <EcommerceImpact
            ref={sectionRefs.ecommerce}
            isVisible={isVisible.ecommerce}
            darkMode={darkMode}
          />
        </SectionWrapper>

        {/* Case Study Section */}
        <SectionWrapper
          id="casestudy"
          padding="large"
          variant={SECTION_COLORS.casestudy}
        >
          <CaseStudy
            ref={sectionRefs.casestudy}
            isVisible={isVisible.casestudy}
            darkMode={darkMode}
          />
        </SectionWrapper>

        {/* Detailed Case Study Section - Fixed ID issue */}
        <SectionWrapper
          id="amwayDetail"
          padding="large"
          variant={SECTION_COLORS.amwayDetail}
        >
          <AmwayDetailCaseStudy
            ref={sectionRefs.amwayDetail}
            isVisible={isVisible.amwayDetail}
            darkMode={darkMode}
          />
        </SectionWrapper>

        {/* Solutions Section */}
        <SectionWrapper
          id="solutions"
          padding="large"
          variant={SECTION_COLORS.solutions}
        >
          <Solutions
            ref={sectionRefs.solutions}
            isVisible={isVisible.solutions}
            darkMode={darkMode}
          />
        </SectionWrapper>

        {/* Tools Section - Với gradient nhẹ để tạo sự tương phản */}
        <SectionWrapper
          id="tools"
          padding="large"
          variant={SECTION_COLORS.tools}
          className="relative"
        >
          <Tools
            ref={sectionRefs.tools}
            isVisible={isVisible.tools}
            darkMode={darkMode}
          />
        </SectionWrapper>

        {/* Strategy Section */}
        {/* <SectionWrapper
          id="strategy"
          padding="large"
          variant={SECTION_COLORS.strategy}
        >
          <Strategy
            ref={sectionRefs.strategy}
            isVisible={isVisible.strategy}
            darkMode={darkMode}
          />
        </SectionWrapper> */}

        {/* Demo Section */}
        {/* <SectionWrapper id="demo" padding="large" variant={SECTION_COLORS.demo}>
          <DemoSection
            ref={sectionRefs.demo}
            isVisible={isVisible.demo}
            darkMode={darkMode}
          />
        </SectionWrapper> */}

        {/* Investment Section - Với gradient đặc biệt từ trắng sang xanh */}
        {/* <SectionWrapper
          id="invest"
          padding="large"
          variant={SECTION_COLORS.invest}
          className="mt-0"
        >
          <Investment
            ref={sectionRefs.invest}
            isVisible={isVisible.invest}
            darkMode={darkMode}
          />
        </SectionWrapper> */}
      </MainLayout>

      <Footer darkMode={darkMode} />

      {/* Chat Bot Button - fixed style */}
      <Button
        onClick={() => setShowChatBot(!showChatBot)}
        variant="default"
        size="icon"
        className="fixed bottom-8 left-8 z-50 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
        aria-label="Toggle chat"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      {/* Chat Bot Component */}
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
    </div>
  );
};

export default App;
