"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollSpy(sectionIds: string[], offset = 120): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "");
  const rafIdRef = useRef<number | null>(null);

  const sectionIdsKey = sectionIds.join(",");

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const checkActiveSection = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);

        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId((prev) => (prev !== sectionId ? sectionId : prev));
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          checkActiveSection();
          rafIdRef.current = null;
        });
      }
    };

    // Initial check
    checkActiveSection();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [sectionIdsKey, offset]);

  return activeId;
}
