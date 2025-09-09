import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Card({
  header,
  footer,
  children,
  className,
}: CardProps) {
  const classes = clsx(
    "bg-[var(--color-card)] rounded-lg shadow-md p-4",
    "hover:shadow-lg transition-shadow",
    className,
  );

  return (
    <div className={classes}>
      {header && (
        <div className="mb-2 font-semibold text-[var(--color-text-primary)]">
          {header}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-2">{footer}</div>}
    </div>
  );
}
