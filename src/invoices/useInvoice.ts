import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getInvoice } from "../api/invoices";
import { useClientCompanyNames } from "../clients/useClientsCompanyNames";
import { transformInvoiceDTO } from "../util/transformInvoiceData";

export const useInvoice = (id: string) => {
	const {
		data: invoiceData,
		isError,
		error,
	} = useQuery(["invoices", "single", id], () => getInvoice(id));

	const { data: clientCompanyNameData, isError: isErrorGetClient } = useClientCompanyNames();

	const data = useMemo(
		() =>
			invoiceData && clientCompanyNameData
				? transformInvoiceDTO(invoiceData, clientCompanyNameData)
				: undefined,
		[clientCompanyNameData, invoiceData]
	);

	return {
		data,
		isLoading: !isError && !data,
		isError: isErrorGetClient || isError,
		error: isError ? error || new Error("Something went wrong") : undefined,
	};
};
