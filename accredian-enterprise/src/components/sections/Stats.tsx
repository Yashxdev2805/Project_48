"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { enterpriseData } from "@/lib/data/enterprise";
import { StatItem } from "@/lib/types";

interface CountUpNumberProps {
  endValue: number;
  duration?: number;
}

const CountUpNumber: React.FC<CountUpNumberProps> = memo(({ endValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = countRef.current;
    if (!element || hasAnimatedRef.current) return;

    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          hasAnimatedRef.current = true;

          let startTime: number | null = null;
          const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = 1 - (1 - progress) * (1 - progress);
            const currentCount = Math.floor(easedProgress * endValue);

            setCount((prev) => (prev !== currentCount ? currentCount : prev));

            if (progress < 1) {
              rafId = requestAnimationFrame(animateCount);
            } else {
              setCount(endValue);
            }
          };

          rafId = requestAnimationFrame(animateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [endValue, duration]);

  return (
    <span ref={countRef}>
      {count.toLocaleString()}
    </span>
  );
});

CountUpNumber.displayName = "CountUpNumber";

export const Stats = memo(() => {
  const { stats } = enterpriseData;

  return (
    <section id="stats" className="py-16 sm:py-24 bg-gray-50/70 border-t border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Track Record"
          title="The Numbers Behind"
          titleHighlight="Our Success"
          subtitle="Empowering leading enterprises with measurable learning outcomes and high-impact skills."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat: StatItem, idx: number) => (
            <AnimateOnScroll key={stat.id} variant="fade-up" delay={idx * 120}>
              <Card
                className="text-center transition-all duration-300 hover:border-blue-300 hover:shadow-lg bg-white"
                padding="lg"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-universal tracking-tight flex items-center justify-center">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <CountUpNumber endValue={stat.value} />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-3 mb-2">
                  {stat.label}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
});

Stats.displayName = "Stats";
