"use client";

import React, { memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { enterpriseData } from "@/lib/data/enterprise";

// Static duplication for infinite marquee loop (allocated once)
const MARQUEE_CLIENTS = [...enterpriseData.clients, ...enterpriseData.clients];

export const Clients = memo(() => {
  return (
    <section id="clients" className="py-16 sm:py-20 bg-white overflow-hidden border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Proven Partnerships"
          title="Trusted by Leaders at"
          titleHighlight="Top Enterprises"
          subtitle="Partnering with Fortune 500 tech powerhouses and fast-growing unicorns to upskill high-performing teams."
        />
      </Container>

      {/* Full-width Infinite Marquee Strip */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Gradient Fades for Smooth Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 sm:gap-8 items-center">
          {MARQUEE_CLIENTS.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="flex-shrink-0 flex flex-col items-center justify-center px-6 py-4 rounded-xl bg-gray-50/80 border border-gray-200/80 min-w-[150px] sm:min-w-[180px] hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-300 group cursor-pointer"
            >
              <span className="font-extrabold text-gray-700 text-lg sm:text-xl tracking-tight group-hover:text-universal transition-colors">
                {client.name}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1 group-hover:text-blue-600">
                {client.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Clients.displayName = "Clients";
