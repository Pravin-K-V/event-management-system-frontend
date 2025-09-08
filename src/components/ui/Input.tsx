// src/components/ui/Input.tsx
import type { ChangeEvent } from "react";

interface InputProps {
  label?: string;
  name?: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
    </div>
  );
}
