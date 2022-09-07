import { useQuery } from "@tanstack/react-query";
import { getClientsCompanyNames } from "../api/clients";

export const useClientCompanyNames = ({ onError }: { onError?: (err: unknown) => void } = {}) => {
	return useQuery(["clients", "companyNames"], getClientsCompanyNames, {
		onError: onError,
	});
};
