import { useCallback, useState } from "react";

import { Skeleton } from "@mui/material";
import LinearLoader from "../components/LinearLoader";
import InvoiceForm, { InvoiceFormValues } from "./InvoiceForm";

import { useClientCompanyNames } from "../clients/useClientsCompanyNames";
import { useAlert } from "../components/AlertContext";
import { useCreateInvoice } from "./useCreateInvoice";

import axios from "axios";

interface CreateInvoiceFormProps {
	onSubmitSuccess?: () => void;
}

const CreateInvoiceForm = ({ onSubmitSuccess }: CreateInvoiceFormProps) => {
	const { data: clientCompanyNameData, isError: getClientIsError } = useClientCompanyNames();
	const { mutate, isLoading: mutateIsLoading } = useCreateInvoice();
	const [formError, setFormError] = useState<null | string>(null);

	const { showAlert } = useAlert();

	const submitForm = useCallback(
		(invoiceFormValues: InvoiceFormValues) => {
			//We use a promise so that the InvoiceForm react-hook-form can know if submit was succesful
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

	if (!clientCompanyNameData) {
		return (
			<>
				<LinearLoader loading />
				<div className='flex flex-col gap-5'>
					{Array.from(Array(6)).map((e, i) => (
						<Skeleton key={`loading-invoice-skel-${i}`} height='4rem' />
					))}
				</div>
			</>
		);
	}

	return (
		<>
			<LinearLoader loading={mutateIsLoading} />
			<InvoiceForm
				onSubmit={submitForm}
				formError={getClientIsError ? "Something went wrong. Please refresh." : formError}
				disabled={getClientIsError || mutateIsLoading}
				clientsCompanyNames={clientCompanyNameData || []}
				resetOnSuccesfulSubmit
			/>
		</>
	);
};

export default CreateInvoiceForm;
