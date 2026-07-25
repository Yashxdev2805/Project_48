"use client";

import React, { memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/ui/LeadForm";
import { enterpriseData } from "@/lib/data/enterprise";

export const ContactCTA = memo(() => {
  const { contact } = enterpriseData;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/60 via-white to-gray-50 border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Get Started"
          title={contact.title}
          titleHighlight=""
          subtitle={contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Contact Info Card */}
          <div className="lg:col-span-5 space-y-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
              Enterprise Support
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-universal flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  ✉
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Email
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-semibold text-gray-900 hover:text-universal transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-universal flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  📞
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Phone & WhatsApp
                  </span>
                  <a
                    href={`tel:${contact.phone}`}
                    className="font-semibold text-gray-900 hover:text-universal transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-universal flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  📍
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Headquarters
                  </span>
                  <p className="text-gray-700 leading-snug">
                    {contact.address}
                  </p>
                </div>
              </div>
            </div>

            {/* SLA Response Guarantee */}
            <div className="pt-4 border-t border-gray-100 bg-blue-50/60 p-4 rounded-xl border border-blue-100 text-xs text-blue-900 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>{contact.responsePromise}</span>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <LeadForm />
          </div>
        </div>
      </Container>
    </section>
  );
});

ContactCTA.displayName = "ContactCTA";
