import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function DatePicker({
  value,
  onChange,
  error = false,
  helperText,
  disabled = false,
  placeholder,
}: DatePickerProps) {
  const classes = clsx(
    "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text-primary)] bg-[var(--color-card)] placeholder-[var(--color-text-secondary)]",
    error &&
      "border-[var(--color-error)] focus:ring-[var(--color-error)] focus:border-transparent",
    disabled &&
      "bg-gray-100 cursor-not-allowed text-[var(--color-text-disabled)]",
  );

  return (
    <div className="flex flex-col space-y-1">
      <ReactDatePicker
        selected={value ? new Date(value) : null}
        onChange={(date) =>
          onChange(date ? date.toISOString().split("T")[0] : "")
        }
        disabled={disabled}
        placeholderText={placeholder}
        className={classes}
        dateFormat="yyyy-MM-dd"
      />
      {helperText && (
        <p className="text-sm text-[var(--color-error)]">{helperText}</p>
      )}
    </div>
  );
}
