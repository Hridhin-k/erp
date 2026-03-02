import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "ghostMuted"
    | "ghostDanger"
    | "outline";
  size?: "sm" | "md" | "lg" | "icon" | "iconSm";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-medium transition-[background-color,color,border-color,transform,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:-translate-y-[1px] hover:shadow-sm active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-light)]",
      secondary:
        "border border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)]/5",
      ghost: "bg-transparent text-white hover:bg-white/10",
      ghostMuted:
        "rounded p-1 bg-transparent text-[var(--muted)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]",
      ghostDanger:
        "rounded p-1 bg-transparent text-[var(--muted)] hover:bg-red-50 hover:text-red-600",
      outline:
        "border border-[var(--primary)] bg-white text-[var(--primary)] hover:bg-[var(--primary)]/5",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-5 text-base",
      icon: "size-10 p-0 shrink-0",
      iconSm: "size-9 p-0 shrink-0",
    };

    const sizeClasses = sizes[size] ?? sizes.md;
    const variantClasses = variants[variant] ?? variants.primary;

    return (
      <button
        ref={ref}
        className={cn(base, variantClasses, sizeClasses, className)}
        {...props}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
