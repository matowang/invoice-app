import { ClientValues } from "../clients/ClientForm";
import { dbInstance } from "./base";
import { CompanyDetails } from "../user/CompanyDetailsForm";
import { CLIENTS_PAGE_LIMIT, SortOrder } from "./base";

import { z } from "zod";

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

export const clientsQuerySchema = z.object({
	page: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val) : undefined)),
	sortBy: z.string().optional(),
	sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type GetClientsQuery = z.infer<typeof clientsQuerySchema>;

export const getClients = async ({ page = 1, sortBy, sortOrder }: GetClientsQuery) => {
	const variables: any = {
		limit: CLIENTS_PAGE_LIMIT,
		offset: (page - 1) * CLIENTS_PAGE_LIMIT,
	};

	if (sortBy && sortOrder) variables.sort = { [sortBy]: sortOrder };

	const { data } = await dbInstance.post<{
		data: {
			clients: { results: ClientDTO[]; total: number };
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
	return { clients: data.data.clients.results, total: data.data.clients.total };
};

export const getClient = async (clientId: string) => {
	const { data } = await dbInstance.get<{
		success: boolean;
		client: ClientDTO;
	}>(`/clients/${clientId}`);
	return data.client;
};

export const getClientsCompanyNames = async () => {
	const { data } = await dbInstance.get<{
		success: boolean;
		clients: ClientCompanyNameDTO[];
	}>(`/clients/names`);
	return data.clients;
};

export const createClient = async (clientValues: ClientValues) => {
	const { name, vatNumber, regNumber, address, swift, iban } = clientValues.companyDetails;
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
				swift,
				iban,
			},
		},
	});
	return data.data;
};

export const editClient = async (clientId: string, clientValues: ClientValues) => {
	const { data } = await dbInstance.put("/clients", {
		...clientValues,
		id: clientId,
	});
	return data;
};
