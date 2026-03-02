import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "success"
    | "notification"
    | "new"
    | "assigned"
    | "interested"
    | "follow-up"
    | "not-interested"
    | "team-lead"
    | "associate";
  dot?: boolean;
}

function Badge({
  variant = "default",
  dot,
  className,
  children,
  ...props
}: BadgeProps) {
  const variants: Record<string, string> = {
    default: "bg-[var(--primary)] text-white",
    success: "bg-[var(--success)] text-white",
    notification: "bg-[var(--danger)] text-white",
    new: "bg-[var(--status-new)] text-[var(--primary)]",
    assigned: "bg-[var(--status-assigned)] text-[var(--primary)]",
    interested: "bg-[var(--status-interested)] text-[var(--primary)]",
    "follow-up": "bg-[var(--status-follow-up)] text-[var(--primary)]",
    "not-interested": "bg-[var(--status-not-interested)] text-[var(--primary)]",
    "team-lead": "bg-[var(--warning)] text-[var(--primary)]",
    associate: "bg-[#FFC0CB] text-[var(--primary)]",
  };

  if (dot) {
    return (
      <span
        className={cn(
          "inline-flex size-2.5 shrink-0 rounded-full",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-full)] px-2 py-0.5 text-[length:var(--text-xs)] font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
