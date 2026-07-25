"use client";

import React, { memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { enterpriseData } from "@/lib/data/enterprise";
import { AudiencePersona } from "@/lib/types";

// Persona Icon Helper
const PersonaIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "Terminal":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "Compass":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case "Users":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case "Zap":
    default:
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

export const WhoShouldJoin = memo(() => {
  const { audience } = enterpriseData;

  const handleCtaClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50/70 border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Target Audience"
          title="Who Should Join Our"
          titleHighlight="Enterprise Cohorts"
          subtitle="Curricula tailored for every organizational tier—from individual tech contributors to C-suite strategists."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {audience.map((persona: AudiencePersona) => (
            <Card
              key={persona.id}
              className="flex flex-col justify-between bg-white hover:border-blue-300 transition-all duration-300 group"
              padding="lg"
            >
              <div className="space-y-4">
                {/* Persona Header & Icon */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-universal flex items-center justify-center group-hover:bg-universal group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <PersonaIcon name={persona.icon} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-universal transition-colors">
                      {persona.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500">
                      {persona.role}
                    </p>
                  </div>
                </div>

                {/* Persona Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {persona.description}
                </p>

                {/* Key Benefits Bullet List */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
                    Key Outcomes for Organization:
                  </span>
                  <ul className="space-y-2">
                    {persona.keyBenefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-universal flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Persona Footer Button */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                <Button
                  size="sm"
                  variant="secondary"
                  href="#contact"
                  onClick={(e) => handleCtaClick(e, "#contact")}
                >
                  Request Custom Syllabus →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
});

WhoShouldJoin.displayName = "WhoShouldJoin";
