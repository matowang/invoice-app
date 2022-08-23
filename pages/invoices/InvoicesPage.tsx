import { Button, Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useMemo } from "react";
import Link from 'next/link';

import { useInvoices } from "../../src/invoices/useInvoices";

import PageLoader from "../../src/components/PageLoader";
import AuthGuard from "../../src/user/AuthGuard";

import InvoicesTableContainer from "../../src/invoices/InvoicesTableContainer";

const InvoicesPage = () => {
    const router = useRouter();
    const page = useMemo(() =>
        typeof router.query.page === 'string' ?
            parseInt(router.query.page) : undefined
        , [router.query]);
    const { totalPages } = useInvoices({ page });

    useEffect(() => {
        if (!router.isReady) return;
        if (typeof router.query.page !== 'string') {
            router.replace(`/invoices?page=${1}`);
            return;
        }
        const page = parseInt(router.query.page);
        if (page < 1) {
            router.replace(`/invoices?pages=1`)
        }
    }, [router.isReady]);

    useEffect(() => {
        if (!totalPages || !page) return;
        if (totalPages < page) {
            router.replace(`/invoices?page=${totalPages}`);
        }
    }, [page, totalPages])

    if (!page)
        return <PageLoader />

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        router.push(`/invoices?page=${page}`);
    }

    return (
        <AuthGuard>
            <div className="mt-20 mx-10">
                <header className='flex justify-between items-end'>
                    <h2 className='m-0'>Invoices</h2>
                    <div className="flex gap-2">
                        <Link href="/add-invoice"><a className="no-underline">
                            <Button variant="outlined">Add Invoice</Button>
                        </a></Link>
                    </div>
                </header>
                <InvoicesTableContainer page={page} />
            </div >
            <div className="flex justify-center mt-10">
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </div>
        </AuthGuard>
    )
}


export default InvoicesPage;