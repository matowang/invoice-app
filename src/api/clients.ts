import { ClientValues } from "../clients/ClientForm";
import { dbInstance } from "./auth";
import { CompanyDetails } from "../user/CompanyDetailsForm";
import { CLIENTS_PAGE_LIMIT } from "./base";

export type ClientDTO = {
	user_id: string;
	email: string;
	name: string;
	companyDetails: CompanyDetails;
	id: string;
	totalBilled: number;
	invoicesCount: number;
};

export type ClientCompanyNameDTO = {
	id: string;
	companyName: string;
};

export const getClients = async ({ page }: { page: number }) => {
	await new Promise((r) => setTimeout(r, 2000));
	const params = {
		limit: CLIENTS_PAGE_LIMIT.toString(),
		offset: ((page - 1) * CLIENTS_PAGE_LIMIT).toString(),
		sort: "asc",
		sortBy: "clientName",
	};
	const { data } = await dbInstance.get<{
		clients: ClientDTO[];
		total: number;
	}>(`/clients?${new URLSearchParams(params).toString()}`);
	return data;
};

export const getClient = async (clientId: string) => {
	await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.get<{
		success: boolean;
		client: ClientDTO;
	}>(`/clients/${clientId}`);
	return data.client;
};

export const getClientsCompanyNames = async () => {
	await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.get<{
		success: boolean;
		clients: ClientCompanyNameDTO[];
	}>(`/clients/names`);
	return data.clients;
};

export const createClient = async (clientValues: ClientValues) => {
	//await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.post("/clients", clientValues);
	return data;
};

export const editClient = async (clientId: string, clientValues: ClientValues) => {
	await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.put("/clients", {
		...clientValues,
		id: clientId,
	});
	return data;
};
