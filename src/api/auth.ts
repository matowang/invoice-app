import axios from "axios";

import { LoginValues } from "../user/LoginForm";
import { RegisterValues } from "../user/RegisterForm";
import { CompanyDetails } from "../user/CompanyDetailsForm";

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

export const dbInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

let requestInterceptor: number;
let responseInterceptor: number;
export const setHeaderToken = (token: string, onTokenInvalid?: () => unknown) => {
	dbInstance.interceptors.request.eject(requestInterceptor);
	dbInstance.interceptors.request.eject(responseInterceptor);
	requestInterceptor = dbInstance.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			config = {
				...config,
				headers: {
					...config.headers,
					"x-access-token": token,
				},
			};
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);
	responseInterceptor = dbInstance.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			return response;
		},
		function (error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			if (axios.isAxiosError(error) && error.response?.data === "Invalid Token" && onTokenInvalid) {
				return onTokenInvalid();
			}
			return Promise.reject(error);
		}
	);
};

const login = async (loginValues: LoginValues) => {
	await new Promise((r) => setTimeout(r, 100));
	return await axiosInstance.post<LoginDTO>(`/login`, loginValues);
};

const register = async (registerValues: RegisterValues) => {
	await new Promise((r) => setTimeout(r, 100));
	return await axiosInstance.post<RegisterDTO>(`/register`, registerValues);
};

const validateToken = async (token: string): Promise<UserDTO | null> => {
	//await new Promise(r => setTimeout(r, 2000));
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
