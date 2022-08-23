import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getClients, CLIENTS_PAGE_LIMIT } from "../api/base";

export const useClients = ({ page }: { page?: number }) => {
    const [totalPages, setTotalPages] = useState<number | undefined>();
    const result = useQuery(['clients', page], () => getClients({ page } as { page: number }), {
        enabled: !!page,
        onSuccess: (data) => setTotalPages(Math.ceil(data.total / CLIENTS_PAGE_LIMIT))
    });
    return {
        ...result,
        totalPages
    };
}