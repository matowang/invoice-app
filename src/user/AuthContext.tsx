import { useQueryClient } from "@tanstack/react-query";
import { setCookie, destroyCookie, parseCookies } from "nookies";

import AuthAPI, { setHeaderToken, UserDTO } from "../api/auth";

import create from "zustand";
import { ReactNode, useEffect } from "react";

interface AuthState {
	loading: boolean;
	token: string | null;
	user: UserDTO | null;
	login: (token: string) => Promise<void>;
	logout: () => void;
	updateUser: (user: UserDTO) => void;
	initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
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
			set((state) => {
				setHeaderToken(token, state.logout);
				return { token, user };
			});
		} else {
			destroyCookie(null, "token");
		}
		set({ loading: false });
	},
}));

export const useAuth = () => {
	const queryClient = useQueryClient();
	const authState = useAuthStore((state) => state);
	return {
		...authState,
		logout: () => {
			authState.logout();
			queryClient.clear();
		},
	};
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { initAuth } = useAuth();
	useEffect(() => {
		initAuth();
	}, [initAuth]);
	return <>{children}</>;
};
