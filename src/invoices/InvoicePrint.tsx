import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { InvoiceFormValues } from "./InvoiceForm";

const theme = createTheme({
	typography: {
		fontFamily: "monospace",
	},
});

interface InvoicePrintProps {
	invoiceData: InvoiceFormValues;
}

export const InvoicePrint = ({ invoiceData }: InvoicePrintProps) => {
	const {
		date,
		dueDate,
		invoice_number,
		projectCode,
		value,
		meta: { items } = {},
		clientCompany,
	} = invoiceData;

	const dataItems = [
		{
			name: "Invoice Number",
			value: invoice_number,
			test: "invoice_number",
			rowClass: "bg-slate-200 border-x-0 border-y-2 border-solid",
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
		<ThemeProvider theme={theme}>
			<div>
				<TableContainer>
					<Table aria-label='invoice print table' data-test='invoices-table'>
						<TableBody>
							{dataItems.map(({ name, value, test, rowClass }, i) => (
								<TableRow key={`table-item-data-${i}`} className={rowClass}>
									<TableCell className='font-bold'>{name}:</TableCell>
									<TableCell data-test={test}>{value}</TableCell>
								</TableRow>
							))}
							<TableRow className='bg-slate-200 border-x-0 border-y-2 border-solid'>
								<TableCell className='font-bold'>Item</TableCell>
								<TableCell align='right' className='font-bold'>
									Value
								</TableCell>
							</TableRow>
							{items?.map(({ description, value }, i) => (
								<TableRow key={`invoice-item-${i}`}>
									<TableCell data-test='invoice-item-description'>{description}</TableCell>
									<TableCell align='right' data-test='invoice-item-value'>
										{value}
									</TableCell>
								</TableRow>
							))}
							<TableRow className='bg-slate-200 border-x-0 border-y-2 border-solid'>
								<TableCell className='font-bold'>Total</TableCell>
								<TableCell align='right' data-test='invoice-total' className='font-bold'>
									{value}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</ThemeProvider>
	);
};
