import DataTable, { Cell, DataTableField } from "../components/DataTable/DataTable";
import MenuActions from "../components/ActionsMenu";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

import dayjs from "dayjs";

import { InvoiceDTO, InvoiceWithClientsDTO } from "../api/invoices";
import { ReactNode } from "react";
import { SortOrder } from "../api/base";

export interface InvoicesTableProps {
	invoices?: InvoiceWithClientsDTO[];
	isLoading?: boolean;
	isFetching?: boolean;
	errorMessage?: ReactNode;
	disableRouting?: boolean;
	totalPages?: number;
	renderHeader?: () => ReactNode;
	actionsOnClick?: {
		editInvoice?: (invoice: InvoiceDTO) => void;
		printInvoice?: (invoice: InvoiceDTO) => void;
	};
	onClickRow: (invoice: InvoiceDTO) => void;
	sortBy?: string;
	sortOrder?: SortOrder;
	onClickField?: (field: DataTableField) => void;
	onChangePage?: (page: number) => void;
	page: number;
}

const fields = [
	{
		name: "invoiceNumber",
		label: "Invoice Number",
		isSortable: false,
	},
	{
		name: "companyName",
		label: "Client Company",
		isSortable: true,
		"data-test": "company-name-header",
	},
	{
		name: "creationDate",
		label: "Creation Date",
		isSortable: true,
		"data-test": "creation-date-header",
	},
	{
		name: "dueDate",
		label: "Due Date",
		isSortable: true,
		"data-test": "due-date-header",
	},
	{
		name: "clientName",
		label: "Client Name",
		isSortable: false,
	},
	{
		name: "projectCode",
		label: "Project",
		isSortable: false,
	},
	{
		name: "total",
		label: "Total",
		isSortable: true,
		"data-test": "total-header",
	},
];

const rowDataTransform: (data: InvoiceWithClientsDTO) => Cell[] = ({ invoice, client }) => [
	{
		label: invoice.invoiceNumber,
		"data-test": "invoice-number",
	},
	{
		label: client.companyDetails.name,
		"data-test": "invoice-company",
	},
	{
		label: dayjs(invoice.date).format("ll"),
		"data-test": "invoice-date",
	},
	{
		label: dayjs(invoice.dueDate).format("ll"),
		"data-test": "invoice-due-date",
	},
	{
		label: client.name,
		"data-test": "invoice-client",
	},
	{
		label: invoice.projectCode,
		"data-test": "invoice-project",
	},
	{
		label: `$${invoice.value.toLocaleString()}`,
		"data-test": "invoice-price",
	},
];
const InvoicesTable = ({
	invoices,
	isLoading,
	isFetching,
	errorMessage,
	disableRouting: disableRouting,
	totalPages,
	renderHeader,
	actionsOnClick,
	onClickRow,
	onClickField,
	sortBy,
	sortOrder,
	onChangePage,
	page,
}: InvoicesTableProps) => {
	return (
		<DataTable
			onChangePage={onChangePage}
			onClickField={onClickField}
			sortBy={sortBy}
			sortOrder={sortOrder}
			page={page}
			renderHeader={renderHeader}
			fields={fields}
			totalPages={totalPages}
			isError={!!errorMessage}
			isLoading={!!isLoading}
			isFetching={!!isFetching}
			errorMsg={<span data-test='invoices-fetch-error'>{errorMessage}</span>}
			rowsData={invoices}
			disableRouting={disableRouting}
			tableProps={{ "data-test": "invoices-table" }}
			rowProps={({ invoice }) => ({
				"data-test": `invoice-row-${invoice.id}`,
				onClick: () => onClickRow(invoice),
			})}
			rowDataTransform={rowDataTransform}
			renderRowActions={({ invoice }) => (
				<MenuActions
					iconButtonProps={{ "data-test": "invoice-actions" }}
					actions={[
						{
							label: "Edit Invoice",
							onClick: () => actionsOnClick?.editInvoice?.(invoice),
							icon: <EditOutlinedIcon />,
						},
						{
							label: "Print Invoice",
							onClick: () => actionsOnClick?.printInvoice?.(invoice),
							icon: <PrintOutlinedIcon />,
						},
					]}
				/>
			)}
		/>
	);
};

export default InvoicesTable;
