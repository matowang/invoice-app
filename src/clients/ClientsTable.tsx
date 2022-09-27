import DataTable, { Cell } from "../components/DataTable/DataTable";
import MenuActions from "../components/ActionsMenu";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useRouter } from "next/router";

import { ReactNode } from "react";
import { ClientDTO } from "../api/clients";

interface ClientsTableProps {
	clients?: ClientDTO[];
	isLoading: boolean;
	isFetching: boolean;
	errorMessage?: ReactNode;
	disableRouting?: boolean;
	totalPages?: number;
}

const fields = [
	{ name: "clientName", label: "Client Name", isSortable: true },
	{ name: "companyName", label: "Company", isSortable: true },
	{ name: "invoicesCount", label: "Invoices Count", isSortable: true },
	{ name: "totalBilled", label: "Total Billed", isSortable: true },
];

const rowDataTransform: (data: ClientDTO) => Cell[] = ({
	name,
	companyDetails,
	invoicesCount,
	totalBilled,
}) => [
	{ label: name, "data-test": "client-name" },
	{ label: companyDetails.name, "data-test": "client-companyName" },
	{ label: invoicesCount, "data-test": "client-invoicesCount" },
	{ label: totalBilled, "data-test": "client-totalBilled" },
];

const ClientsTable = ({
	clients,
	isLoading,
	isFetching,
	errorMessage,
	disableRouting,
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
			errorMsg={<span data-test='clients-fetch-error'>{errorMessage}</span>}
			rowsData={clients}
			disableRouting={disableRouting}
			tableProps={{ "data-test": "clients-table" }}
			rowProps={(client) => ({
				"data-test": `client-row-${client.id}`,
				onClick: () => router.push(`/clients/${client.id}`),
			})}
			rowDataTransform={rowDataTransform}
			renderRowActions={(client) => (
				<MenuActions
					iconButtonProps={{ "data-test": "client-actions" }}
					key={client.id + "actions"}
					actions={[
						{
							label: "Edit Client",
							onClick: () => router.push(`clients/${client.id}`),
							icon: <EditOutlinedIcon />,
						},
					]}
				/>
			)}
		/>
	);
};

export default ClientsTable;
