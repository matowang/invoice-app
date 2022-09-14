import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useMemo } from "react";
import Link from "next/link";

import { useInvoices } from "../../src/invoices/useInvoices";

import PageLoader from "../../src/components/PageLoader";
import AuthGuard from "../../src/user/AuthGuard";

import InvoicesTableContainer from "../../src/invoices/InvoicesTableContainer";

const InvoicesPage = () => {
	const router = useRouter();

	useEffect(() => {
		if (!router.isReady) return;
		if (!router.query.page) return;
		if (typeof router.query.page !== "string") {
			router.replace({
				pathname: router.pathname,
				query: { ...router.query, page: 1 },
			});
			return;
		}
		const page = parseInt(router.query.page);
		if (page < 1)
			router.replace({
				pathname: router.pathname,
				query: { ...router.query, page: 1 },
			});
	}, [router, router.isReady]);

	return (
		<AuthGuard>
			<div className='mt-20 mx-10'>
				<header className='flex justify-between items-end'>
					<h2 className='m-0'>Invoices</h2>
					<div className='flex gap-2'>
						<Link href='/invoices/new'>
							<a className='no-underline'>
								<Button variant='outlined'>Add Invoice</Button>
							</a>
						</Link>
					</div>
				</header>
				<InvoicesTableContainer query={router.query} />
			</div>
		</AuthGuard>
	);
};

export default InvoicesPage;
