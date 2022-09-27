import axios from "axios";

import { LoginValues } from "../user/LoginForm";
import { RegisterValues } from "../user/RegisterForm";
import { CompanyDetails } from "../user/CompanyDetailsForm";

import { dbInstance } from "./base";

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

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.response.use(async (response) => {
	// add artificial delay for dev env
	if (process.env.NODE_ENV === "development") {
		await new Promise((r) => setTimeout(r, 500));
	}
	return response;
});

const login = async (loginValues: LoginValues) => {
	return await axiosInstance.post<LoginDTO>(`/login`, loginValues);
};

const register = async (registerValues: RegisterValues) => {
	return await axiosInstance.post<RegisterDTO>(`/register`, registerValues);
};

const validateToken = async (token: string): Promise<UserDTO | null> => {
	try {
		const { data } = await axiosInstance.get("/me", {
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

const setCompanyDetails = async (newCompanyDetails: CompanyDetails): Promise<UserDTO> => {
	const {
		data: { user },
	} = await dbInstance.put<{ success: boolean; user: UserDTO }>("/me/company", newCompanyDetails);
	return user;
};

const AuthAPI = {
	login,
	register,
	validateToken,
	setCompanyDetails,
};

export default AuthAPI;
