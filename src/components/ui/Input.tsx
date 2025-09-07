import React from "react";

type InputProps = React.PropsWithChildren<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  disabled?: boolean;
  error?: string;
  size?: "sm" | "md" | "lg";
}>;

const SIZE_CLASSES = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const BASE_CLASSES =
  "border rounded w-full focus:outline-none focus:ring-2 focus:ring-offset-1";
const ERROR_CLASSES = "border-error focus:ring-error";

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  error,
  size = "md",
}) => {
  const finalClassName = `${BASE_CLASSES} ${SIZE_CLASSES[size]} ${
    error ? ERROR_CLASSES : "border-gray-300 focus:ring-primary"
  }`;

  return (
    <div className="flex flex-col w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={finalClassName}
      />
      {error && <span className="text-error text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Input;
