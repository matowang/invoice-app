import { useQueryClient } from "@tanstack/react-query";
import { setCookie, destroyCookie, parseCookies } from "nookies";

import AuthAPI, { UserDTO } from "../api/auth";
import { setHeaderToken } from "../api/base";

import create from "zustand";
import { useEffect } from "react";

interface AuthState {
	loading: boolean;
	token: string | null;
	user: UserDTO | null;
	login: (token: string) => Promise<void>;
	logout: () => void;
	updateUser: (user: UserDTO) => void;
	initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	loading: true,
	token: null,
	user: null,
	login: async (token: string) => {
		setCookie(null, "token", token, {
			maxAge: 30 * 24 * 60 * 60,
			path: "/",
		});
		const user = await AuthAPI.validateToken(token);
		if (user) {
			set((state) => {
				setHeaderToken(token, state.logout);
				return { token, user };
			});
		} else {
			destroyCookie(null, "token");
		}
	},
	logout: () => {
		console.log("LOGOUT");
		destroyCookie(null, "token");
		set({ token: null, user: null });
	},
	updateUser: (user) => set({ user }),
	initAuth: async () => {
		set({ loading: true });
		const { token } = parseCookies();
		if (!token) return set({ loading: false });
		const user = await AuthAPI.validateToken(token);
		if (user) {
			setHeaderToken(token, get().logout);
			set({ token, user });
		} else {
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
