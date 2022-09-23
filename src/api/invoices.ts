import { dbInstance } from "./auth";
import { InvoiceFormValues } from "../invoices/InvoiceForm";
import { transformInvoiceValue } from "../util/transformInvoiceData";
import { INVOICES_PAGE_LIMIT, SortOrder } from "./base";
import { ClientDTO } from "./clients";
import { string } from "zod";

export type InvoiceDTO = {
	id: string;
	user_id: string;
	date: number;
	dueDate: number;
	invoice_number: string;
	client_id: string;
	projectCode?: string;
	meta?: Record<string, any>;
	value: number;
};

export type InvoiceAPIValues = Omit<InvoiceDTO, "id" | "user_id">;

export type InvoiceWithClientsDTO = {
	invoice: InvoiceDTO;
	client: Pick<ClientDTO, "user_id" | "email" | "name" | "companyDetails" | "id">;
};

export type GetInvoicesQuery = {
	page?: number;
	sortBy?: "total" | "dueDate" | "creationDate" | "companyName";
	sortOrder?: SortOrder;
	clientId?: string;
	//Below are not required params for incremental project
	startDueDate?: number;
	endDueDate?: number;
	startDate?: number;
	endDate?: number;
	projectCode?: string;
};

const InvoicesSortByMap = {
	total: "price",
	dueDate: "dueDate",
	creationDate: "creation",
	companyName: "companyName",
};

export const getInvoices = async ({
	page = 1,
	sortBy,
	sortOrder,
	clientId,
	startDueDate,
	endDueDate,
	startDate,
	endDate,
	projectCode,
}: GetInvoicesQuery) => {
	await new Promise((r) => setTimeout(r, 500));
	const params = {
		limit: INVOICES_PAGE_LIMIT.toString(),
		offset: (page - 1) * INVOICES_PAGE_LIMIT,
		sortBy: sortBy && InvoicesSortByMap[sortBy],
		sort: sortOrder,
		clientId,
		startDueDate,
		endDueDate,
		startDate,
		endDate,
		projectCode,
	};
	const { data } = await dbInstance.get<{
		invoices: InvoiceWithClientsDTO[];
		total: number;
	}>("/invoices", { params });
	return data;
};

export const getInvoice = async (id: string) => {
	await new Promise((r) => setTimeout(r, 100));
	const { data } = await dbInstance.get<{ success: boolean; invoice: InvoiceDTO }>(
		`/invoices/${id}`
	);
	return data.invoice;
};

export const editInvoice = async (invoiceId: string, invoiceValues: InvoiceFormValues) => {
	await new Promise((r) => setTimeout(r, 100));
	const { data } = await dbInstance.put<any>("/invoices", {
		...transformInvoiceValue(invoiceValues),
		id: invoiceId,
	});
	return data;
};

export const deleteInvoice = async (invoiceId: string) => {
	await new Promise((r) => setTimeout(r, 100));
	const { data } = await dbInstance.delete(`/invoices?${invoiceId}`);
	return data;
};

export const createInvoice = async (invoiceFormValues: InvoiceFormValues) => {
	await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.post<any>(
		"/invoices",
		transformInvoiceValue(invoiceFormValues)
	);
	return data;
};
