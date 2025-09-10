import clsx from "clsx";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export default function Switch({
  checked,
  onChange,
  disabled = false,
  label,
}: SwitchProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        className={clsx(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          checked ? "bg-[var(--color-primary)]" : "bg-gray-300",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <span
          className={clsx(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        ></span>
      </button>
      {label && (
        <span className="text-[var(--color-text-primary)]">{label}</span>
      )}
    </div>
  );
}
