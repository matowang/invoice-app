import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useMemo } from "react";
import Error404 from "../components/Error404";
import { InvoiceFormValues } from "./InvoiceForm";

interface InvoiceViewProps {
	invoiceData: InvoiceFormValues;
}

export const InvoiceView = ({ invoiceData }: InvoiceViewProps) => {
	const {
		date,
		dueDate,
		invoice_number,
		projectCode,
		meta: { items } = {},
		clientCompany,
	} = invoiceData;

	const valueSum = useMemo(
		() => invoiceData.meta?.items.reduce((a, item) => a + item.value, 0) || 0,
		[invoiceData.meta?.items]
	);

	if (!invoiceData) return <Error404 />;

	const dataItems = [
		{
			name: "Invoice Number",
			value: invoice_number,
			test: "invoice_number",
		},
		{
			name: "Project Code",
			value: projectCode,
			test: "invoice-project-code",
		},
		{
			name: "Client Company Name",
			value: clientCompany.companyName,
			test: "invoice-client",
		},
		{
			name: "Date",
			value: date,
			test: "invoice-date",
		},
		{
			name: "Date Due",
			value: dueDate,
			test: "invoice-due-date",
		},
	];

	return (
		<div>
			<h1 data-test='invoice_number' className='text-lg'>
				Invoice: {invoice_number}
			</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<TableContainer component={Paper}>
					<Table aria-label='invoice table' data-test='invoices-table'>
						<TableBody>
							{dataItems.map(({ name, value, test }, i) => (
								<TableRow key={`table-item-data-${i}`}>
									<TableCell className='font-bold'>{name}:</TableCell>
									<TableCell data-test={test}>{value}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<TableContainer component={Paper}>
					<Table aria-label='items table' data-test='invoices-table'>
						<TableHead>
							<TableRow>
								<TableCell component='th' className='font-bold'>
									Item
								</TableCell>
								<TableCell component='th' align='right' className='font-bold'>
									Value
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{items?.map(({ description, value }, i) => (
								<TableRow key={`invoice-item-${i}`}>
									<TableCell data-test='invoice-item-description'>{description}</TableCell>
									<TableCell align='right' data-test='invoice-item-value'>
										{value}
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell className='font-bold'>Total</TableCell>
								<TableCell align='right' data-test='invoice-total' className='font-bold'>
									{valueSum}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};
