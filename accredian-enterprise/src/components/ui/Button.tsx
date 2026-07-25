import React, { memo } from "react";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const BASE_CLASSES =
  "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const VARIANT_CLASSES = {
  primary:
    "bg-universal text-white hover:bg-blue-700 shadow-md hover:shadow-lg focus:ring-blue-500",
  secondary:
    "bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-400 border border-blue-200",
  outline:
    "border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-400",
  ghost:
    "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300",
};

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-xs sm:text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base sm:text-lg font-bold",
};

export const Button = memo<ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    children,
    icon,
    iconPosition = "right",
    fullWidth = false,
    href,
    className = "",
    type = "button",
    onClick,
    ...props
  }) => {
    const widthClass = fullWidth ? "w-full" : "";
    const combinedClasses = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${widthClass} ${className}`;

    const content = (
      <>
        {icon && iconPosition === "left" && <span className="mr-2 inline-flex items-center">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === "right" && <span className="ml-2 inline-flex items-center">{icon}</span>}
      </>
    );

    if (href) {
      return (
        <a href={href} onClick={onClick} className={combinedClasses}>
          {content}
        </a>
      );
    }

    return (
      <button type={type} onClick={onClick} className={combinedClasses} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
