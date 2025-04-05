/**
 * Enhanced utilities for smooth scrolling with additional features and error handling
 */

export const scrollUtils = {
  /**
   * Scrolls to a specific element by ID with smooth scrolling behavior
   *
   * @param {string} elementId - ID of the element to scroll to
   * @param {Object} options - Scroll options
   * @param {string} options.behavior - Scroll behavior (smooth, auto)
   * @param {number} options.offset - Offset in pixels from the top of the element
   * @param {function} options.onComplete - Callback function after scrolling is complete
   * @returns {boolean} - Whether the scroll was successful
   */
  scrollToElement: (elementId, options = {}) => {
    const { behavior = "smooth", offset = 0, onComplete } = options;

    try {
      // Try different methods to find the element
      const element =
        document.getElementById(elementId) ||
        document.querySelector(`[id="${elementId}"]`) ||
        document.querySelector(`[data-section="${elementId}"]`);

      if (!element) {
        console.warn(`Element with ID "${elementId}" not found.`);
        return false;
      }

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });

      // If onComplete callback is provided, call it after scrolling
      if (typeof onComplete === "function") {
        setTimeout(() => {
          onComplete(elementId);
        }, 1000); // Adjust timeout based on expected scroll duration
      }

      return true;
    } catch (error) {
      console.error(`Error scrolling to element "${elementId}":`, error);
      return false;
    }
  },

  /**
   * Scrolls the page to a specific position
   *
   * @param {Object} options - Scroll options
   * @param {number} options.top - Position to scroll to from the top
   * @param {string} options.behavior - Scroll behavior (smooth, auto)
   * @returns {boolean} - Whether the scroll was successful
   */
  scrollToPosition: (options = {}) => {
    const { top = 0, behavior = "smooth" } = options;

    try {
      window.scrollTo({
        top,
        behavior,
      });
      return true;
    } catch (error) {
      console.error(`Error scrolling to position ${top}:`, error);
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, top);
      return true;
    }
  },

  /**
   * Updates URL hash without scrolling
   *
   * @param {string} hash - Hash to set in URL
   * @returns {boolean} - Whether the operation was successful
   */
  updateUrlHash: (hash) => {
    try {
      const cleanHash = hash.startsWith("#") ? hash : `#${hash}`;
      history.replaceState(null, null, cleanHash);
      return true;
    } catch (error) {
      console.error(`Error updating URL hash to "${hash}":`, error);
      return false;
    }
  },

  /**
   * Registers smooth scroll behavior for all anchor links on the page
   *
   * @param {Object} options - Configuration options
   * @param {string} options.selector - Selector for anchors to apply smooth scrolling to
   * @param {number} options.offset - Offset in pixels from the top
   * @returns {function} - Function to remove event listeners
   */
  setupSmoothScrolling: (options = {}) => {
    const { selector = 'a[href^="#"]', offset = 0 } = options;

    const handleClick = (event) => {
      const href = event.currentTarget.getAttribute("href");

      if (!href || href === "#") return;

      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        scrollUtils.scrollToElement(targetId, { offset });
      }
    };

    const links = document.querySelectorAll(selector);
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    // Return a cleanup function
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  },

  /**
   * Determines if an element is in the viewport
   *
   * @param {HTMLElement} element - The element to check
   * @param {Object} options - Additional options
   * @param {number} options.threshold - Percentage of element that must be visible (0-1)
   * @returns {boolean} - Whether the element is in viewport
   */
  isInViewport: (element, options = {}) => {
    const { threshold = 0 } = options;

    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Calculate how much of the element is visible as a percentage
    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const percentVisible = visibleHeight / rect.height;

    return percentVisible > threshold;
  },
};

export default scrollUtils;
