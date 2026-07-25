"use client";

import React, { memo } from "react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/Button";
import { enterpriseData } from "@/lib/data/enterprise";

export const Hero = memo(() => {
  const { hero } = enterpriseData;

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
    <section id="home" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 -z-10 transform translate-x-1/3 -translate-y-1/4 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -z-10 transform -translate-x-1/3 w-[400px] h-[400px] bg-blue-50/80 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Value Bullets */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-universal text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-universal animate-pulse" />
              <span>{hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              {hero.title}{" "}
              <span className="text-universal relative inline-block">
                {hero.titleHighlight}
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-blue-200/80 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              {hero.subtitle}
            </p>

            {/* Value Bullet Points */}
            <ul className="space-y-3 pt-2">
              {hero.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 font-medium">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-universal flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Button
                size="lg"
                href="#contact"
                onClick={(e) => handleCtaClick(e, "#contact")}
              >
                {hero.ctaText}
              </Button>
              <Button
                size="lg"
                variant="outline"
                href="#domains"
                onClick={(e) => handleCtaClick(e, "#domains")}
              >
                {hero.secondaryCtaText}
              </Button>
            </div>

            {/* Trust Micro-Badge */}
            <div className="pt-2 flex items-center gap-3 text-xs text-gray-500 font-medium">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center border-2 border-white text-[10px]">G</div>
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center border-2 border-white text-[10px]">M</div>
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center border-2 border-white text-[10px]">A</div>
              </div>
              <span>Trusted by 200+ Fortune 500 & Unicorn HR Leaders</span>
            </div>
          </div>

          {/* Right Column: Visual Dashboard Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Card */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 blur-xl transition duration-500 group-hover:opacity-100" />

              <div className="relative rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6">
                {/* Visual Card Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-universal font-extrabold flex items-center justify-center text-lg">
                      AE
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                        Enterprise Learning Hub
                      </h3>
                      <p className="text-xs text-gray-500">Live Cohort Competency Index</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Active Cohort
                  </span>
                </div>

                {/* Dashboard Metrics Stack */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-500 font-medium">GenAI Proficiency Score</span>
                      <div className="text-xl font-extrabold text-gray-900 mt-0.5">94.8 / 100</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+28.4% YoY</span>
                    </div>
                  </div>

                  {/* Competency Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                        <span>Product Management & Strategy</span>
                        <span>92% Mastery</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-universal rounded-full w-[92%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                        <span>LLM & RAG Engineering</span>
                        <span>88% Mastery</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full w-[88%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                        <span>Data Analytics & BI</span>
                        <span>95% Mastery</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[95%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Badge */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Updated in real-time</span>
                  <span className="font-semibold text-universal">Explore Dashboard →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});

Hero.displayName = "Hero";
