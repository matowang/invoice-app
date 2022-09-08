import { useQuery } from "@tanstack/react-query";
import { getClient } from "../api/clients";

interface useClientOptions {
	keepPreviousData: boolean;
}

export const useClient = (id: string, { keepPreviousData }: useClientOptions) => {
	return useQuery(["clients", "single", id], () => getClient(id), { keepPreviousData });
};
