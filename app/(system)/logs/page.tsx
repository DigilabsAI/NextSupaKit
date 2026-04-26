import SettingsActivityLog, { ActivityLogEntry } from "@/components/ui/settings-activity-log";

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
      timestamp: new Date(), 
      status: "success",
    },
  ];

  return (
    <div>
      <SettingsActivityLog entries={entries} />
    </div>
  )
}
