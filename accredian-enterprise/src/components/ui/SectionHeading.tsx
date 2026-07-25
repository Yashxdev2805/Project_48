import React, { memo } from "react";

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export const SectionHeading = memo<SectionHeadingProps>(
  ({
    badge,
    title,
    titleHighlight,
    subtitle,
    align = "center",
    className = "",
    dark = false,
  }) => {
    const alignmentClass =
      align === "center"
        ? "text-center mx-auto"
        : align === "right"
        ? "text-right ml-auto"
        : "text-left";

    return (
      <div className={`max-w-3xl mb-10 sm:mb-14 ${alignmentClass} ${className}`}>
        {badge && (
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-200">
            {badge}
          </span>
        )}
        <h2
          className={`text-2xl sm:text-4xl font-bold tracking-tight leading-tight ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}{" "}
          {titleHighlight && (
            <span className="text-universal">{titleHighlight}</span>
          )}
        </h2>
        {subtitle && (
          <p
            className={`mt-3 text-base sm:text-lg leading-relaxed ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";
