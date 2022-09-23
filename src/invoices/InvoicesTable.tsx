import DataTable, { Cell } from "../components/DataTable/DataTable";
import MenuActions from "../components/ActionsMenu";
import { useRouter } from "next/router";

import { InvoiceWithClientsDTO } from "../api/invoices";

import dayjs from "dayjs";

import { ReactNode } from "react";

interface InvoicesTableProps {
	invoices?: InvoiceWithClientsDTO[];
	isLoading?: boolean;
	isFetching?: boolean;
	errorMessage?: ReactNode;
	disableRouting?: boolean;
	totalPages?: number;
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
		label: invoice.invoice_number,
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
		label: invoice.value,
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
}: InvoicesTableProps) => {
	const router = useRouter();

	return (
		<DataTable
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
				onClick: () => router.push(`/invoices/${invoice.id}/view`),
			})}
			rowDataTransform={rowDataTransform}
			renderRowActions={({ invoice }) => (
				<MenuActions
					iconButtonProps={{ "data-test": "invoice-actions" }}
					actions={[
						{
							label: "Edit Invoice",
							onClick: () => router.push(`/invoices/${invoice.id}/edit`),
						},
						{
							label: "Print Invoice",
							onClick: () => router.push(`/invoices/${invoice.id}/view?print=true`),
						},
					]}
				/>
			)}
		/>
	);
};

export default InvoicesTable;
