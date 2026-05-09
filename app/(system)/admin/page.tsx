import { TableMembersShowcasePage } from "@/components/system/table-members";
import { getSessionUser } from "@/lib/actions/session";
import { getAllProfiles } from "@/lib/actions/profile";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { TableMembersSkeleton } from "@/components/skeleton/table-member-skeleton";

export default function AdminPage() {
    return (
        <Suspense fallback={<TableMembersSkeleton />}>
            <AdminSection />
        </Suspense>
    );
}

export async function AdminSection() {
    const user = await getSessionUser();

    if (!user) redirect("/auth/login");
    if (!user.isAdmin) redirect("/dashboard");

    const members = await getAllProfiles();

    return (
        <div>
            <TableMembersShowcasePage members={members} />
        </div>
    );
}