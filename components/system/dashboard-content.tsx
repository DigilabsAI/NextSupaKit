"use client";

import { StatCard } from "./stat-card";
import { ChartCard } from "./chart-card";
import { useDashboardStore } from "@/store/dashboard-store";
import { RecentDocuments } from "./recent-documents";

export function DashboardContent() {
  const { stats } = useDashboardStore();

  return (
    <div className="mx-auto w-full space-y-6 min-h-screen">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon as "users" | "clipboard" | "wallet" | "invoice"}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard />
        <RecentDocuments />
      </div>
    </div>
  );
}