import clsx from "clsx";
import React, { useRef } from "react";

interface ImageUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  error = false,
  helperText,
  disabled = false,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type.startsWith("image/")) {
      onChange(file);
    } else {
      onChange(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onChange(file);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const classes = clsx(
    "w-full border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
    "bg-[var(--color-card)] text-[var(--color-text-secondary)]",
    "hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
    error && "border-[var(--color-error)] text-[var(--color-error)]",
    disabled &&
      "bg-gray-100 cursor-not-allowed text-[var(--color-text-disabled)]",
  );

  return (
    <div className="flex flex-col space-y-2">
      <div
        className={classes}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {value ? (
          <img
            src={URL.createObjectURL(value)}
            alt="preview"
            className="max-h-48 mx-auto rounded-md object-contain"
          />
        ) : (
          <p>Click or drag & drop to upload an image</p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
      {helperText && (
        <p className="text-sm text-[var(--color-error)]">{helperText}</p>
      )}
    </div>
  );
}
