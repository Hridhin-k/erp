import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
}

function Progress({ value, max = 100, className, ...props }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={cn(
        "flex w-full items-center gap-2",
        className
      )}
      {...props}
    >
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--accent)]">
        <div
          className="h-full rounded-full bg-[var(--primary)] transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="shrink-0 text-[11px] text-[var(--primary)]">
        {Math.round(value)}%
      </span>
    </div>
  );
}

export { Progress };
