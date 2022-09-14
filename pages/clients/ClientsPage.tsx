import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

import PageLoader from "../../src/components/PageLoader";
import AuthGuard from "../../src/user/AuthGuard";

import ClientsTableContainer from "../../src/clients/ClientsTableContainer";

const Clients = () => {
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

	if (!router.query) return <PageLoader />;

	return (
		<AuthGuard>
			<div className='mt-20 mx-10'>
				<header className='flex justify-between items-end'>
					<h2 className='m-0'>Clients</h2>
					<div>
						<Link href='/clients/new'>
							<a className='no-underline'>
								<Button variant='outlined'>Add Client</Button>
							</a>
						</Link>
					</div>
				</header>
				<ClientsTableContainer query={router.query} />
			</div>
		</AuthGuard>
	);
};

export default Clients;
