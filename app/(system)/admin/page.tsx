import { TableMembersShowcasePage } from "@/components/table-members";
import { getSessionUser } from "@/lib/actions/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function AdminPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminSection />
        </Suspense>
    )
}


export async function AdminSection() {

    const user = await getSessionUser();

    if (!user) {
        redirect("/auth/login");
    }
    if (!user.isAdmin) {
        redirect("/dashboard");
    }


    return (
        <div>
            <TableMembersShowcasePage />
        </div>
    )
}

