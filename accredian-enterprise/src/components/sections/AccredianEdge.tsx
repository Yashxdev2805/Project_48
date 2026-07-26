"use client";

import React, { memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { enterpriseData } from "@/lib/data/enterprise";
import { EdgePillar } from "@/lib/types";

// Icon Renderer for Edge Pillars
const PillarIcon = memo(({ name }: { name: string }) => {
  switch (name) {
    case "TrendingUp":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case "Award":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    case "Sliders":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      );
    case "BarChart3":
    default:
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
  }
});
PillarIcon.displayName = "PillarIcon";

export const AccredianEdge = memo(() => {
  const { edge } = enterpriseData;

  return (
    <section id="edge" className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Why Accredian Enterprise"
          title="The Accredian"
          titleHighlight="Edge"
          subtitle="Four strategic pillars engineered to deliver unmatched workforce transformation and executive capability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {edge.map((pillar: EdgePillar, idx: number) => (
            <AnimateOnScroll key={pillar.id} variant="fade-up" delay={idx * 100}>
              <Card
                className="flex flex-col justify-between h-full group hover:border-blue-300 transition-all duration-300 bg-white"
                padding="lg"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-universal flex items-center justify-center group-hover:bg-universal group-hover:text-white transition-colors duration-300">
                    <PillarIcon name={pillar.icon} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-universal transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {pillar.metric && (
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-gray-700">
                      {pillar.metric}
                    </span>
                  </div>
                )}
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
});

AccredianEdge.displayName = "AccredianEdge";
