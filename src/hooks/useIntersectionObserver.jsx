import { useState, useEffect } from "react";

export const useIntersectionObserver = (refs, options = {}) => {
  const { threshold = 0.3, onVisibilityChange } = options;
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          setIsVisible((prev) => ({
            ...prev,
            [id]: entry.isIntersecting,
          }));

          if (onVisibilityChange) {
            onVisibilityChange(id, entry.isIntersecting);
          }
        });
      },
      { threshold }
    );

    Object.values(refs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(refs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refs, threshold, onVisibilityChange]);

  return isVisible;
};
