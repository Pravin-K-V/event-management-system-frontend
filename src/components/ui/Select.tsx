import clsx from "clsx";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function Select({
  value,
  onChange,
  options,
  error = false,
  helperText,
  disabled = false,
  placeholder,
}: SelectProps) {
  const classes = clsx(
    "w-full px-3 py-2 pr-8 border rounded-lg bg-[var(--color-card)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]",
    "appearance-none",
    error &&
      "border-[var(--color-error)] focus:ring-[var(--color-error)] focus:border-transparent",
    disabled &&
      "bg-gray-100 cursor-not-allowed text-[var(--color-text-disabled)]",
  );

  return (
    <div className="flex flex-col space-y-1 relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={classes}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p className="text-sm text-[var(--color-error)]">{helperText}</p>
      )}
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-secondary)]">
        ▼
      </span>
    </div>
  );
}
