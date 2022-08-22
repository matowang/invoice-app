import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getInvoices, INVOICE_PAGE_LIMIT } from "../api/base";

export const useInvoices = ({ page }: { page?: number }) => {
    const [totalPages, setTotalPages] = useState<number | undefined>();
    const result = useQuery(['invoices', page], () => getInvoices({ page } as { page: number }), {
        enabled: !!page,
        onSuccess: (data) => setTotalPages(Math.ceil(data.total / INVOICE_PAGE_LIMIT))
    });
    return {
        ...result,
        totalPages
    };
}