"use client";

import React, { useState, useEffect, memo, createContext, useContext } from "react";

interface ComingSoonContextType {
  triggerComingSoon: (featureName: string, description?: string) => void;
}

const ComingSoonContext = createContext<ComingSoonContextType | undefined>(undefined);

export function ComingSoonProvider({ children }: { children: React.ReactNode }) {
  const [activeFeature, setActiveFeature] = useState<{ name: string; desc?: string } | null>(null);

  const triggerComingSoon = (featureName: string, description?: string) => {
    setActiveFeature({ name: featureName, desc: description });
  };

  const closeModal = () => {
    setActiveFeature(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeFeature) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFeature]);

  return (
    <ComingSoonContext.Provider value={{ triggerComingSoon }}>
      {children}

      {/* Modal Dialog */}
      {activeFeature && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeModal}
          />

          {/* Dialog Body */}
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            {/* Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-500 flex items-center justify-center mx-auto text-3xl shadow-sm border border-amber-200 dark:border-amber-800">
              🚀
            </div>

            {/* Badge Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 border border-amber-200 dark:border-amber-700 mx-auto">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Production Ready Option
            </span>

            {/* Title */}
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                {activeFeature.name}
              </h3>
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                Coming Soon in Production System
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {activeFeature.desc ||
                "This enterprise integration option is currently configured for production deployment environments. Full live connectivity will be activated upon production launch."}
            </p>

            {/* CTA Close Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="w-full py-3 px-4 rounded-xl bg-universal hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const context = useContext(ComingSoonContext);
  if (!context) {
    throw new Error("useComingSoon must be used within a ComingSoonProvider");
  }
  return context;
}
