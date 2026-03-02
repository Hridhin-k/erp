"use client";

import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeId, onTabChange, className }: TabsProps) {
  return (
    <nav className={cn("flex gap-0 overflow-x-auto", className)}>
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative whitespace-nowrap px-3 py-2 text-[length:var(--text-sm)] transition-[background-color,color,transform] duration-150 ease-out hover:-translate-y-[1px] sm:px-4",
              isActive
                ? "font-medium text-[var(--primary)]"
                : "font-normal text-[var(--primary)] hover:bg-[var(--primary)]/5"
            )}
          >
            {tab.label}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-[var(--primary)] transition-transform duration-150 ease-out" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
