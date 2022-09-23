import axios from "axios";

export const CLIENTS_PAGE_LIMIT = 10;
export const INVOICES_PAGE_LIMIT = 10;

export const dbInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

dbInstance.interceptors.response.use(async (response) => {
	// add artificial delay for dev env
	if (process.env.NODE_ENV === "development") {
		await new Promise((r) => setTimeout(r, 2000));
	}
	return response;
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

export type SortOrder = "asc" | "desc" | undefined;
