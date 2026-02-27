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
    notification: "bg-[#ff5151] text-white",
    new: "bg-[#7bd6fd] text-[var(--primary)]",
    assigned: "bg-[#ffb74d] text-[var(--primary)]",
    interested: "bg-[#41e363] text-[var(--primary)]",
    "follow-up": "bg-[#ffcc80] text-[var(--primary)]",
    "not-interested": "bg-[#ffcdd2] text-[var(--primary)]",
    "team-lead": "bg-[#FFBF69] text-[var(--primary)]",
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
        "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium",
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
