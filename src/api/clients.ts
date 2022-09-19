import { ClientValues } from "../clients/ClientForm";
import { dbInstance } from "./auth";
import { CompanyDetails } from "../user/CompanyDetailsForm";
import { CLIENTS_PAGE_LIMIT, SortOrder } from "./base";

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

export type GetClientsQuery = {
	page?: number;
	sortBy?: string;
	sortOrder?: SortOrder;
};

export const getClients = async ({ page = 1, sortBy, sortOrder }: GetClientsQuery) => {
	await new Promise((r) => setTimeout(r, 500));

	const variables: any = {
		limit: CLIENTS_PAGE_LIMIT,
		offset: (page - 1) * CLIENTS_PAGE_LIMIT,
	};

	if (sortBy && sortOrder) variables.sort = { [sortBy]: sortOrder };

	const { data } = await dbInstance.post<{
		data: {
			clients: { results: ClientDTO[] };
			total: number;
		};
	}>(`/graphql`, {
		query: `query GetClients($sort: ClientListSortSchema = {}, $limit: Int, $offset: Int) {
			clients(sort: $sort, limit: $limit, offset: $offset) {
			  results {
				id
				user_id
				email
				name
				companyDetails {
				  name
				  vatNumber
				  regNumber
				  address
				}
				totalBilled
				invoicesCount
			  }
			  total
			}
		  }
		  `,
		variables,
	});
	return { ...data.data, clients: data.data.clients.results };
};

export const getClient = async (clientId: string) => {
	await new Promise((r) => setTimeout(r, 1000));
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
	const { name, vatNumber, regNumber, address } = clientValues.companyDetails;
	const { data } = await dbInstance.post("/graphql", {
		query: `mutation AddClient($email: String, $name: String, $companyDetails: CompanyDetails) {
			addClient(email: $email, name: $name, companyDetails: $companyDetails){
			  id
			}
		  }		  
		  `,
		variables: {
			...clientValues,
			companyDetails: {
				name,
				vatNumber,
				regNumber,
				address,
				//TODO allow swift and iban for company details
				// swift: clientValues.companyDetails.swift,
				// iban: clientValues.companyDetails.iban,
			},
		},
	});
	return data.data;
};

export const editClient = async (clientId: string, clientValues: ClientValues) => {
	await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.put("/clients", {
		...clientValues,
		id: clientId,
	});
	return data;
};
