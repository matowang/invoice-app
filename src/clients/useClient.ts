import { useQuery } from "@tanstack/react-query";
import { ClientDTO, getClient } from "../api/clients";

interface useClientOptions {
	onSuccess?: (client: ClientDTO) => void;
	onError?: (err: unknown) => void;
}

export const useClient = (id: string, { onSuccess, onError }: useClientOptions = {}) => {
	return useQuery(["clients", "single", id], () => getClient(id), {
		onSuccess,
		onError,
	});
};
