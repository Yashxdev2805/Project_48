import React, { memo } from "react";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

export const Container = memo<ContainerProps>(
  ({ children, className = "", id, as: Component = "div" }) => {
    return (
      <Component
        id={id}
        className={`max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
