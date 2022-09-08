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
	return <div>InvoiceView</div>;
};
