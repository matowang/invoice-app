import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

import { useClients } from "../src/clients/useClients";

import PageLoader from "../src/components/PageLoader";
import AuthGuard from "../src/user/AuthGuard";

import ClientsTableContainer from "../src/clients/ClientsTableContainer";

const Clients = () => {
    const [page, setPage] = useState<number | undefined>();
    const router = useRouter();
    const { totalPages } = useClients({ page });

    useEffect(() => {
        if (!router.isReady) return;
        if (typeof router.query.page !== 'string') {
            router.replace(`/clients?page=${1}`);
            setPage(1);
            return;
        }
        const page = parseInt(router.query.page);
        if (page < 1) {
            router.replace(`/clients?pages=1`)
            setPage(1);
        } else {
            setPage(page)
        }
    }, [router.isReady]);

    useEffect(() => {
        if (!totalPages || !page) return;
        if (totalPages < page) {
            router.replace(`/clients?pages=${totalPages}`);
            setPage(totalPages);
        }
    }, [page, totalPages])

    if (!page)
        return <PageLoader />

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        router.push(`/clients?page=${page}`);
        setPage(page);
    }

    return (
        <AuthGuard>
            <div className="mt-20 mx-10">
                <ClientsTableContainer page={page} />
            </div >
            <div className="flex justify-center mt-10">
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </div>
        </AuthGuard>
    )
}


export default Clients;