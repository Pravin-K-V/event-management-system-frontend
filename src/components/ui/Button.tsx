import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const baseClasses =
  "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white focus-visible:ring-[var(--color-primary)]",
  secondary:
    "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-white focus-visible:ring-[var(--color-secondary)]",
  danger:
    "bg-[var(--color-error)] hover:brightness-90 text-white focus-visible:ring-[var(--color-error)]",
};

export default function Button({
  variant = "primary",
  disabled = false,
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = clsx(
    baseClasses,
    variantStyles[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
