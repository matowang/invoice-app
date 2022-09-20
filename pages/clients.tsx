import { Button } from "@mui/material";
import Link from "next/link";

import AuthGuard from "../src/user/AuthGuard";

import ClientsTableContainer from "../src/clients/ClientsTableContainer";

import { usePaginationGaurd } from "../src/hooks/usePaginationGaurd";
import { useClients } from "../src/clients/useClients";

import { GetServerSideProps } from "next";

const Clients = ({ query }: { query: any | null }) => {
	const { totalPages } = useClients();
	usePaginationGaurd({ totalPages });

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
				<ClientsTableContainer query={query} />
			</div>
		</AuthGuard>
	);
};

export default Clients;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	return {
		props: { query: query || null },
	};
};