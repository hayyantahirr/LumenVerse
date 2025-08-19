import { useEffect, useRef } from "react";

const useAnimateOnScroll = (classes = "animate__fadeInLeft animate__slower") => {
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("animate__animated", ...classes.split(" "));
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [classes]);

  return elementRef;
};

export default useAnimateOnScroll;
