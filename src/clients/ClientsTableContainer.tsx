import { useClients } from "./useClients";
import ClientsTable from "./ClientsTable";
import { GetClientsQuery } from "../api/clients";

interface ClientsTableContainerProps {
	disableRouting?: boolean;
	query?: GetClientsQuery;
}

const ClientsTableContainer = ({ disableRouting, query }: ClientsTableContainerProps) => {
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
		/>
	);
};

export default ClientsTableContainer;
