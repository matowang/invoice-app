import { useClients } from "./useClients";
import ClientsTable, { ClientsTableProps } from "./ClientsTable";
import { GetClientsQuery } from "../api/clients";
import { ReactNode } from "react";

interface ClientsTableContainerProps {
	disableRouting?: boolean;
	query?: GetClientsQuery;
	renderHeader?: () => ReactNode;
	actionsOnClick: ClientsTableProps["actionsOnClick"];
	onClickRow: ClientsTableProps["onClickRow"];
	onClickField?: ClientsTableProps["onClickField"];
	onChangePage?: ClientsTableProps["onChangePage"];
}

const ClientsTableContainer = ({
	disableRouting,
	query,
	renderHeader,
	actionsOnClick,
	onClickRow,
	onClickField,
	onChangePage,
}: ClientsTableContainerProps) => {
	const { data, error, isLoading, totalPages, isFetching } = useClients(query);
	return (
		<ClientsTable
			sortBy={query?.sortBy}
			sortOrder={query?.sortOrder}
			page={query?.page || 1}
			totalPages={totalPages}
			disableRouting={disableRouting}
			isLoading={isLoading}
			isFetching={isFetching}
			errorMessage={error ? "Something went wrong" : undefined}
			clients={data?.clients}
			renderHeader={renderHeader}
			actionsOnClick={actionsOnClick}
			onClickRow={onClickRow}
			onClickField={onClickField}
			onChangePage={onChangePage}
		/>
	);
};

export default ClientsTableContainer;
