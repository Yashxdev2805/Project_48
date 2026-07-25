import React from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { enterpriseData } from "@/lib/data/enterprise";

export default function Home() {
  const { hero, stats } = enterpriseData;

  return (
    <main className="min-h-screen bg-white">
      {/* Temporary Hero Preview for Phase 1 verification */}
      <section className="py-20 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-wide text-universal bg-blue-100/70 rounded-full">
              {hero.badge}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              {hero.title}{" "}
              <span className="text-universal">{hero.titleHighlight}</span>
            </h1>
            <p className="mt-6 text-base sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" href="#contact">
                {hero.ctaText}
              </Button>
              <Button size="lg" variant="outline" href="#domains">
                {hero.secondaryCtaText}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Phase 1 Verification Message */}
      <section className="py-12 border-t border-b border-gray-100 bg-gray-50/50">
        <Container>
          <SectionHeading
            badge="Phase 1 Ready"
            title="Foundation & Data Layer"
            titleHighlight="Successfully Initialized"
            subtitle="Next.js App Router, Tailwind CSS v4, Poppins typography, TypeScript types, centralized mock data, and UI primitives are ready."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-universal">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-sm font-semibold text-gray-800 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
