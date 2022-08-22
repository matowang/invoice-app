import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

import { useInvoices } from "../src/invoices/useInvoices";

import PageLoader from "../src/components/PageLoader";
import AuthGuard from "../src/user/AuthGuard";

import InvoicesTableContainer from "../src/invoices/InvoicesTableContainer";

const Invoices = () => {
    const [page, setPage] = useState<number | undefined>();
    const router = useRouter();
    const { totalPages } = useInvoices({ page });

    useEffect(() => {
        if (router.isReady)
            if (typeof router.query.page === 'string')
                setPage(parseInt(router.query.page));
            else {
                router.replace(`/invoices?page=${1}`);
                setPage(1);
            }
    }, [router.isReady])

    useEffect(() => {
        if (page && totalPages)
            if (totalPages < page) {
                router.replace(`/invoices?pages=${totalPages}`);
                setPage(totalPages);
            }
            else if (page < 1) {
                router.replace(`/invoices?pages=1}`)
                setPage(0);
            }
    }, [totalPages, page])

    if (!page)
        return <PageLoader />

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        router.push(`/invoices?page=${page}`);
        setPage(page);
    }

    return (
        <AuthGuard>
            <div className="mt-20 mx-10">
                <InvoicesTableContainer page={page} />
            </div >
            <div className="flex justify-center mt-10">
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </div>
        </AuthGuard>
    )
}

export default Invoices;