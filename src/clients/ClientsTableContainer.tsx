import { useClients } from "./useClients";
import ClientsTable from "./ClientsTable";
import { GetClientsQuery } from "../api/clients";
import { ReactNode } from "react";

interface ClientsTableContainerProps {
	disableRouting?: boolean;
	query?: GetClientsQuery;
	renderHeader?: () => ReactNode;
}

const ClientsTableContainer = ({
	disableRouting,
	query,
	renderHeader,
}: ClientsTableContainerProps) => {
	const { data, error, isLoading, totalPages, isFetching } = useClients(query);
	return (
		<ClientsTable
			totalPages={totalPages}
			disableRouting={disableRouting}
			isLoading={isLoading}
			isFetching={isFetching}
			errorMessage={
				error ? <span date-test='clients-fetch-error'>Something went wrong.</span> : undefined
			}
			clients={data?.clients}
			renderHeader={renderHeader}
		/>
	);
};

export default ClientsTableContainer;
