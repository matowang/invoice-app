import { useCallback, useMemo, useState } from "react";

import { Skeleton } from "@mui/material";
import LinearLoader from "../components/LinearLoader";
import InvoiceForm, { InvoiceFormValues } from "./InvoiceForm";

import { useClientCompanyNames } from "../clients/useClientsCompanyNames";
import { useAlert } from "../contexts/AlertContext";
import { useCreateInvoice } from "./useCreateInvoice";

import axios from "axios";

interface CreateInvoiceFormProps {
	onSubmitSuccess?: () => void;
	clientId?: string;
}

const CreateInvoiceForm = ({ onSubmitSuccess, clientId }: CreateInvoiceFormProps) => {
	const {
		data: clientCompanyNameData,
		isError: isErrorGetClient,
		isLoading: isLoadingClientsCompanyNames,
	} = useClientCompanyNames();
	const { mutate, isLoading: mutateIsLoading } = useCreateInvoice();
	const [formError, setFormError] = useState<null | string>(null);

	const { showAlert } = useAlert();

	const defaultClientCompany = useMemo(
		() => clientCompanyNameData?.find((clientCompany) => clientCompany.id === clientId),
		[clientCompanyNameData, clientId]
	);

	const defaultValues = useMemo<Partial<InvoiceFormValues>>(
		() =>
			JSON.parse(
				JSON.stringify({
					clientCompany: defaultClientCompany,
				})
			),
		[defaultClientCompany]
	);

	const submitForm = useCallback(
		(invoiceFormValues: InvoiceFormValues) => {
			//We use a promise so that the InvoiceForm react-hook-form can know if submit was succesful
			return new Promise<void>((resolve, reject) => {
				mutate(invoiceFormValues, {
					onSuccess: () => {
						showAlert(<span data-test='form-success'>Added Invoice Successfully.</span>, "success");
						onSubmitSuccess?.();
						setFormError(null);
						resolve();
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

	if (isLoadingClientsCompanyNames)
		return (
			<>
				<LinearLoader loading />
				<div className='flex flex-col gap-5'>
					{Array.from(Array(8)).map((e, i) => (
						<Skeleton key={`loading-create-invoice-form-skel-${i}`} height='4rem' />
					))}
				</div>
			</>
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
				submitText='CREATE INVOICE'
				defaultValues={defaultValues}
			/>
		</>
	);
};

export default CreateInvoiceForm;
