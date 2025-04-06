// src/theme/constants.js
/**
 * Global theme constants for consistent styling across the application
 */
export const THEME = {
  colors: {
    // Backgrounds per section to ensure visual consistency
    sections: {
      intro: {
        bg: "bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-900",
        text: "text-gray-900 dark:text-white",
      },
      market: {
        bg: "bg-white dark:bg-gray-900",
        text: "text-gray-900 dark:text-white",
      },
      ecommerce: {
        bg: "bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/10",
        text: "text-gray-900 dark:text-white",
      },
      casestudy: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        text: "text-gray-900 dark:text-white",
      },
      amwayDetail: {
        bg: "bg-white dark:bg-gray-900",
        text: "text-gray-900 dark:text-white",
      },
      solutions: {
        bg: "bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-900/10",
        text: "text-gray-900 dark:text-white",
      },
      tools: {
        bg: "bg-gradient-to-b from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
        text: "text-gray-900 dark:text-white",
      },
      strategy: {
        bg: "bg-white dark:bg-gray-900",
        text: "text-gray-900 dark:text-white",
      },
      demo: {
        bg: "bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/10",
        text: "text-gray-900 dark:text-white",
      },
      invest: {
        bg: "bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700",
        text: "text-white",
      },
    },
    transitions: {
      // Wave transition colors matching the next section's background
      white: "#ffffff",
      blue50: "#eff6ff",
      indigo50: "#eef2ff",
      gray900: "#111827",
      blue900: "#1e3a8a",
      gradient1: "url(#blue-gradient)",
    },
  },
  spacing: {
    section: {
      small: "py-8 md:py-12",
      medium: "py-12 md:py-16",
      large: "py-16 md:py-24",
      xlarge: "py-24 md:py-32",
    },
  },
  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  // Z-index scales
  zIndex: {
    base: 1,
    content: 10,
    navigation: 50,
    modal: 100,
    toast: 1000,
  },
};
