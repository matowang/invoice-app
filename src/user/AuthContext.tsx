import { useQueryClient } from "@tanstack/react-query";
import { setCookie, destroyCookie, parseCookies } from "nookies";

import { validateToken, UserDTO } from "../api/auth";
import { setHeaderToken } from "../api/base";

import create from "zustand";
import { useEffect } from "react";

export type AuthStatus = "loading" | "error" | "authorized" | "unauthorized";

interface AuthState {
	loading: boolean;
	token: string | null;
	user: UserDTO | null;
	login: (token: string) => Promise<void>;
	logout: () => void;
	updateUser: (user: UserDTO) => void;
	initAuth: () => Promise<void>;
	status: AuthStatus;
}

//TODO enable error state

export const useAuthStore = create<AuthState>((set, get) => ({
	status: "loading",
	loading: true,
	token: null,
	user: null,
	login: async (token: string) => {
		setCookie(null, "token", token, {
			maxAge: 30 * 24 * 60 * 60,
			path: "/",
		});
		const user = await validateToken(token);
		if (user) {
			set((state) => {
				setHeaderToken(token, state.logout);
				return { token, user, status: "authorized" };
			});
		} else {
			destroyCookie(null, "token");
		}
	},
	logout: () => {
		console.log("LOGOUT");
		destroyCookie(null, "token");
		set({ token: null, user: null, status: "unauthorized" });
	},
	updateUser: (user) => set({ user }),
	initAuth: async () => {
		set({ loading: true, status: "loading" });
		const { token } = parseCookies();
		if (!token) return set({ loading: false, status: "unauthorized" });
		const user = await validateToken(token);
		if (user) {
			setHeaderToken(token, get().logout);
			set({ token, user, status: "authorized" });
		} else {
			set({ status: "unauthorized" });
			destroyCookie(null, "token");
		}
		set({ loading: false });
	},
}));

export const useAuth = () => {
	const authState = useAuthStore((state) => state);
	const queryClient = useQueryClient();
	return {
		...authState,
		logout: () => {
			queryClient.clear();
			authState.logout();
		},
		isLoggedIn: !authState.loading && !!authState.user,
	};
};

export const useInitAuth = () => {
	const initAuth = useAuthStore((state) => state.initAuth);
	useEffect(() => {
		initAuth();
	}, [initAuth]);
};
