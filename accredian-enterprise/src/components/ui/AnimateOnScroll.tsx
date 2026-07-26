"use client";

import React from "react";
import { useInView } from "@/hooks/useInView";

type AnimationVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade" | "zoom";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  /** Animation direction. Default: "fade-up" */
  variant?: AnimationVariant;
  /** Delay in ms before animation starts. Default: 0 */
  delay?: number;
  /** Animation duration in ms. Default: 600 */
  duration?: number;
  /** Intersection Observer threshold (0-1). Default: 0.15 */
  threshold?: number;
  /** Wrapper element class overrides */
  className?: string;
}

const VARIANT_STYLES: Record<AnimationVariant, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
  "fade-up": {
    hidden: { opacity: 0, transform: "translateY(32px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-down": {
    hidden: { opacity: 0, transform: "translateY(-32px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-left": {
    hidden: { opacity: 0, transform: "translateX(-32px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    hidden: { opacity: 0, transform: "translateX(32px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  zoom: {
    hidden: { opacity: 0, transform: "scale(0.92)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
};

/**
 * Wraps children with a scroll-triggered entrance animation.
 * Uses IntersectionObserver (via useInView) — zero JS animation libraries needed.
 *
 * @example
 * <AnimateOnScroll variant="fade-up" delay={100}>
 *   <MyComponent />
 * </AnimateOnScroll>
 */
export function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = "",
}: AnimateOnScrollProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold });
  const { hidden, visible } = VARIANT_STYLES[variant];

  const style: React.CSSProperties = {
    ...(inView ? visible : hidden),
    transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: inView ? "auto" : "opacity, transform",
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
