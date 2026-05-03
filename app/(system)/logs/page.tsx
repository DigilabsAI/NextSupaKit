import SettingsActivityLogSkeleton from "@/components/skeleton/logs-section-skeleton";
import SettingsActivityLog, { ActivityLogEntry } from "@/components/system/settings-activity-log";
import { Suspense } from "react";

export default function page() {

  const entries: ActivityLogEntry[] = [
    {
      id: "log-1",
      action: "login",
      type: "login",
      description: "User logged in",
      ipAddress: "192.168.1.1",
      location: "San Francisco, CA",
      device: "MacBook Pro",
      timestamp: new Date("2026-05-02T10:30:00Z"),
      status: "success",
    },
      {
      id: "log-2",
      action: "login",
      type: "login",
      description: "User logged in",
      ipAddress: "192.168.1.1",
      location: "San Francisco, CA",
      device: "MacBook Pro",
      timestamp: new Date("2026-05-02T10:30:00Z"),
      status: "success",
    },
      {
      id: "log-3",
      action: "login",
      type: "login",
      description: "User logged in",
      ipAddress: "192.168.1.1",
      location: "San Francisco, CA",
      device: "MacBook Pro",
      timestamp: new Date("2026-05-02T10:30:00Z"),
      status: "success",
    },
  ];

  return (
    <div>
      <Suspense fallback={<SettingsActivityLogSkeleton />}>
        <SettingsActivityLog entries={entries} />
      </Suspense>
    </div>
  )
}
