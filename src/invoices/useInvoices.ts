import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { INVOICES_PAGE_LIMIT } from "../api/base";
import { getInvoices, GetInvoicesQuery } from "../api/invoices";

export const useInvoices = ({
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
	const result = useQuery(
		["invoices", page, sortBy, sortOrder, clientId],
		() =>
			getInvoices({
				page,
				sortBy,
				sortOrder,
				clientId,
				startDueDate,
				endDueDate,
				startDate,
				endDate,
				projectCode,
			}),
		{ keepPreviousData: true }
	);
	const totalPages = useMemo(
		() => (result.data ? Math.ceil(result.data.total / INVOICES_PAGE_LIMIT) : 1),
		[result.data]
	);
	return {
		...result,
		totalPages,
	};
};
