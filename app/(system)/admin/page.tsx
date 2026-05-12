import { TableMembersShowcasePage } from "@/components/system/table-members";
import { TableMembersSkeleton } from "@/components/skeleton/table-member-skeleton";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { getSessionUser } from "@/lib/actions/session";
import { getAllProfiles } from "@/lib/actions/profile";

import { redirect } from "next/navigation";
import { Suspense } from "react";
import SettingsActivityLog, { ActivityLogEntry } from "@/components/system/settings-activity-log";
import SettingsActivityLogSkeleton from "@/components/skeleton/logs-section-skeleton";

export default function AdminPage() {
    return (
        <Suspense fallback={<TableMembersSkeleton />}>
            <AdminSection />
        </Suspense>
    );
}

export async function AdminSection() {
    const tabs = [
        { name: "Members", value: "members" },
        { name: "Admin Logs", value: "logs" },
    ];

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

    const user = await getSessionUser();

    if (!user) redirect("/auth/login");
    if (!user.isAdmin) redirect("/dashboard");

    const members = await getAllProfiles();

    return (
        <div className="w-full py-8">
            <div className="mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
                <Tabs defaultValue="members" className="gap-4">
                    <TabsList className="h-fit! w-full rounded-none border-b bg-transparent p-0 sm:justify-start">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:border-primary rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none! dark:data-[state=active]:bg-transparent"
                            >
                                {tab.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="members" className="mt-4">
                        <TableMembersShowcasePage members={members} />
                    </TabsContent>

                    <TabsContent value="logs" className="mt-4">

                        <Suspense fallback={<SettingsActivityLogSkeleton />}>
                            <SettingsActivityLog entries={entries} />
                        </Suspense>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}