import React, { useState, useRef } from "react";
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

const App = () => {
  const [activeSection, setActiveSection] = useState("intro");

  const sectionRefs = {
    intro: useRef(null),
    market: useRef(null),
    ecommerce: useRef(null),
    casestudy: useRef(null),
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      <Hero
        ref={sectionRefs.intro}
        isVisible={isVisible.intro}
        scrollToSection={scrollToSection}
      />

      <MarketAnalysis ref={sectionRefs.market} isVisible={isVisible.market} />

      <EcommerceImpact
        ref={sectionRefs.ecommerce}
        isVisible={isVisible.ecommerce}
      />

      <CaseStudy ref={sectionRefs.casestudy} isVisible={isVisible.casestudy} />

      <Solutions ref={sectionRefs.solutions} isVisible={isVisible.solutions} />

      <Tools ref={sectionRefs.tools} isVisible={isVisible.tools} />

      <Strategy ref={sectionRefs.strategy} isVisible={isVisible.strategy} />

      <Investment ref={sectionRefs.invest} isVisible={isVisible.invest} />

      <Footer />
    </div>
  );
};

export default App;
