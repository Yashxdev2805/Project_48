import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Clients } from "@/components/sections/Clients";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Site Header / Navbar Shell */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 pt-16 sm:pt-20">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Stats (Track Record with Count-Up) */}
        <Stats />

        {/* Section 3: Clients (Partner Logos Marquee) */}
        <Clients />
      </main>

      {/* Site Footer Shell */}
      <Footer />
    </div>
  );
}
