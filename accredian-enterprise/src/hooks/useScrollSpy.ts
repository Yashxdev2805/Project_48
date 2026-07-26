"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "");
  const rafIdRef = useRef<number | null>(null);

  const sectionIdsKey = sectionIds.join(",");

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const checkActiveSection = () => {
      const scrollPosition = window.scrollY + offset;

      // 1. Check if user has scrolled to the very bottom of the page
      const isAtBottom =
        window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.scrollHeight - 60;

      if (isAtBottom && sectionIds.length > 0) {
        const lastId = sectionIds[sectionIds.length - 1];
        setActiveId((prev) => (prev !== lastId ? lastId : prev));
        return;
      }

      // 2. Find the last section whose top threshold is above/at the current scroll position
      let currentActiveId = sectionIds[0];

      for (let i = 0; i < sectionIds.length; i++) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);

        if (element) {
          // getBoundingClientRect().top + window.scrollY gives exact document-relative top
          const elementTop = element.getBoundingClientRect().top + window.scrollY;

          if (scrollPosition >= elementTop - 30) {
            currentActiveId = sectionId;
          }
        }
      }

      setActiveId((prev) => (prev !== currentActiveId ? currentActiveId : prev));
    };

    const handleScroll = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          checkActiveSection();
          rafIdRef.current = null;
        });
      }
    };

    // Initial check on mount
    checkActiveSection();

    window.addEventListener("scroll", handleScroll, { passive: true, capture: false });
    window.addEventListener("resize", checkActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkActiveSection);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [sectionIdsKey, offset, sectionIds]);

  return activeId;
}
