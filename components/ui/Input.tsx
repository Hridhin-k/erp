import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center gap-3.5 overflow-hidden rounded-[var(--radius-full)] bg-[var(--surface-input)] pl-3.5 pr-4 py-2.5",
          className
        )}
      >
        {leftIcon && (
          <span className="shrink-0 text-[var(--muted)]">{leftIcon}</span>
        )}
        <input
          type={type}
          ref={ref}
          className="flex-1 bg-transparent text-[length:var(--text-sm)] text-[var(--primary)] placeholder:text-[var(--muted)] focus:outline-none"
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
