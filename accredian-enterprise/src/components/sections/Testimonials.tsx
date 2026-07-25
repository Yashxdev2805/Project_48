"use client";

import React, { useState, useCallback, memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { enterpriseData } from "@/lib/data/enterprise";
import { Testimonial } from "@/lib/types";

// Static Array for 5-star Rating (allocated once)
const FIVE_STARS = [1, 2, 3, 4, 5];

const StarRating = memo(({ count = 5 }: { count?: number }) => {
  return (
    <div className="flex gap-1 text-amber-400">
      {FIVE_STARS.slice(0, count).map((i) => (
        <svg
          key={i}
          className="w-5 h-5 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
});
StarRating.displayName = "StarRating";

export const Testimonials = memo(() => {
  const { testimonials } = enterpriseData;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectIndex = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-gray-50/70 border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Client Success"
          title="What Our Partners Say"
          titleHighlight="About Us"
          subtitle="Real reviews from HR leaders, VPs of Engineering, and Chief Digital Officers transforming their workforce."
        />

        {/* Grid Display for Desktop & Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item: Testimonial, idx: number) => {
            const isHighlighted = activeIndex === idx;
            return (
              <Card
                key={item.id}
                onClick={() => handleSelectIndex(idx)}
                className={`flex flex-col justify-between h-full bg-white transition-all duration-300 ${
                  isHighlighted
                    ? "border-universal ring-2 ring-blue-100 shadow-xl scale-[1.02]"
                    : "hover:border-gray-300"
                }`}
                padding="lg"
              >
                <div className="space-y-4">
                  {/* Star Rating */}
                  <StarRating count={item.rating} />

                  {/* Review Text Quote */}
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                {/* Author Credentials */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-universal font-extrabold flex items-center justify-center text-sm flex-shrink-0">
                    {item.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs font-semibold text-gray-500">
                      {item.role}
                    </p>
                    <p className="text-[11px] text-blue-600 font-medium">
                      {item.company}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? "bg-universal w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
});

Testimonials.displayName = "Testimonials";
