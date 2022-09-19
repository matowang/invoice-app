import { Button } from "@mui/material";
import Link from "next/link";

import AuthGuard from "../src/user/AuthGuard";
import InvoicesTableContainer from "../src/invoices/InvoicesTableContainer";
import SelectField from "../src/components/formFields/SelectField";

import { useClientCompanyNames } from "../src/clients/useClientsCompanyNames";
import { useRouter } from "next/router";
import { usePaginationGaurd } from "../src/hooks/usePaginationGaurd";
import { useInvoices } from "../src/invoices/useInvoices";

import { GetServerSideProps } from "next";

const InvoicesPage = ({ query }: { query: any | null }) => {
	const router = useRouter();

	const { data } = useClientCompanyNames();
	const { totalPages } = useInvoices();
	usePaginationGaurd({ totalPages });

	return (
		<AuthGuard>
			<div className='mt-20 mx-10'>
				<header className='flex justify-between items-end'>
					<h2 className='m-0'>Invoices</h2>
					<div className='flex gap-2'>
						<div className='relative w-52'>
							<SelectField
								label='Company'
								value={typeof query?.clientId === "string" ? query.clientId : ""}
								options={
									data
										? [
												...data.map(({ id, companyName }) => ({ value: id, label: companyName })),
												{ value: "", label: "All Invoices" },
										  ]
										: []
								}
								onChange={(value) =>
									router.replace(
										JSON.parse(
											JSON.stringify({
												pathname: router.pathname,
												query: { ...query, clientId: value || undefined },
											})
										)
									)
								}
							/>
						</div>
						<Link href='/invoices/new'>
							<a className='no-underline'>
								<Button variant='outlined' className='h-full'>
									Add Invoice
								</Button>
							</a>
						</Link>
					</div>
				</header>
				<InvoicesTableContainer query={query} />
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
