"use client";

import React, { useCallback, memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { enterpriseData } from "@/lib/data/enterprise";
import { DomainCard } from "@/lib/types";

// Static Domain Icon Component
const DomainIcon = memo(({ name }: { name: string }) => {
  switch (name) {
    case "Cpu":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      );
    case "Layers":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case "Database":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case "ShieldCheck":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "BarChart":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "Code":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "Lock":
    default:
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
  }
});
DomainIcon.displayName = "DomainIcon";

export const DomainExpertise = memo(() => {
  const { domains } = enterpriseData;

  const handleCtaClick = useCallback((e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <section id="domains" className="py-16 sm:py-24 bg-gray-50/70 border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Enterprise Programs"
          title="7 Core Domain"
          titleHighlight="Specializations"
          subtitle="Comprehensive, practitioner-led curricula designed for engineering, product, data, and executive teams."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {domains.map((domain: DomainCard) => (
            <Card
              key={domain.id}
              className="flex flex-col justify-between h-full bg-white relative hover:border-blue-300 transition-all duration-300 group"
              padding="lg"
            >
              {/* Popular Badge */}
              {domain.popular && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-universal bg-blue-50 border border-blue-200 rounded-full">
                  High Demand
                </span>
              )}

              <div className="space-y-4">
                {/* Domain Icon & Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-universal flex items-center justify-center group-hover:bg-universal group-hover:text-white transition-colors duration-300">
                    <DomainIcon name={domain.icon} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-universal transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500">
                      {domain.subtitle}
                    </p>
                  </div>
                </div>

                {/* Domain Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {domain.description}
                </p>

                {/* Skills Chips */}
                <div className="pt-2">
                  <span className="text-xs font-semibold text-gray-700 block mb-2">
                    Key Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md border border-gray-200/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA Link */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Custom Cohorts Available</span>
                <Button
                  size="sm"
                  variant="outline"
                  href="#contact"
                  onClick={(e) => handleCtaClick(e, "#contact")}
                >
                  Enquire
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
});

DomainExpertise.displayName = "DomainExpertise";
