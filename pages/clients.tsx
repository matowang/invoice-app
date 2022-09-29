import { Button } from "@mui/material";
import Link from "next/link";

import AddIcon from "@mui/icons-material/Add";

import AuthGuard from "../src/user/AuthGuard";

import ClientsTableContainer from "../src/clients/ClientsTableContainer";

import { usePaginationGaurd } from "../src/hooks/usePaginationGaurd";
import { useClients } from "../src/clients/useClients";

import { useRouter } from "next/router";
import { useTableFieldClick } from "../src/hooks/useTableFieldClick";

import { GetServerSideProps } from "next";

const Clients = ({ query }: { query: any | null }) => {
	const router = useRouter();

	const { totalPages } = useClients();
	usePaginationGaurd({ totalPages });

	const { handleFieldClick } = useTableFieldClick();

	return (
		<AuthGuard>
			<div className='py-32 mx-10 md:mx-20'>
				<ClientsTableContainer
					onClickRow={(client) => router.push(`/clients/${client.id}`)}
					actionsOnClick={{
						editClient: (client) => router.push(`clients/${client.id}`),
						addInvoice: (client) => router.push(`invoices/new?clientId=${client.id}`),
					}}
					onClickField={handleFieldClick}
					query={query}
					renderHeader={() => (
						<header className='flex justify-between items-end p-4'>
							<h2 className='m-0 text-lg'>Clients</h2>
							<div className='flex gap-2'>
								<Link href='/clients/new'>
									<a className='no-underline'>
										<Button
											variant='contained'
											data-test='add-client'
											startIcon={<AddIcon />}
											sx={{ borderRadius: 8 }}
										>
											Add Client
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

export default Clients;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	return {
		props: { query: query || null },
	};
};
