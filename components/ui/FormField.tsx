"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  leftIcon?: React.ReactNode;
  error?: string;
  wrapperClassName?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      id,
      leftIcon,
      error,
      className,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-[var(--primary)]"
        >
          {label}
        </label>
        <div
          className={cn(
            "flex h-11 items-center gap-3 rounded-lg border bg-white px-4 transition-colors",
            "border-[var(--border)] focus-within:border-[var(--primary)] focus-within:ring-1 focus-within:ring-[var(--primary)]",
            error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
          )}
        >
          {leftIcon && (
            <span className="shrink-0 text-[var(--muted)]">{leftIcon}</span>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              "flex-1 bg-transparent text-sm text-[var(--primary)] placeholder:text-[var(--muted)] focus:outline-none",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
