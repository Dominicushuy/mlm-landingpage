// src/hooks/useIntersectionObserver.jsx
import { useState, useEffect, useRef } from "react";

/**
 * Enhanced IntersectionObserver hook with improved ID handling and performance
 *
 * @param {Object} refs - Object of refs to observe
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Threshold for intersection (0-1)
 * @param {string} options.rootMargin - Margin around root element
 * @param {Function} options.onVisibilityChange - Callback when visibility changes
 * @returns {Object} - Object with visibility state for each ref
 */
export const useIntersectionObserver = (refs, options = {}) => {
  const { threshold = 0.3, rootMargin = "0px", onVisibilityChange } = options;
  const [isVisible, setIsVisible] = useState({});

  // Save the callback in a ref to prevent unnecessary observer recreations
  const savedCallback = useRef(onVisibilityChange);

  // Update the callback ref when it changes
  useEffect(() => {
    savedCallback.current = onVisibilityChange;
  }, [onVisibilityChange]);

  useEffect(() => {
    // Process ID to handle cases where IDs might have '-section' suffix
    const normalizeId = (id) => {
      return id.endsWith("-section") ? id.replace("-section", "") : id;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const updates = {};

        entries.forEach((entry) => {
          // Get ID from the element
          const target = entry.target;
          const id = target.id || target.dataset.section;

          if (!id) return; // Skip if no ID found

          // Normalize the ID
          const normalizedId = normalizeId(id);

          updates[normalizedId] = entry.isIntersecting;

          // Call visibility change callback if provided and element is intersecting
          if (entry.isIntersecting && savedCallback.current) {
            savedCallback.current(normalizedId, true);
          }
        });

        // Batch updates to state to avoid multiple re-renders
        if (Object.keys(updates).length > 0) {
          setIsVisible((prev) => ({ ...prev, ...updates }));
        }
      },
      { threshold, rootMargin }
    );

    // Collect all elements to observe
    const elements = [];
    Object.entries(refs).forEach(([key, ref]) => {
      if (ref?.current) {
        // Add data-section attribute if the element doesn't have an ID
        if (!ref.current.id) {
          ref.current.dataset.section = key;
        }

        elements.push(ref.current);
        observer.observe(ref.current);
      }
    });

    return () => {
      // Clean up observer
      elements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [refs, threshold, rootMargin]); // Only recreate observer if these change

  return isVisible;
};

export default useIntersectionObserver;
