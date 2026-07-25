"use client";

import React, { memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { enterpriseData } from "@/lib/data/enterprise";
import { HowItWorksStep } from "@/lib/types";

export const HowItWorks = memo(() => {
  const { howItWorks } = enterpriseData;

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50/70 border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Execution Model"
          title="How It Works"
          titleHighlight="End-to-End"
          subtitle="From initial skill gap diagnosis to customized program delivery and ongoing HR analytics."
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-blue-200 -translate-y-6 -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {howItWorks.map((step: HowItWorksStep) => (
              <div
                key={step.stepNumber}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Step Circle Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-universal text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                    {step.stepNumber}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Details List */}
                <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
});

HowItWorks.displayName = "HowItWorks";
