import DataTable, { Cell, DataTableField } from "../components/DataTable/DataTable";
import MenuActions from "../components/ActionsMenu";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { ReactNode } from "react";
import { ClientDTO } from "../api/clients";
import { SortOrder } from "../api/base";

export interface ClientsTableProps {
	clients?: ClientDTO[];
	isLoading: boolean;
	isFetching: boolean;
	errorMessage?: ReactNode;
	disableRouting?: boolean;
	totalPages?: number;
	renderHeader?: () => ReactNode;
	actionsOnClick?: {
		editClient?: (client: ClientDTO) => void;
		addInvoice?: (client: ClientDTO) => void;
	};
	onClickField?: (field: DataTableField) => void;
	onClickRow?: (client: ClientDTO) => void;
	sortBy?: string;
	sortOrder?: SortOrder;
}

const fields: DataTableField[] = [
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
	{ label: `$${totalBilled.toLocaleString()}`, "data-test": "client-totalBilled" },
];

const ClientsTable = ({
	clients,
	isLoading,
	isFetching,
	errorMessage,
	disableRouting,
	totalPages,
	renderHeader,
	actionsOnClick,
	onClickField,
	onClickRow,
	sortBy,
	sortOrder,
}: ClientsTableProps) => {
	return (
		<DataTable
			onClickField={onClickField}
			sortBy={sortBy}
			sortOrder={sortOrder}
			renderHeader={renderHeader}
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
				onClick: () => onClickRow?.(client),
			})}
			rowDataTransform={rowDataTransform}
			renderRowActions={(client) => (
				<MenuActions
					iconButtonProps={{ "data-test": "client-actions" }}
					key={client.id + "actions"}
					actions={[
						{
							label: "Edit Client",
							onClick: () => actionsOnClick?.editClient?.(client),
							icon: <EditOutlinedIcon />,
							"data-test": "edit-client",
						},
						{
							label: "Add Invoice",
							onClick: () => actionsOnClick?.addInvoice?.(client),
							icon: <DescriptionOutlinedIcon />,
							"data-test": "add-invoice",
						},
					]}
				/>
			)}
		/>
	);
};

export default ClientsTable;
