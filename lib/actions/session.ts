"use server";


import { createClient } from "@/lib/supabase/server";

export type SessionUser = {
    id: string;
    email: string;
    role: string;
    fullname: string;
    avatar_url: string;
    isAdmin: boolean;
};

export const getSessionUser = (
    async (): Promise<SessionUser | null> => {
        const supabase = await createClient();
        await supabase.auth.refreshSession();
        const { data, error } = await supabase.auth.getClaims();

        if (error || !data?.claims) {
            return null;
        }

        const claims = data.claims;

        const role =
            claims.user_metadata?.role ?? "user";

        const fullname =
            claims.user_metadata?.fullname ?? "User";

        const avatar_url =
            claims.user_metadata?.avatar_url ?? "";

        return {
            id: claims.sub,
            email: claims.email ?? "",
            role,
            fullname,
            avatar_url,
            isAdmin: role === "admin",
        };
    }
);