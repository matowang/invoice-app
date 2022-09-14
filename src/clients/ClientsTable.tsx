import { TableRow, TableCell } from "@mui/material";

import { ClientDTO } from "../api/clients";
import DataTable from "../components/DataTable";
import MenuActions from "../components/ActionsMenu";
import { useRouter } from "next/router";

interface ClientsTableProps {
	clients?: ClientDTO[];
	isLoading: boolean;
	isFetching: boolean;
	errorMessage?: string;
	disableRouting?: boolean;
	totalPages?: number;
}

const fields = [
	{ name: "clientName", label: "Client Name" },
	{ name: "companyName", label: "Company" },
	{ name: "invoicesCount", label: "Invoices Count" },
	{ name: "totalBilled", label: "Total Billed" },
	null,
];

const ClientsTable = ({
	clients,
	isLoading,
	isFetching,
	errorMessage,
	disableRouting: disableRouting,
	totalPages,
}: ClientsTableProps) => {
	const router = useRouter();

	return (
		<DataTable
			fields={fields}
			totalPages={totalPages}
			isError={!!errorMessage}
			isLoading={isLoading}
			isFetching={isFetching}
			errorMsg={errorMessage}
			rowsData={clients}
			disableRouting={disableRouting}
			tableProps={{ "data-test": "clients-table" }}
		>
			{(client) => (
				<TableRow
					hover
					data-test={`client-row-${client.id}`}
					onClick={() => router.push(`/clients/${client.id}`)}
					key={client.id}
				>
					<TableCell component='th' data-test='client-name'>
						{client.name}
					</TableCell>
					<TableCell align='right' data-test='client-companyName'>
						{client.companyDetails.name}
					</TableCell>
					<TableCell align='right' data-test='client-invoicesCount'>
						{client.invoicesCount}
					</TableCell>
					<TableCell align='right' data-test='client-totalBilled'>
						{client.totalBilled}
					</TableCell>
					<TableCell align='right' sx={{ p: 0 }}>
						<MenuActions
							iconButtonProps={{ "data-test": "client-actions" }}
							key={client.id + "actions"}
							actions={[
								{
									label: "Edit Client",
									onClick: () => router.push(`clients/${client.id}`),
								},
								{
									label: "Delete Client",
									onClick: () => router.push(`clients/${client.id}`),
								},
							]}
						/>
					</TableCell>
				</TableRow>
			)}
		</DataTable>
	);
};

export default ClientsTable;
