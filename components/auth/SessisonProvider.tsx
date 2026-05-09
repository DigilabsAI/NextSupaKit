"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthUser, UserClaims, useUser } from "@/store/user";

export default function SessionProvider() {
  const supabase = createClient();
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    const loadUser = async () => {
      const [{ data: userRes }, { data: claimsRes }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.auth.getClaims(),
      ]);

      const user = userRes.user;

      if (!user) {
        setUser(null);
        return;
      }

      const mergedUser: AuthUser = {
        ...user,
        claims: claimsRes?.claims as UserClaims | undefined,
      };

      setUser(mergedUser);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => subscription.unsubscribe();
  }, [supabase, setUser]);

  return null;
}