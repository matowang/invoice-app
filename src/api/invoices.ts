import { dbInstance } from "./auth";
import { InvoiceFormValues } from "../invoices/InvoiceForm";
import { transformInvoiceValue } from "../util/transformInvoiceData";
import { INVOICES_PAGE_LIMIT } from "./base";
import { CompanyDetails } from "../user/CompanyDetailsForm";

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

export type InvoiceAPIValues = {
	date: number;
	dueDate: number;
	invoice_number: string;
	client_id: string;
	projectCode?: string;
	meta?: Record<string, any>;
	value: number;
};

export type InvoiceWithClientsDTO = {
	invoice: InvoiceDTO;
	client: {
		user_id: string;
		email: string;
		name: string;
		companyDetails: CompanyDetails;
		id: string;
	};
};

export const getInvoices = async ({ page }: { page: number }) => {
	await new Promise((r) => setTimeout(r, 1000));
	const params = {
		limit: INVOICES_PAGE_LIMIT.toString(),
		offset: ((page - 1) * INVOICES_PAGE_LIMIT).toString(),
	};
	const { data } = await dbInstance.get<{
		invoices: InvoiceWithClientsDTO[];
		total: number;
	}>(`/invoices?${new URLSearchParams(params).toString()}`);
	return data;
};

export const getInvoice = async (id: string) => {
	await new Promise((r) => setTimeout(r, 5000));
	const { data } = await dbInstance.get<{ success: boolean; invoice: InvoiceDTO }>(
		`/invoices/${id}`
	);
	return data.invoice;
};

export const editInvoice = async (invoiceID: string, invoiceValues: InvoiceFormValues) => {
	await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.put("/invoices", {
		...transformInvoiceValue(invoiceValues),
		id: invoiceID,
	});
	return data;
};

export const createInvoice = async (invoiceFormValues: InvoiceFormValues) => {
	await new Promise((r) => setTimeout(r, 2000));
	const { data } = await dbInstance.post("/invoices", transformInvoiceValue(invoiceFormValues));
	return data;
};
