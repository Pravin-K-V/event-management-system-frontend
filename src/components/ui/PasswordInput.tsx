import { useState } from "react";
import Input, { type InputProps } from "./Input";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = Omit<InputProps, "type">;

export default function PasswordInput({
  className,
  ...rest
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...rest}
        type={showPassword ? "text" : "password"}
        className={`pr-10 ${className ?? ""}`}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-text-secondary hover:text-text-primary transition duration-200 ease-in-out"
      >
        {showPassword ? (
          <EyeOff
            size={20}
            className="transition-transform duration-200 ease-in-out"
          />
        ) : (
          <Eye
            size={20}
            className="transition-transform duration-200 ease-in-out"
          />
        )}
      </button>
    </div>
  );
}
