import { Button } from "@mui/material";
import Link from "next/link";

import AddIcon from "@mui/icons-material/Add";

import AuthGuard from "../src/user/AuthGuard";

import ClientsTableContainer from "../src/clients/ClientsTableContainer";
import DataTableHeaderContainer from "../src/components/DataTable/DataTableHeaderContainer";
import ErrorPage from "../src/components/ErrorPage";

import { usePaginationGaurd } from "../src/hooks/usePaginationGaurd";
import { useClients } from "../src/clients/useClients";

import { useRouter } from "next/router";
import { useTableFieldClick } from "../src/hooks/useTableFieldClick";
import { useMemo } from "react";

import { clientsQuerySchema } from "../src/api/clients";

const Clients = () => {
	//We use a container so that AuthGuard always runs before everything
	return (
		<AuthGuard>
			<ClientsPageContainer />
		</AuthGuard>
	);
};

const ClientsPageContainer = () => {
	const router = useRouter();

	const parsedQuery = useMemo(() => clientsQuerySchema.safeParse(router.query), [router.query]);

	const { totalPages } = useClients(parsedQuery.success ? parsedQuery.data : undefined);
	
	usePaginationGaurd({ maxPage: totalPages });

	const { handleFieldClick } = useTableFieldClick();

	const handlePageChange = (page: number) => {
		router.push({
			pathname: router.pathname,
			query: JSON.parse(JSON.stringify({ ...router.query, page: page })),
		});
	};

	if (!parsedQuery.success) {
		return <ErrorPage>Invalid Query</ErrorPage>;
	}

	return (
		<div className='py-32 mx-10 md:mx-20'>
			<ClientsTableContainer
				onChangePage={handlePageChange}
				onClickRow={(client) => router.push(`/clients/${client.id}`)}
				actionsOnClick={{
					editClient: (client) => router.push(`clients/${client.id}`),
					addInvoice: (client) => router.push(`invoices/new?clientId=${client.id}`),
				}}
				onClickField={handleFieldClick}
				query={parsedQuery.data}
				renderHeader={() => (
					<DataTableHeaderContainer title='Clients'>
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
					</DataTableHeaderContainer>
				)}
			/>
		</div>
	);
};

export default Clients;
