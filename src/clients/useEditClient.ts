import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editClient } from "../api/clients";
import { ClientValues } from "./ClientForm";

interface EditClientValues extends ClientValues {
	id: string;
}

export const useEditClient = (clientId: string) => {
	const queryClient = useQueryClient();
	return useMutation(
		(editClientValues: EditClientValues) => editClient(clientId, editClientValues),
		{
			onSuccess: async () => {
				queryClient.removeQueries(["clients", "single", clientId]);
				queryClient.invalidateQueries(["clients"]);
			},
		}
	);
};
