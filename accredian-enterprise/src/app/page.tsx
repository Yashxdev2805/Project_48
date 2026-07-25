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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Site Header / Navbar Shell */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 pt-16 sm:pt-20">
        {/* Section 1: Hero (#home) */}
        <Hero />

        {/* Section 2: Stats (#stats) */}
        <Stats />

        {/* Section 3: Clients (#clients) */}
        <Clients />

        {/* Section 4: Accredian Edge (#edge) */}
        <AccredianEdge />

        {/* Section 5: Domain Expertise (#domains) */}
        <DomainExpertise />

        {/* Section 6: Course Segmentation Matrix */}
        <CourseSegmentation />

        {/* Section 7: Who Should Join */}
        <WhoShouldJoin />
      </main>

      {/* Site Footer Shell */}
      <Footer />
    </div>
  );
}
