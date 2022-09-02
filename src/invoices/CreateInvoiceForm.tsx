import { TextField } from "@mui/material";
import axios from "axios";
import { Fragment, useState } from "react";
import { CreateInvoiceValues } from "../api/base";
import { useClientCompanyNames } from "../clients/useClientsCompanyNames";
import { useAlert } from "../components/AlertContext";
import LinearLoader from "../components/LinearLoader";
import InvoiceForm from "./InvoiceForm";
import { useCreateInvoice } from "./useCreateInvoice";

interface CreateInvoiceFormProps {
	onSubmitSuccess?: () => void;
}

//TODO Clear Items on Submit

const CreateInvoiceForm = ({ onSubmitSuccess }: CreateInvoiceFormProps) => {
	const { data: clientCompanyNameData, isError: getClientIsError } = useClientCompanyNames();
	const { mutate, isLoading: mutateIsLoading } = useCreateInvoice();
	const [formError, setFormError] = useState<null | string>(null);

	const { showAlert } = useAlert();

	if (!clientCompanyNameData) {
		return (
			<Fragment key='loading-edit-invoice-form'>
				<LinearLoader loading />
				<div className='flex flex-col gap-5'>
					{Array.from(Array(5)).map((e, i) => (
						<TextField disabled key={"loading-field" + i} />
					))}
				</div>
			</Fragment>
		);
	}

	return (
		<>
			<LinearLoader loading={mutateIsLoading} />
			<InvoiceForm
				onSubmit={({ date, dueDate, meta, clientCompany, invoice_number }) => {
					const reformattedValues: CreateInvoiceValues = {
						date,
						dueDate,
						invoice_number,
						meta,
						client_id: clientCompany.id,
						value: 1000,
					};
					console.log(reformattedValues);
					mutate(reformattedValues, {
						onSuccess: () => {
							showAlert(
								<span data-test='form-success'>Added Invoice Successfully.</span>,
								"success"
							);
							onSubmitSuccess?.();
							setFormError(null);
						},
						onError: (err) => {
							if (!axios.isAxiosError(err) || typeof err.response?.data !== "string")
								return showAlert("Something went wrong.");
							showAlert(err.response.data);
							setFormError(err.response.data);
						},
					});
				}}
				formError={getClientIsError ? "Something went wrong. Please refresh." : formError}
				disabled={getClientIsError || mutateIsLoading}
				clientsCompanyNames={clientCompanyNameData || []}
			/>
		</>
	);
};

export default CreateInvoiceForm;
