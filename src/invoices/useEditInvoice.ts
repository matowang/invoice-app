import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editInvoice } from "../api/invoices";
import { InvoiceFormValues } from "./InvoiceForm";

export const useEditInvoice = (invoiceId: string) => {
	const queryClient = useQueryClient();
	return useMutation((invoiceValues: InvoiceFormValues) => editInvoice(invoiceId, invoiceValues), {
		onSuccess: async () => {
			queryClient.removeQueries(["invoices", "single", invoiceId]);
			queryClient.invalidateQueries(["invoices"]);
		},
	});
};
