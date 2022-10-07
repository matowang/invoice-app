import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { INVOICES_PAGE_LIMIT } from "../api/base";
import { getInvoices, GetInvoicesQuery } from "../api/invoices";

export const useInvoices = (query?: GetInvoicesQuery) => {
	const {
		page = 1,
		sortBy,
		sortOrder,
		clientId,
		startDueDate,
		endDueDate,
		startDate,
		endDate,
		projectCode,
	} = query || {};
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
		{ keepPreviousData: true, enabled: !!query }
	);
	const totalPages = useMemo(
		() => (result.data ? Math.ceil(result.data.total / INVOICES_PAGE_LIMIT) : undefined),
		[result.data]
	);

	return {
		...result,
		totalPages,
	};
};
