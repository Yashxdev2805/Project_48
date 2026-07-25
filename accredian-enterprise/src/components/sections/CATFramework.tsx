"use client";

import React, { memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { enterpriseData } from "@/lib/data/enterprise";
import { CATPhase } from "@/lib/types";

export const CATFramework = memo(() => {
  const { catFramework } = enterpriseData;

  return (
    <section id="cat" className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Learning Methodology"
          title="The CAT"
          titleHighlight="Framework"
          subtitle="Competency, Action, and Transformation—our 3-stage methodology for driving sustained enterprise capability."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {catFramework.map((phase: CATPhase, idx: number) => (
            <Card
              key={idx}
              className="flex flex-col justify-between relative bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group"
              padding="lg"
            >
              <div className="space-y-4">
                {/* Phase Number Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-universal bg-blue-50 border border-blue-200 rounded-full">
                    {phase.step}
                  </span>
                  <span className="text-3xl font-extrabold text-gray-200 group-hover:text-blue-100 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* Phase Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-universal transition-colors">
                    {phase.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mt-1">
                    {phase.tagline}
                  </p>
                </div>

                {/* Phase Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {phase.description}
                </p>
              </div>

              {/* Outcomes Bullet List */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
                  Key Deliverables:
                </span>
                <ul className="space-y-2">
                  {phase.outcomes.map((outcome, oIdx) => (
                    <li key={oIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
});

CATFramework.displayName = "CATFramework";
