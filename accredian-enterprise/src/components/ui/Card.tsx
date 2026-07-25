import React, { memo } from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
  onClick?: () => void;
}

const PADDING_CLASSES = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = memo<CardProps>(
  ({
    children,
    className = "",
    hoverEffect = true,
    padding = "md",
    bordered = true,
    onClick,
  }) => {
    const hoverClass = hoverEffect
      ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200"
      : "";

    const borderClass = bordered ? "border border-gray-200" : "";
    const isInteractive = Boolean(onClick);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (onClick && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick();
      }
    };

    return (
      <div
        onClick={onClick}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        className={`bg-white rounded-xl shadow-sm ${borderClass} ${PADDING_CLASSES[padding]} ${hoverClass} ${
          isInteractive ? "cursor-pointer" : ""
        } ${className}`}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
