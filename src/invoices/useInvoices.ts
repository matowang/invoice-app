import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { INVOICES_PAGE_LIMIT } from "../api/base";
import { getInvoices, GetInvoicesQuery } from "../api/invoices";

export const useInvoices = ({ page = 1, sortBy, sortOrder }: GetInvoicesQuery) => {
	const result = useQuery(
		["invoices", page, sortBy, sortOrder],
		() => getInvoices({ page, sortBy, sortOrder }),
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
