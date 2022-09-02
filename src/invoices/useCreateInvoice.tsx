import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "../api/base";

export const useCreateInvoice = () => {
	const queryClient = useQueryClient();
	return useMutation(createInvoice, {
		onSuccess: async () => {
			queryClient.removeQueries(["invoices"]);
		},
	});
};
