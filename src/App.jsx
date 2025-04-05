import React, { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import Navbar from "./components/layout/Navbar";
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
import AnimatedBackgroundBubbles from "./components/ui/AnimatedBackgroundBubbles";
import AmwayDetailCaseStudy from "./components/sections/AmwayDetailCaseStudy";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <AnimatedBackgroundBubbles />

      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

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

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-2 rounded-full bg-blue-600 text-white shadow-lg transform transition-all duration-300 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Chat Bot Button */}
      <button
        onClick={() => setShowChatBot(!showChatBot)}
        className="fixed bottom-8 left-8 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300"
        aria-label="Toggle chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Chat Bot Component */}
      {showChatBot && <ChatBot onClose={() => setShowChatBot(false)} />}
    </div>
  );
};

export default App;
