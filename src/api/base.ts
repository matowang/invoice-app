import { ClientValues } from "../clients/ClientForm";
import { dbInstance } from "./auth";
import { CompanyDetails } from "../user/CompanyDetailsForm";
import { InvoiceValues } from "../invoices/InvoiceForm";

export const CLIENTS_PAGE_LIMIT = 10;
export const INVOICES_PAGE_LIMIT = 10;

export type InvoiceDTO = {
	invoice: {
		id: string;
		user_id: string;
		client_id: string;
		invoice_number: string;
		date: number;
		dueDate: number;
		value: number;
	};
	client: {
		user_id: string;
		email: string;
		name: string;
		companyDetails: CompanyDetails;
		id: string;
	};
};

export type CreateInvoiceValues = {
	date: number;
	dueDate: number;
	invoice_number: string;
	client_id: string;
	meta?: any;
	value: number;
};

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

export const getClient = async (clientID: string) => {
	await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.get<{
		success: boolean;
		client: ClientDTO;
	}>(`/clients/${clientID}`);
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

export const editClient = async (clientID: string, clientValues: ClientValues) => {
	await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.put("/clients", {
		...clientValues,
		id: clientID,
	});
	return data;
};

export const getInvoices = async ({ page }: { page: number }) => {
	await new Promise((r) => setTimeout(r, 1000));
	const params = {
		limit: INVOICES_PAGE_LIMIT.toString(),
		offset: ((page - 1) * INVOICES_PAGE_LIMIT).toString(),
	};
	const { data } = await dbInstance.get<{
		invoices: InvoiceDTO[];
		total: number;
	}>(`/invoices?${new URLSearchParams(params).toString()}`);
	return data;
};

export const createInvoice = async (invoiceValues: CreateInvoiceValues) => {
	//await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.post("/invoices", invoiceValues);
	return data;
};
