import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { enterpriseData } from "@/lib/data/enterprise";

export default function Home() {
  const { hero, stats } = enterpriseData;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Site Header / Navbar Shell */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 pt-20">
        {/* Section 1: Hero Anchor Target (#home) */}
        <section id="home" className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/60 via-white to-white">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-wide text-universal bg-blue-100/70 rounded-full border border-blue-200">
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

        {/* Section 2: Stats Anchor Target (#stats) */}
        <section id="stats" className="py-16 bg-gray-50/60 border-t border-b border-gray-100">
          <Container>
            <SectionHeading
              badge="Phase 2 Shell Active"
              title="Track Record & Performance"
              titleHighlight="Metrics"
              subtitle="Navbar, ScrollSpy navigation, and Footer shell are fully functional."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-universal">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 mt-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 leading-normal">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      {/* Site Footer Shell */}
      <Footer />
    </div>
  );
}
