import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editInvoice } from "../api/invoices";
import { InvoiceFormValues } from "./InvoiceForm";

export const useEditInvoice = (invoiceID: string) => {
	const queryClient = useQueryClient();
	return useMutation((invoiceValues: InvoiceFormValues) => editInvoice(invoiceID, invoiceValues), {
		onSuccess: async () => {
			//queryClient.removeQueries(["invoices", "single", invoiceID]);
			queryClient.invalidateQueries(["invoices"]);
		},
	});
};
