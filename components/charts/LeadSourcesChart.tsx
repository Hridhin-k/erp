"use client";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/lib/utils";

export interface LeadSourceItem {
  name: string;
  value: number;
  color: string;
}

const DEFAULT_DATA: LeadSourceItem[] = [
  { name: "Website", value: 45, color: "#7bd6fd" },
  { name: "Google Ads", value: 25, color: "#274a8c" },
  { name: "Social", value: 20, color: "#0c234f" },
  { name: "WhatsApp", value: 8, color: "#1674fa" },
  { name: "Manual", value: 2, color: "#76b4ff" },
];

interface LeadSourcesChartProps {
  data?: LeadSourceItem[];
  title?: string;
  className?: string;
}

export function LeadSourcesChart({
  data = DEFAULT_DATA,
  title = "Lead Sources",
  className,
}: LeadSourcesChartProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-[#a0a9ba] bg-white p-6",
        className
      )}
      data-name="LeadSourcesChart"
    >
      <h3 className="mb-6 text-lg font-semibold text-[var(--primary)]">
        {title}
      </h3>

      <div className="flex flex-col items-center gap-6 ">
        <div className="h-[180px] min-h-[180px] w-full max-w-[180px] min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid w-full max-w-[289px] grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-8 sm:gap-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-[var(--primary)]">
                {item.name} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
