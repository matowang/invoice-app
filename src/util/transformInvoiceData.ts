import { ClientCompanyNameDTO } from "../api/clients";
import { InvoiceAPIValues, InvoiceDTO } from "../api/invoices";
import { InvoiceFormValues } from "../invoices/InvoiceForm";

export const transformInvoiceDTO = (
	invoiceDTO: InvoiceDTO,
	clientCompanyNameData: ClientCompanyNameDTO[]
): InvoiceFormValues => {
	const clientCompany = clientCompanyNameData.find((company) => company.id === invoiceDTO.clientId);
	const valueSum =
		invoiceDTO.items?.reduce((a: number, item: { price: number }) => a + item.price, 0) || 0;
	return {
		...invoiceDTO,
		meta: {
			...invoiceDTO?.meta,
		},
		items: invoiceDTO?.items?.length ? invoiceDTO?.items : [{ description: "", price: 0 }],
		value: valueSum,
		clientCompany: clientCompany || { id: "", companyName: "" },
	};
};

export const transformInvoiceValue = (invoiceFormValues: InvoiceFormValues): InvoiceAPIValues => {
	const reformattedValues: InvoiceAPIValues = {
		...invoiceFormValues,
		clientId: invoiceFormValues.clientCompany.id,
		projectCode: invoiceFormValues.projectCode || undefined,
	};
	return reformattedValues;
};
