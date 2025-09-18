import clsx from "clsx";
import type React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const baseClasses =
  "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] text-[var(--color-text-primary)] bg-[var(--color-card)] placeholder-[var(--color-text-secondary)]";
const errorClasses =
  "border-[var(--color-error)] focus:ring-[var(--color-error)]";
const disabledClasses =
  "bg-gray-100 cursor-not-allowed text-[var(--color-text-disabled)]";

export default function Input({
  error = false,
  helperText,
  disabled = false,
  className,
  ...rest
}: InputProps) {
  const classes = clsx(
    baseClasses,
    error && errorClasses,
    disabled && disabledClasses,
    className,
  );

  return (
    <div className="flex flex-col space-y-1">
      <input className={classes} disabled={disabled} {...rest} />
      {helperText && (
        <p className="text-sm text-[var(--color-error)]">{helperText}</p>
      )}
    </div>
  );
}
