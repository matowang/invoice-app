import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../api/base";
import { ClientValues } from "./ClientForm";

export const useCreateClient = () => {
    const queryClient = useQueryClient();
    return useMutation((clientValues: ClientValues) => createClient(clientValues), {
        onSuccess: async () => {
            queryClient.removeQueries(['clients']);
        },
    });
}