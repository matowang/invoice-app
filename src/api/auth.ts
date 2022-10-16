import axios from "axios";

import { LoginValues } from "../user/LoginForm";
import { RegisterValues } from "../user/RegisterForm";
import { CompanyDetails } from "../user/CompanyDetailsForm";
import { devDelay } from "./base";

export type LoginDTO = {
	user_id: string;
	email: string;
	name: string;
	token: string;
	companyDetails: CompanyDetails;
};

export type RegisterDTO = {
	user_id: string;
};

export type UserDTO = {
	id: string;
	name: string;
	email: string;
	password: string;
	avatar?: string;
	companyDetails?: CompanyDetails;
};

if (!process.env.NEXT_PUBLIC_API_URL)
	throw new Error("No NEXT_PUBLIC_API_URL environment variable");

export const authInstance = axios.create({
	baseURL: "http://localhost:3139" || process.env.NEXT_PUBLIC_API_URL,
});

// add artificial delay for dev env
let delayInterceptor = authInstance.interceptors.response.use(
	async (response) => {
		await devDelay(700);
		return response;
	},
	async (error) => {
		await devDelay(700);
		return Promise.reject(error);
	}
);

export const login = async (loginValues: LoginValues) => {
	const res = await authInstance.post<LoginDTO>(`/login`, loginValues);
	return res;
};

export const register = async (registerValues: RegisterValues) => {
	return await authInstance.post<RegisterDTO>(`/register`, registerValues);
};

export const validateToken = async (token: string): Promise<UserDTO | null> => {
	try {
		const { data } = await authInstance.get("/me", {
			headers: {
				"x-access-token": token,
			},
		});
		return data;
	} catch (err) {
		console.log(err);
		if (axios.isAxiosError(err)) return null;
		return null;
	}
};

const AuthAPI = {
	login,
	register,
	validateToken,
};

export default AuthAPI;
