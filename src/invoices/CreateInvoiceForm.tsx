import { useCallback, useState } from "react";

import LinearLoader from "../components/LinearLoader";
import InvoiceForm, { InvoiceFormValues } from "./InvoiceForm";

import { useClientCompanyNames } from "../clients/useClientsCompanyNames";
import { useAlert } from "../contexts/AlertContext";
import { useCreateInvoice } from "./useCreateInvoice";

import axios from "axios";

interface CreateInvoiceFormProps {
	onSubmitSuccess?: () => void;
}

const CreateInvoiceForm = ({ onSubmitSuccess }: CreateInvoiceFormProps) => {
	const {
		data: clientCompanyNameData,
		isError: isErrorGetClient,
		isLoading: isLoadingClientsCompanyNames,
	} = useClientCompanyNames();
	const { mutate, isLoading: mutateIsLoading } = useCreateInvoice();
	const [formError, setFormError] = useState<null | string>(null);

	const { showAlert } = useAlert();

	const submitForm = useCallback(
		(invoiceFormValues: InvoiceFormValues) => {
			//We use a promise so that the InvoiceForm react-hook-form can know if submit was succesful
			//TODO check if on success data is needed
			return new Promise((resolve, reject) => {
				mutate(invoiceFormValues, {
					onSuccess: (data) => {
						showAlert(<span data-test='form-success'>Added Invoice Successfully.</span>, "success");
						onSubmitSuccess?.();
						setFormError(null);
						resolve(data);
					},
					onError: (err) => {
						if (!axios.isAxiosError(err) || typeof err.response?.data !== "string")
							return showAlert("Something went wrong.");
						showAlert(err.response.data);
						setFormError(err.response.data);
						reject(err);
					},
				});
			});
		},
		[mutate, onSubmitSuccess, showAlert]
	);

	return (
		<>
			<LinearLoader loading={mutateIsLoading} />
			<InvoiceForm
				onSubmit={submitForm}
				formError={isErrorGetClient ? "Something went wrong. Please refresh." : formError}
				disabled={isErrorGetClient || mutateIsLoading}
				clientsCompanyNames={clientCompanyNameData || []}
				isLoadingClientsCompanyNames={isLoadingClientsCompanyNames}
				resetOnSuccesfulSubmit
				submitText='Create Invoice'
			/>
		</>
	);
};

export default CreateInvoiceForm;
