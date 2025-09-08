// src/components/ui/Button.tsx
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onclick?: () => void;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string; // ← add this
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onclick,
  iconLeft,
  iconRight,
  type = "button",
  className = "", // ← default empty
}: ButtonProps) {
  const baseStyle =
    "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-1";
  const sizeStyle =
    size === "sm"
      ? "px-3 py-1 text-sm"
      : size === "lg"
        ? "px-6 py-3 text-lg"
        : "px-4 py-2 text-md";
  const variantStyle =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : variant === "secondary"
        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
        : "bg-red-600 text-white hover:bg-red-700";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onclick}
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
}
