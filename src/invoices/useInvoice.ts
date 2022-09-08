import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getInvoice } from "../api/invoices";
import { useClientCompanyNames } from "../clients/useClientsCompanyNames";
import { transformInvoiceDTO } from "../util/transformInvoiceData";

interface useInvoiceOptions {
	keepPreviousData?: boolean;
}

export const useInvoice = (id: string, { keepPreviousData }: useInvoiceOptions = {}) => {
	const {
		data: invoiceData,
		isError,
		error,
		refetch,
		isLoading: isLoadingInvoice,
	} = useQuery(["invoices", "single", id], () => getInvoice(id), {
		keepPreviousData,
	});

	const {
		data: clientCompanyNameData,
		isError: isErrorGetClient,
		isLoading: isLoadingClientCompanyNames,
	} = useClientCompanyNames();

	const data = useMemo(
		() =>
			invoiceData && clientCompanyNameData
				? transformInvoiceDTO(invoiceData, clientCompanyNameData)
				: undefined,
		[clientCompanyNameData, invoiceData]
	);

	return {
		data,
		isLoading: isLoadingInvoice || isLoadingClientCompanyNames,
		isError: isErrorGetClient || isError,
		error: isError ? error || new Error("Something went wrong") : undefined,
		refetch,
	};
};
