import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getInvoice } from "../api/base";
import { useClientCompanyNames } from "../clients/useClientsCompanyNames";

export const useInvoice = (id: string) => {
	const {
		data: invoiceData,
		isError,
		error,
	} = useQuery(["invoices", "single", id], () => getInvoice(id));
	const { data: clientCompanyNameData, isError: isErrorGetClient } = useClientCompanyNames();
	const selectedClientCompany = useMemo(() => {
		if (!clientCompanyNameData || !invoiceData) return;
		return clientCompanyNameData.find((company) => company.id === invoiceData.client_id);
	}, [clientCompanyNameData, invoiceData]);

	const data =
		invoiceData && clientCompanyNameData
			? {
					...invoiceData,
					meta: {
						...invoiceData?.meta,
						items: invoiceData?.meta?.items?.length
							? invoiceData?.meta.items
							: [{ description: null, value: null }],
					},
					clientCompany: selectedClientCompany || { id: "", companyName: "" },
			  }
			: undefined;

	return {
		data,
		isLoading: !isError && !data,
		isError: isErrorGetClient || isError,
		error: isError ? error || new Error("Something went wrong") : undefined,
	};
};
