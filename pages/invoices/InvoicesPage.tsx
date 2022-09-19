import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

import AuthGuard from "../../src/user/AuthGuard";

import InvoicesTableContainer from "../../src/invoices/InvoicesTableContainer";
import SelectField from "../../src/components/formFields/SelectField";
import { useClientCompanyNames } from "../../src/clients/useClientsCompanyNames";

const InvoicesPage = () => {
	const router = useRouter();
	const { data } = useClientCompanyNames();

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
						<div className='relative w-52'>
							<SelectField
								label='Company'
								value={typeof router.query.clientId === "string" ? router.query.clientId : ""}
								//TODO Add Empty for All query
								options={
									data
										? [
												...data.map(({ id, companyName }) => ({ value: id, label: companyName })),
												{ value: "", label: "All Clients" },
										  ]
										: []
								}
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
				<InvoicesTableContainer query={router.query} />
			</div>
		</AuthGuard>
	);
};

export default InvoicesPage;
