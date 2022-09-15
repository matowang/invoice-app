import { useCallback, useState } from "react";

import LinearLoader from "../components/LinearLoader";
import InvoiceForm, { InvoiceFormValues } from "./InvoiceForm";
import { Skeleton } from "@mui/material";
import Error404 from "../components/Error404";

import { useClientCompanyNames } from "../clients/useClientsCompanyNames";
import { useAlert } from "../contexts/AlertContext";
import { useInvoice } from "./useInvoice";
import { useEditInvoice } from "./useEditInvoice";

import axios from "axios";

interface EditInvoiceFormProps {
	onSubmitSuccess?: () => void;
	invoiceId: string;
}

const EditInvoiceForm = ({ onSubmitSuccess, invoiceId }: EditInvoiceFormProps) => {
	const {
		data: clientCompanyNameData,
		isError: isErrorGetClient,
		isLoading: isLoadingClientsCompanyNames,
	} = useClientCompanyNames();

	const {
		data: invoiceData,
		isError: isGetInvoiceError,
		error,
	} = useInvoice(invoiceId, { keepPreviousData: true });

	const { mutate, isLoading: isMutating } = useEditInvoice(invoiceId);
	const [formError, setFormError] = useState<null | string>(null);

	const { showAlert } = useAlert();

	const submitForm = useCallback(
		(invoiceFormValues: InvoiceFormValues) => {
			//We use a promise so that the InvoiceForm react-hook-form can know if submit was succesful
			return new Promise((resolve, reject) => {
				mutate(invoiceFormValues, {
					onSuccess: (data) => {
						showAlert(
							<span data-test='form-success'>Edited Invoice Successfully.</span>,
							"success"
						);
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

	if (!invoiceData)
		return (
			<>
				<LinearLoader loading />
				<div className='flex flex-col gap-5'>
					{Array.from(Array(8)).map((e, i) => (
						<Skeleton key={`loading-edit-invoice-form-skel-${i}`} height='4rem' />
					))}
				</div>
			</>
		);

	if (axios.isAxiosError(error) && error.response?.status === 404) return <Error404 />;

	return (
		<>
			<LinearLoader loading={isMutating} />
			<InvoiceForm
				onSubmit={submitForm}
				formError={
					isErrorGetClient || isGetInvoiceError
						? "Something went wrong. Please refresh."
						: formError
				}
				disabled={isErrorGetClient || isGetInvoiceError || isMutating}
				clientsCompanyNames={clientCompanyNameData || []}
				isLoadingClientsCompanyNames={isLoadingClientsCompanyNames}
				defaultValues={invoiceData}
				submitText='Submit Edit'
			/>
		</>
	);
};

export default EditInvoiceForm;
