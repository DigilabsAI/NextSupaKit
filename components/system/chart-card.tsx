"use client";

import { useState } from "react";
import { Users, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboardStore } from "@/store/dashboard-store";

// ✅ shadcn theme tokens
const NEW_LEADS_COLOR = "hsl(var(--foreground))";
const REPLIED_COLOR = "hsl(var(--muted-foreground))";

const LABEL_COLOR = "hsl(var(--muted-foreground))";
const GRID_COLOR = "hsl(var(--border))";
const TOOLTIP_CURSOR = "hsl(var(--muted) / 0.2)";

export function ChartCard() {
  const { chartData } = useDashboardStore();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const formatDateRange = (date: Date | undefined) => {
    if (!date) return "November";
    return date.toLocaleDateString("en-US", { month: "long" });
  };

  return (
    <div className="relative rounded-xl border border-border bg-card p-6 max-h-[400px] overflow-y-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <h2 className="text-[15px] font-normal text-foreground tracking-[-0.45px]">
            Leads Over Time
          </h2>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-2 text-xs px-[10px] py-[4px]"
            >
              <CalendarIcon className="size-4" />
              {formatDateRange(date)}
              <ChevronDown className="size-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Legend */}
      <div className="mb-4 flex items-center justify-center gap-[22px]">
        <div className="flex items-center gap-1.5">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: NEW_LEADS_COLOR }}
          />
          <span className="text-xs font-medium text-muted-foreground tracking-[-0.24px]">
            New Leads
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className="size-3 rounded-full"
            style={{ backgroundColor: REPLIED_COLOR }}
          />
          <span className="text-xs font-medium text-muted-foreground tracking-[-0.24px]">
            Replied
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative pl-8">
        <ResponsiveContainer width="100%" height={237}>
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barCategoryGap={4}
            barGap={5}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={GRID_COLOR}
              strokeWidth={1}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: LABEL_COLOR,
                fontSize: 12,
                fontWeight: 400,
              }}
              axisLine={false}
              tickLine={false}
              tickMargin={13}
            />

            <YAxis
              tick={{
                fill: LABEL_COLOR,
                fontSize: 12,
                fontWeight: 400,
              }}
              axisLine={false}
              tickLine={false}
              domain={[0, 1000]}
              ticks={[0, 250, 500, 750, 1000]}
              tickFormatter={(value) =>
                value === 1000 ? "1,000" : value.toString()
              }
              width={40}
            />

            <Tooltip
              cursor={{ fill: TOOLTIP_CURSOR }}
              contentStyle={{
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                padding: 0,
              }}
              wrapperStyle={{ outline: "none" }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;

                const newLeadsEntry = payload.find(
                  (p) => p.dataKey === "newLeads"
                );
                const repliedEntry = payload.find(
                  (p) => p.dataKey === "replied"
                );

                return (
                  <div className="rounded-lg border border-border bg-card p-2 shadow-lg">
                    <p className="mb-1.5 text-xs font-medium text-foreground">
                      {label}, 2025
                    </p>

                    {newLeadsEntry && (
                      <div className="mb-1 flex items-center gap-1.5">
                        <div
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: NEW_LEADS_COLOR }}
                        />
                        <span className="flex-1 text-xs font-medium text-foreground">
                          {newLeadsEntry.value}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          +92
                        </span>
                      </div>
                    )}

                    {repliedEntry && (
                      <div className="flex items-center gap-1.5">
                        <div
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: REPLIED_COLOR }}
                        />
                        <span className="flex-1 text-xs font-medium text-foreground">
                          {repliedEntry.value}
                        </span>
                        <span className="text-xs font-medium text-primary">
                          +67
                        </span>
                      </div>
                    )}
                  </div>
                );
              }}
            />

            <Bar
              dataKey="newLeads"
              fill={NEW_LEADS_COLOR}
              radius={[5, 5, 0, 0]}
              barSize={30}
            />

            <Bar
              dataKey="replied"
              fill={REPLIED_COLOR}
              radius={[5, 5, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}