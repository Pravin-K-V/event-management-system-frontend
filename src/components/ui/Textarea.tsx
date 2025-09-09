import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
}

const baseClasses =
  "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text-primary)] bg-[var(--color-card)] placeholder-[var(--color-text-secondary)]";

const errorClasses =
  "border-[var(--color-error)] focus:ring-[var(--color-error)] focus:border-transparent";
const disabledClasses =
  "bg-gray-100 cursor-not-allowed text-[var(--color-text-disabled)]";

export default function Textarea({
  error = false,
  helperText,
  disabled = false,
  className,
  ...rest
}: TextareaProps) {
  const classes = clsx(
    baseClasses,
    error && errorClasses,
    disabled && disabledClasses,
    className,
  );

  return (
    <div className="flex flex-col space-y-1">
      <textarea className={classes} disabled={disabled} {...rest} />
      {helperText && (
        <p className="text-sm text-[var(--color-error)]">{helperText}</p>
      )}
    </div>
  );
}
