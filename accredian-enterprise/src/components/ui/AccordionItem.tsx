"use client";

import React, { memo } from "react";

export interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem = memo<AccordionItemProps>(
  ({ id, question, answer, isOpen, onToggle }) => {
    return (
      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-colors duration-200">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${id}`}
          id={`faq-header-${id}`}
          className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-gray-900 hover:text-universal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors cursor-pointer"
        >
          <span className="text-base sm:text-lg pr-4">{question}</span>
          <span
            className={`flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-universal flex items-center justify-center transition-transform duration-300 ${
              isOpen ? "rotate-180 bg-universal text-white" : ""
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div
            id={`faq-answer-${id}`}
            role="region"
            aria-labelledby={`faq-header-${id}`}
            className="px-6 pb-6 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-gray-50/50 animate-in fade-in duration-200"
          >
            {answer}
          </div>
        )}
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";
