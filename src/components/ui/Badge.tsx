import clsx from "clsx";
import type React from "react";

interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  type?: "solid" | "outline";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "primary",
  type = "solid",
  children,
  className,
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";

  const solidStyles = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    success: "bg-success text-white",
    warning: "bg-warning text-white",
    error: "bg-error text-white",
  };

  const outlineStyles = {
    primary: "border border-primary text-primary",
    secondary: "border border-secondary text-secondary",
    success: "border border-success text-success",
    warning: "border border-warning text-warning",
    error: "border border-error text-error",
  };

  return (
    <span
      className={clsx(
        baseClasses,
        type == "solid" ? solidStyles[variant] : outlineStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
