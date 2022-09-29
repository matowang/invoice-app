import { Button, FormControl } from "@mui/material";
import Link from "next/link";

import AddIcon from "@mui/icons-material/Add";

import AuthGuard from "../src/user/AuthGuard";
import InvoicesTableContainer from "../src/invoices/InvoicesTableContainer";
import ClientSelectField from "../src/invoices/ClientSelectField";

import { usePaginationGaurd } from "../src/hooks/usePaginationGaurd";
import { useTableFieldClick } from "../src/hooks/useTableFieldClick";
import { useInvoices } from "../src/invoices/useInvoices";
import { useRouter } from "next/router";

import { GetServerSideProps } from "next";

// {
// 	label: "Edit Invoice",
// 	onClick: () => router.push(`/invoices/${invoice.id}/edit`),
// 	icon: <EditOutlinedIcon />,
// },
// {
// 	label: "Print Invoice",
// 	onClick: () => router.push(`/invoices/${invoice.id}/view?print=true`),
// 	icon: <PrintOutlinedIcon />,
// },

const InvoicesPage = ({ query }: { query: any | null }) => {
	const { totalPages } = useInvoices();
	usePaginationGaurd({ totalPages });

	const router = useRouter();

	const { handleFieldClick } = useTableFieldClick();

	return (
		<AuthGuard>
			<div className='py-32 mx-10 md:mx-20'>
				<InvoicesTableContainer
					onClickRow={(invoice) => router.push(`/invoices/${invoice.id}/view`)}
					actionsOnClick={{
						editInvoice: (invoice) => router.push(`/invoices/${invoice.id}/edit`),
						printInvoice: (invoice) => router.push(`/invoices/${invoice.id}/view?print=true`),
					}}
					onClickField={handleFieldClick}
					query={query}
					renderHeader={() => (
						<header className='flex justify-between items-end p-4'>
							<h1 className='m-0 text-lg'>Invoices</h1>
							<div className='flex gap-2'>
								<div className='relative w-52 h-10'>
									<ClientSelectField />
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
							</div>
						</header>
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
