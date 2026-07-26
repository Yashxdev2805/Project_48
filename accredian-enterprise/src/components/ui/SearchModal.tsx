"use client";

import React, { useState, useEffect, useCallback, useRef, memo, useMemo } from "react";
import { enterpriseData } from "@/lib/data/enterprise";

interface SearchItem {
  id: string;
  type: "section" | "domain" | "faq" | "program";
  title: string;
  subtitle: string;
  href: string;
  keywords: string[];
}

/**
 * Build a flat searchable index from enterprise data.
 * This runs once at module load and is shared across renders.
 */
function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Add navigation sections
  enterpriseData.navLinks.forEach((link) => {
    items.push({
      id: `nav-${link.id}`,
      type: "section",
      title: link.label,
      subtitle: "Page Section",
      href: link.href,
      keywords: [link.label.toLowerCase(), link.id],
    });
  });

  // Add domains
  enterpriseData.domains.forEach((domain) => {
    items.push({
      id: `domain-${domain.id}`,
      type: "domain",
      title: domain.title,
      subtitle: domain.subtitle,
      href: "#domains",
      keywords: [
        domain.title.toLowerCase(),
        domain.subtitle.toLowerCase(),
        ...domain.skills.map((s) => s.toLowerCase()),
      ],
    });
  });

  // Add FAQs
  enterpriseData.faqs.forEach((faq) => {
    items.push({
      id: `faq-${faq.id}`,
      type: "faq",
      title: faq.question,
      subtitle: `FAQ · ${faq.category}`,
      href: "#faqs",
      keywords: [faq.question.toLowerCase(), faq.answer.toLowerCase().slice(0, 100)],
    });
  });

  // Add segmentation items as programs
  enterpriseData.segmentation.forEach((cat) => {
    cat.items.forEach((item, idx) => {
      items.push({
        id: `prog-${cat.id}-${idx}`,
        type: "program",
        title: item,
        subtitle: `Program · ${cat.title}`,
        href: "#domains",
        keywords: [item.toLowerCase(), cat.title.toLowerCase()],
      });
    });
  });

  return items;
}

const SEARCH_INDEX = buildSearchIndex();

const TYPE_ICONS: Record<string, string> = {
  section: "📄",
  domain: "🧠",
  faq: "❓",
  program: "📚",
};

export const SearchModal = memo(() => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return SEARCH_INDEX.slice(0, 8);
    const q = query.toLowerCase().trim();
    return SEARCH_INDEX.filter((item) =>
      item.keywords.some((kw) => kw.includes(q)) || item.title.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      // Small delay so the modal renders before focusing
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.children[selectedIndex] as HTMLElement;
      selected?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const navigateTo = useCallback(
    (href: string) => {
      setOpen(false);
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    []
  );

  const handleKeyNavigation = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        navigateTo(results[selectedIndex].href);
      }
    },
    [results, selectedIndex, navigateTo]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNavigation}
            placeholder="Search sections, programs, FAQs..."
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            autoComplete="off"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-72 overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.href)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  idx === selectedIndex
                    ? "bg-blue-50 text-universal"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-base flex-shrink-0">{TYPE_ICONS[item.type] || "📄"}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${idx === selectedIndex ? "text-universal" : "text-gray-900"}`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{item.subtitle}</p>
                </div>
                {idx === selectedIndex && (
                  <span className="text-xs text-gray-400 flex-shrink-0">↵</span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-gray-100 rounded border border-gray-200 font-mono">↑</kbd>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded border border-gray-200 font-mono">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-gray-100 rounded border border-gray-200 font-mono">↵</kbd>
              Select
            </span>
          </div>
          <span className="text-[10px] text-gray-400">Powered by Accredian Search</span>
        </div>
      </div>
    </div>
  );
});

SearchModal.displayName = "SearchModal";
