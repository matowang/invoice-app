import axios from "axios";

import { useAlert } from "../contexts/AlertContext";
import { useEditClient } from "./useEditClient";
import { Fragment, useEffect, useState } from "react";

import ClientForm, { ClientValues } from "./ClientForm";
import LinearLoader from "../components/LinearLoader";

import { getClient } from "../api/clients";
import { Skeleton } from "@mui/material";

interface EditClientFormProps {
	onSubmitSuccess?: () => void;
	clientId: string;
	onGetClientError?: (err: unknown) => void;
}

const EditClientForm = ({ onSubmitSuccess, clientId, onGetClientError }: EditClientFormProps) => {
	const { showAlert } = useAlert();
	const [formError, setFormError] = useState<string | null>(null);

	const [initValues, setInitValues] = useState<ClientValues | undefined>();

	const { mutate, isLoading: editClientIsLoading } = useEditClient();

	//TODO use react query
	useEffect(() => {
		getClient(clientId)
			.then((data) => setInitValues(data))
			.catch((err) => {
				showAlert("Something went wrong.");
				onGetClientError?.(err);
			});
	}, [clientId, onGetClientError, showAlert]);

	if (!initValues) {
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
				formError={formError}
				disabled={editClientIsLoading}
				defaultValues={initValues}
				onSubmit={(clientValues) => {
					mutate(
						{
							...clientValues,
							id: clientId,
						},
						{
							onSuccess: () => {
								showAlert(
									<span data-test='form-success'>Edited Client Successfully.</span>,
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
						}
					);
				}}
			/>
		</Fragment>
	);
};

export default EditClientForm;
