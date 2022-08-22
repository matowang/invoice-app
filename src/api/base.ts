import { dbInstance } from "./auth";

export const CLIENT_PAGE_LIMIT = 10;
export const INVOICE_PAGE_LIMIT = 10;

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
        companyDetails: {
            "name": string;
            "vatNumber": string;
            "regNumber": string;
            "address": string;
        };
        id: string;
    };
}

export const getClients = async () => {
    const { data } = await dbInstance.get('/clients');
    return data;
}

export const getInvoices = async ({ page }: { page: number }) => {
    await new Promise(r => setTimeout(r, 2000));
    const params = {
        limit: INVOICE_PAGE_LIMIT.toString(),
        offset: ((page - 1) * INVOICE_PAGE_LIMIT).toString(),
    }
    const { data } = await dbInstance.get<{ invoices: InvoiceDTO[], total: number }>(`/invoices?${new URLSearchParams(params).toString()}`);
    return {
        ...data,
    };
}
