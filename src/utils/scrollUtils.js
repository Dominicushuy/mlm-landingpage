/**
 * Scrolls to a specific element by ID with smooth scrolling behavior
 *
 * @param {string} elementId - ID of the element to scroll to
 * @param {Object} options - Scroll options
 * @param {string} options.behavior - Scroll behavior (smooth, auto)
 * @param {number} options.offset - Offset in pixels
 */
export const scrollToElement = (elementId, options = {}) => {
  const { behavior = "smooth", offset = 0 } = options;
  const element = document.getElementById(elementId);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior,
    });

    return true;
  }

  return false;
};
