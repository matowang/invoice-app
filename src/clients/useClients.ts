import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { CLIENTS_PAGE_LIMIT } from "../api/base";
import { getClients, GetClientsQuery } from "../api/clients";

export const useClients = ({ page = 1, sortBy, sortOrder }: GetClientsQuery) => {
	const result = useQuery(
		["clients", page, sortBy, sortOrder],
		() => getClients({ page, sortBy, sortOrder }),
		{
			enabled: !!page,
			keepPreviousData: true,
		}
	);

	const totalPages = useMemo(
		() => (result.data ? Math.ceil(result.data.total / CLIENTS_PAGE_LIMIT) : 1),
		[result.data]
	);

	return {
		...result,
		totalPages,
	};
};
