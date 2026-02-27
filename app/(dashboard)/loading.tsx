export default function DashboardLoading() {
  return (
    <div className="p-8">
      <div className="mb-6 h-8 w-56 animate-pulse rounded bg-[var(--accent)]/30" />
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="h-28 animate-pulse rounded-2xl border border-[var(--border-dark)] bg-white"
          />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-2xl border border-[var(--border-dark)] bg-white" />
    </div>
  );
}
