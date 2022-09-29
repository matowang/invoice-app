import { Button } from "@mui/material";
import Link from "next/link";

import AddIcon from "@mui/icons-material/Add";

import AuthGuard from "../src/user/AuthGuard";
import InvoicesTableContainer from "../src/invoices/InvoicesTableContainer";
import ClientSelectField from "../src/invoices/ClientSelectField";
import DataTableHeaderContainer from "../src/components/DataTable/DataTableHeaderContainer";

import { usePaginationGaurd } from "../src/hooks/usePaginationGaurd";
import { useTableFieldClick } from "../src/hooks/useTableFieldClick";
import { useInvoices } from "../src/invoices/useInvoices";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { invoicesQuerySchema } from "../src/api/invoices";

import { GetServerSideProps } from "next";
import ErrorPage from "../src/components/ErrorPage";

const InvoicesPage = ({ query }: { query: any | null }) => {
	const parsedQuery = useMemo(() => invoicesQuerySchema.safeParse(query), [query]);

	const { totalPages } = useInvoices(parsedQuery.success ? parsedQuery.data : undefined);

	usePaginationGaurd({ totalPages });

	const router = useRouter();

	const { handleFieldClick } = useTableFieldClick();
	const handlePageChange = (page: number) => {
		router.push({
			pathname: router.pathname,
			query: { ...router.query, page: page },
		});
	};

	if (!parsedQuery.success) {
		console.error(parsedQuery.error.errors);
		return <ErrorPage>Invalid Query</ErrorPage>;
	}

	return (
		<AuthGuard>
			<div className='py-32 mx-10 md:mx-20'>
				<InvoicesTableContainer
					onChangePage={handlePageChange}
					onClickRow={(invoice) => router.push(`/invoices/${invoice.id}/view`)}
					actionsOnClick={{
						editInvoice: (invoice) => router.push(`/invoices/${invoice.id}/edit`),
						printInvoice: (invoice) => router.push(`/invoices/${invoice.id}/view?print=true`),
					}}
					onClickField={handleFieldClick}
					query={parsedQuery.data}
					renderHeader={() => (
						<DataTableHeaderContainer title='Invoices'>
							<div className='relative w-52 h-10'>
								<ClientSelectField
									onChange={(value) =>
										router.replace(
											JSON.parse(
												JSON.stringify({
													pathname: router.pathname,
													query: { ...router.query, clientId: value || undefined },
												})
											)
										)
									}
									value={parsedQuery.data.clientId || ""}
								/>
							</div>
							<Link href='/invoices/new'>
								<a className='no-underline'>
									<Button
										variant='contained'
										className='h-full'
										sx={{ borderRadius: 8 }}
										startIcon={<AddIcon />}
										data-test='add-invoice'
									>
										Add Invoice
									</Button>
								</a>
							</Link>
						</DataTableHeaderContainer>
					)}
				/>
			</div>
		</AuthGuard>
	);
};

export default InvoicesPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	return {
		props: { query: query || null },
	};
};
