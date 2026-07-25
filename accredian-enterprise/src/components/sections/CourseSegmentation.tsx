"use client";

import React, { useState, memo } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { enterpriseData } from "@/lib/data/enterprise";
import { SegmentationCategory } from "@/lib/types";

export const CourseSegmentation = memo(() => {
  const { segmentation } = enterpriseData;
  const [activeTab, setActiveTab] = useState<string>(segmentation[0]?.id || "");

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <Container>
        <SectionHeading
          badge="Tailored Architecture"
          title="Course Segmentation"
          titleHighlight="Matrix"
          subtitle="Flexible learning dimensions structured around your enterprise's unique structure, roles, and technical goals."
        />

        {/* Tab Headers */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {segmentation.map((category: SegmentationCategory) => {
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-universal text-white shadow-sm scale-[1.02]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200/80"
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Tab Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {segmentation.map((category: SegmentationCategory) => {
            const isSelected = activeTab === category.id;
            return (
              <Card
                key={category.id}
                className={`transition-all duration-300 ${
                  isSelected
                    ? "border-universal ring-2 ring-blue-100 shadow-md bg-blue-50/20"
                    : "opacity-80 hover:opacity-100"
                }`}
                padding="md"
                onClick={() => setActiveTab(category.id)}
              >
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? "bg-universal" : "bg-gray-300"}`} />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                        isSelected
                          ? "bg-white text-universal border-blue-200 font-semibold shadow-xs"
                          : "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
});

CourseSegmentation.displayName = "CourseSegmentation";
