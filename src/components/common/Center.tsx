import React from "react";

/**
 * Center children both vertically and horizontally
 */
export const Center: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...props }) => {
  return (
    <div
      className={`flex h-full items-center justify-center ${className}`}
      {...props}
    />
  );
};
