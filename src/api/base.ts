import { dbInstance } from "./auth";

export const getClients = async () => {
    const { data } = await dbInstance.get('/clients');
    return data;
}

export const getInvoices = async () => {
    const res = await dbInstance.get('/invoices?limit=10');
    return res;
}
