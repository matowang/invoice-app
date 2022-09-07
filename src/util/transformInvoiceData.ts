import { ClientCompanyNameDTO } from "../api/clients";
import { InvoiceAPIValues, InvoiceDTO } from "../api/invoices";
import { InvoiceFormValues } from "../invoices/InvoiceForm";

export const transformInvoiceDTO = (
	invoiceDTO: InvoiceDTO,
	clientCompanyNameData: ClientCompanyNameDTO[]
): InvoiceFormValues => {
	const clientCompany = clientCompanyNameData.find(
		(company) => company.id === invoiceDTO.client_id
	);
	return {
		...invoiceDTO,
		meta: {
			...invoiceDTO?.meta,
			items: invoiceDTO?.meta?.items?.length
				? invoiceDTO?.meta.items
				: [{ description: null, value: null }],
		},
		clientCompany: clientCompany || { id: "", companyName: "" },
	};
};

export const transformInvoiceValue = (invoiceFormValues: InvoiceFormValues): InvoiceAPIValues => {
	const valueSum = invoiceFormValues.meta?.items?.reduce((a, item) => a + item.value, 0) || 0;
	const reformattedValues: InvoiceAPIValues = {
		date: invoiceFormValues.date,
		dueDate: invoiceFormValues.dueDate,
		invoice_number: invoiceFormValues.invoice_number,
		meta: invoiceFormValues.meta,
		client_id: invoiceFormValues.clientCompany.id,
		projectCode: invoiceFormValues.projectCode || undefined,
		value: valueSum,
	};
	return reformattedValues;
};
