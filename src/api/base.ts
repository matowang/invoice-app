import axios from "axios";
import { CompanyDetails } from "../user/CompanyDetailsForm";
import { UserDTO } from "./auth";

export const devDelay = async (ms: number) => {
	if (process.env.NODE_ENV === "development") {
		await new Promise((r) => setTimeout(r, ms));
	}
};

export const CLIENTS_PAGE_LIMIT = 10;
export const INVOICES_PAGE_LIMIT = 10;

export const dbInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// add artificial delay for dev env
let delayInterceptor = dbInstance.interceptors.response.use(
	async (response) => {
		dbInstance.interceptors.response.eject(delayInterceptor);
		await devDelay(0);
		return response;
	},
	async (error) => {
		await devDelay(0);
		return Promise.reject(error);
	}
);

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

export const setCompanyDetails = async (newCompanyDetails: CompanyDetails): Promise<UserDTO> => {
	const {
		data: { user },
	} = await dbInstance.put<{ success: boolean; user: UserDTO }>("/me/company", newCompanyDetails);
	return user;
};

export type SortOrder = "asc" | "desc" | undefined;
