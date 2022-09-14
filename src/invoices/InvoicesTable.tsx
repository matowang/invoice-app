import { TableRow, TableCell } from "@mui/material";

import DataTable from "../components/DataTable";
import MenuActions from "../components/ActionsMenu";
import { useRouter } from "next/router";

import { InvoiceWithClientsDTO } from "../api/invoices";

import dayjs from "dayjs";

import { ReactNode } from "react";

interface InvoicesTableProps {
	invoices?: InvoiceWithClientsDTO[];
	isLoading: boolean;
	isFetching: boolean;
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
	},
	{
		name: "dueDate",
		label: "Due Date",
		isSortable: true,
	},
	{
		name: "clientName",
		label: "Client Name",
		isSortable: false,
	},
	{
		name: "total",
		label: "Total",
		isSortable: true,
	},
	{
		name: "placeholder",
		label: "",
		isSortable: false,
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
			isLoading={isLoading}
			isFetching={isFetching}
			errorMsg={errorMessage}
			rowsData={invoices}
			disableRouting={disableRouting}
			tableProps={{ "data-test": "invoices-table" }}
		>
			{({ invoice, client }) => (
				<TableRow
					hover
					component='tr'
					data-test={`invoice-row-${invoice.id}`}
					key={invoice.id}
					onClick={() => router.push(`/invoices/${invoice.id}/view`)}
				>
					<TableCell data-test='invoice-number'>{invoice.invoice_number}</TableCell>
					<TableCell align='right' data-test='invoice-company'>
						{client.companyDetails.name}
					</TableCell>
					<TableCell align='right' data-test='invoice-date'>
						{dayjs(invoice.date).format("ll")}
					</TableCell>
					<TableCell align='right' data-test='invoice-project'>
						{client.name}
					</TableCell>
					<TableCell align='right' data-test='invoice-price'>
						{invoice.value}
					</TableCell>
					<TableCell align='right' sx={{ p: 0 }}>
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
					</TableCell>
				</TableRow>
			)}
		</DataTable>
	);
};

export default InvoicesTable;
