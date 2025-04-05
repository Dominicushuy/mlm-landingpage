import React, { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { Navbar } from "./components/navigation/nav-bar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import MarketAnalysis from "./components/sections/MarketAnalysis";
import EcommerceImpact from "./components/sections/EcommerceImpact";
import CaseStudy from "./components/sections/CaseStudy";
import Solutions from "./components/sections/Solutions";
import Tools from "./components/sections/Tools";
import Strategy from "./components/sections/Strategy";
import Investment from "./components/sections/Investment";
import ChatBot from "./components/features/ChatBot";
import AmwayDetailCaseStudy from "./components/sections/AmwayDetailCaseStudy";
import DemoSection from "./components/sections/DemoSection";
import { ArrowUp, MessageSquare, Moon, Sun } from "lucide-react";
import { Button } from "./components/ui/button";
import { navItems } from "./data/siteData";

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

  const sectionRefs = {
    intro: useRef(null),
    market: useRef(null),
    ecommerce: useRef(null),
    casestudy: useRef(null),
    amwayDetail: useRef(null),
    solutions: useRef(null),
    tools: useRef(null),
    strategy: useRef(null),
    invest: useRef(null),
  };

  const isVisible = useIntersectionObserver(sectionRefs, {
    threshold: 0.3,
    onVisibilityChange: (id, isVisible) => {
      if (isVisible) {
        setActiveSection(id);
      }
    },
  });

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: "smooth" });
  };

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

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Convert navItems to the format expected by Navbar component
  const navigationItems = navItems.map((item) => ({
    label: item.label,
    id: item.id,
    href: `#${item.id}`,
  }));

  // Create logo element for navbar
  const logo = (
    <div className="flex items-center text-2xl font-bold">
      <div className="bg-blue-600 dark:bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-md mr-2">
        MA
      </div>
      <span className="text-blue-700 dark:text-blue-400">MLM</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* New Navbar using the design system */}
      <Navbar
        logo={logo}
        items={navigationItems}
        activeItem={activeSection}
        variant={showScrollTop ? "translucent" : "default"}
        onNavItemClick={(item) => scrollToSection(item.id)}
        actions={[
          <Button
            key="dark-mode"
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>,
        ]}
      />

      {/* Section components */}
      <Hero
        ref={sectionRefs.intro}
        isVisible={isVisible.intro}
        scrollToSection={scrollToSection}
        darkMode={darkMode}
      />

      <MarketAnalysis
        ref={sectionRefs.market}
        isVisible={isVisible.market}
        darkMode={darkMode}
      />

      <EcommerceImpact
        ref={sectionRefs.ecommerce}
        isVisible={isVisible.ecommerce}
        darkMode={darkMode}
      />

      <CaseStudy
        ref={sectionRefs.casestudy}
        isVisible={isVisible.casestudy}
        darkMode={darkMode}
      />

      <AmwayDetailCaseStudy
        ref={sectionRefs.amwayDetail}
        isVisible={isVisible.amwayDetail}
        darkMode={darkMode}
      />

      <Solutions
        ref={sectionRefs.solutions}
        isVisible={isVisible.solutions}
        darkMode={darkMode}
      />

      <Tools
        ref={sectionRefs.tools}
        isVisible={isVisible.tools}
        darkMode={darkMode}
      />

      <DemoSection
        ref={sectionRefs.demo}
        isVisible={isVisible.demo}
        darkMode={darkMode}
      />

      <Strategy
        ref={sectionRefs.strategy}
        isVisible={isVisible.strategy}
        darkMode={darkMode}
      />

      <Investment
        ref={sectionRefs.invest}
        isVisible={isVisible.invest}
        darkMode={darkMode}
      />

      <Footer darkMode={darkMode} />

      {/* Scroll to top button using Button component from the design system */}
      <Button
        onClick={scrollToTop}
        variant="default"
        size="icon"
        className={`fixed bottom-8 right-8 z-50 rounded-full bg-blue-600 text-white shadow-lg transform transition-all duration-300 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      {/* Chat Bot Button using Button component from the design system */}
      <Button
        onClick={() => setShowChatBot(!showChatBot)}
        variant="default"
        size="icon"
        className="fixed bottom-8 left-8 z-50 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300"
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
