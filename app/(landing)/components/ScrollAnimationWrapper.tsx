import React, { useEffect, useRef, ReactNode } from "react";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element?.classList.add("animate-fade-in-up");
          element?.classList.remove("opacity-0");
        } else {
          element?.classList.remove("animate-fade-in-up");
          element?.classList.add("opacity-0");
        }
      },
      { threshold: 0.1 }
    );

    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="opacity-0 transition-opacity duration-500 transform">
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;
