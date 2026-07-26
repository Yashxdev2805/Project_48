"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Percentage of element visible before triggering (0-1). Default: 0.15 */
  threshold?: number;
  /** CSS margin around root. Positive = trigger earlier. Default: "0px" */
  rootMargin?: string;
  /** Only trigger once then disconnect. Default: true */
  triggerOnce?: boolean;
}

/**
 * Lightweight Intersection Observer hook.
 * Returns a ref to attach and a boolean `inView` flag.
 *
 * @example
 * const [ref, inView] = useInView({ threshold: 0.2 });
 * <div ref={ref} className={inView ? "opacity-100" : "opacity-0"} />
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", triggerOnce = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // SSR guard — IntersectionObserver is browser-only
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView];
}
