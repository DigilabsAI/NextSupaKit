import { create } from "zustand";
import type { User } from "@supabase/supabase-js";


export type AppRole = "user" | "admin";

export interface UserClaims {

	user_metadata: {
		role: AppRole;
		fullname: string;
		avatar_url: string;
	};
	sub: string;
	email?: string;
}

export interface AuthUser extends User {
	claims?: UserClaims;
}

interface UserState {
	user: AuthUser | null;
	setUser: (user: AuthUser | null) => void;
}

export const useUser = create<UserState>()((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));