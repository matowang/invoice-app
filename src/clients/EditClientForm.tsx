import axios from "axios";

import { useAlert } from "../contexts/AlertContext";
import { useEditClient } from "./useEditClient";
import { Fragment, useCallback, useState } from "react";

import ClientForm, { ClientValues } from "./ClientForm";
import LinearLoader from "../components/LinearLoader";

import { Skeleton } from "@mui/material";
import Error404 from "../components/Error404";

import { useClient } from "./useClient";

interface EditClientFormProps {
	onSubmitSuccess?: () => void;
	clientId: string;
	onGetClientError?: (err: unknown) => void;
}

const EditClientForm = ({ onSubmitSuccess, clientId, onGetClientError }: EditClientFormProps) => {
	const { showAlert } = useAlert();
	const [formError, setFormError] = useState<string | null>(null);
	const { mutate, isLoading: editClientIsLoading } = useEditClient(clientId);

	const { data, isError, error } = useClient(clientId, { keepPreviousData: true });

	const onSubmit = useCallback(
		(clientValues: ClientValues) => {
			return new Promise((resolve, reject) => {
				mutate(
					{
						...clientValues,
						id: clientId,
					},
					{
						onSuccess: (data) => {
							showAlert(
								<span data-test='form-success'>Edited Client Successfully.</span>,
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
							reject();
						},
					}
				);
			});
		},
		[clientId, mutate, onSubmitSuccess, showAlert]
	);

	if (isError && axios.isAxiosError(error) && error.response?.status === 404) return <Error404 />;

	if (!data) {
		return (
			<Fragment key='loading-edit-client-form'>
				<LinearLoader loading />
				<div className='flex flex-col gap-5'>
					{Array.from(Array(8)).map((e, i) => (
						<Skeleton key={`loading-client-form-skel-${i}`} height='4rem' />
					))}
				</div>
			</Fragment>
		);
	}

	return (
		<Fragment key='loaded-edit-client-form'>
			<LinearLoader loading={editClientIsLoading} />
			<ClientForm
				formError={isError ? "Something went wrong. Please refresh." : formError}
				disabled={editClientIsLoading}
				defaultValues={data}
				onSubmit={onSubmit}
				submitText='EDIT CLIENT'
			/>
		</Fragment>
	);
};

export default EditClientForm;
