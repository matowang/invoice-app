import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../api/base";
import { ClientValues } from "./ClientForm";

export const useCreateClient = ({ onSuccess, onError }: { onSuccess?: () => unknown, onError?: (err: unknown) => unknown }) => {
    const queryClient = useQueryClient();
    return useMutation((clientValues: ClientValues) => createClient(clientValues), {
        onSuccess: async () => {
            queryClient.removeQueries(['clients']);
            await onSuccess?.();
        },
        onError
    });
}