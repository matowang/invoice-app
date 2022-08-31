import axios from "axios";

import { useAlert } from "../components/AlertContext";
import { useEditClient } from "./useEditClient";
import { Fragment, useEffect, useState } from "react";

import ClientForm, { ClientValues } from "./ClientForm";
import LinearLoader from "../components/LinearLoader";

import { getClient } from "../api/base";
import { Skeleton, TextField } from "@mui/material";

interface EditClientFormProps {
	onSubmitSuccess?: () => unknown;
	clientID: string;
	onGetClientError: (err: unknown) => unknown;
}

const EditClientForm = ({
	onSubmitSuccess,
	clientID,
	onGetClientError,
}: EditClientFormProps) => {
	const { showAlert } = useAlert();
	const [formError, setFormError] = useState<string | null>(null);

	const [initValues, setInitValues] = useState<ClientValues | undefined>();

	const { mutate, isLoading: editClientIsLoading } = useEditClient();

	useEffect(() => {
		getClient(clientID)
			.then((data) => setInitValues(data))
			.catch((err) => {
				showAlert("Something went wrong.");
				onGetClientError(err);
			});
	}, []);

	if (!initValues) {
		return (
			<Fragment key='loading-edit-client-form'>
				<LinearLoader loading />
				<div className='flex flex-col gap-5'>
					{Array.from(Array(8)).map((e, i) => (
						<TextField disabled key={"loading-field" + i} />
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
							id: clientID,
						},
						{
							onSuccess: () => {
								showAlert(
									<span data-test='form-success'>
										Edited Client Successfully.
									</span>,
									"success"
								);
								onSubmitSuccess?.();
								setFormError(null);
							},
							onError: (err) => {
								if (
									!axios.isAxiosError(err) ||
									typeof err.response?.data !== "string"
								)
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
