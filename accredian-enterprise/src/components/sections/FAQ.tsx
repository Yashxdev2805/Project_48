"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { enterpriseData } from "@/lib/data/enterprise";
import { FAQItem } from "@/lib/types";

const FAQ_CATEGORIES = ["About Course", "Delivery & Format", "Enterprise & Pricing"] as const;

export const FAQ = memo(() => {
  const { faqs } = enterpriseData;
  
  const [activeCategory, setActiveCategory] = useState<typeof FAQ_CATEGORIES[number]>("About Course");
  const [openId, setOpenId] = useState<string | null>("f1");

  const filteredFaqs = useMemo(
    () => faqs.filter((faq: FAQItem) => faq.category === activeCategory),
    [faqs, activeCategory]
  );

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleCategoryChange = useCallback((cat: typeof FAQ_CATEGORIES[number]) => {
    setActiveCategory(cat);
    const firstFaq = faqs.find((f: FAQItem) => f.category === cat);
    if (firstFaq) setOpenId(firstFaq.id);
  }, [faqs]);

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Got Questions?"
          title="Frequently Asked"
          titleHighlight="Questions"
          subtitle="Everything you need to know about Accredian Enterprise learning cohorts, customization, and analytics."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-universal text-white shadow-sm scale-[1.02]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq: FAQItem) => (
            <AccordionItem
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
});

FAQ.displayName = "FAQ";
