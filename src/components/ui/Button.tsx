import React from "react";

type ButtonProps = React.PropsWithChildren<{
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onclick?: () => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: "submit" | "reset";
}>;

const VARIANT_CLASSES = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "bg-secondary text-white hover:bg-secondary-hover",
  danger: "bg-error text-white hover:bg-error-hover",
};

const SIZE_CLASSES = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onclick,
  iconLeft,
  iconRight,
  type,
}) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const finalClassName = `${baseStyle} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`;

  return (
    <>
      <button
        type={type}
        className={finalClassName}
        onClick={onclick}
        disabled={disabled}
      >
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    </>
  );
};

export default Button;
