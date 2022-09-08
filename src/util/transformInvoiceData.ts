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
	const valueSum =
		invoiceDTO.meta?.items?.reduce((a: number, item: { value: number }) => a + item.value, 0) || 0;
	return {
		...invoiceDTO,
		meta: {
			...invoiceDTO?.meta,
			items: invoiceDTO?.meta?.items?.length
				? invoiceDTO?.meta.items
				: [{ description: null, value: null }],
		},
		value: valueSum,
		clientCompany: clientCompany || { id: "", companyName: "" },
	};
};

export const transformInvoiceValue = (invoiceFormValues: InvoiceFormValues): InvoiceAPIValues => {
	//const valueSum = invoiceFormValues.meta?.items?.reduce((a, item) => a + item.value, 0) || 0;
	const reformattedValues: InvoiceAPIValues = {
		...invoiceFormValues,
		client_id: invoiceFormValues.clientCompany.id,
		projectCode: invoiceFormValues.projectCode || undefined,
		//value: valueSum,
	};
	return reformattedValues;
};
