"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Clients } from "@/components/sections/Clients";
import { AccredianEdge } from "@/components/sections/AccredianEdge";
import { DomainExpertise } from "@/components/sections/DomainExpertise";
import { CourseSegmentation } from "@/components/sections/CourseSegmentation";
import { WhoShouldJoin } from "@/components/sections/WhoShouldJoin";
import { CATFramework } from "@/components/sections/CATFramework";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQ } from "@/components/sections/FAQ";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-16 sm:pt-20">
        {/* Hero — instant load, no scroll animation needed */}
        <Hero />

        <AnimateOnScroll variant="fade-up">
          <Stats />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade" duration={800}>
          <Clients />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up">
          <AccredianEdge />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={80}>
          <DomainExpertise />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up">
          <CourseSegmentation />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={80}>
          <WhoShouldJoin />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up">
          <CATFramework />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up">
          <HowItWorks />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up">
          <FAQ />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={80}>
          <Testimonials />
        </AnimateOnScroll>

        <AnimateOnScroll variant="zoom" duration={700}>
          <ContactCTA />
        </AnimateOnScroll>
      </main>

      <Footer />
    </div>
  );
}
