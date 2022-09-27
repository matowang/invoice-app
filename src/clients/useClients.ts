import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CLIENTS_PAGE_LIMIT } from "../api/base";
import { getClients, GetClientsQuery } from "../api/clients";

export const useClients = (query?: GetClientsQuery) => {
	const { page = 1, sortBy, sortOrder } = query || {};
	const result = useQuery(
		["clients", page, sortBy, sortOrder],
		() => getClients({ page, sortBy, sortOrder }),
		{
			keepPreviousData: true,
			enabled: !!query,
		}
	);

	const totalPages = useMemo(
		() => (result.data ? Math.ceil(result.data.total / CLIENTS_PAGE_LIMIT) : undefined),
		[result.data]
	);
	return {
		...result,
		totalPages,
	};
};
