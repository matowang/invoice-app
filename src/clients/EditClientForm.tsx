import axios from "axios";

import { useAlert } from "../components/AlertContext";
import { useEditClient } from "./useEditClient";
import { useClient } from "./useClient";
import { useState } from "react";

import ClientForm from "./ClientForm";
import LinearLoader from "../components/LinearLoader";

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
	const { mutate, isLoading } = useEditClient();
	const {
		data,
		isLoading: getClientIsLoading,
		isError,
	} = useClient(clientID, {
		onError: onGetClientError,
	});

	if (!data || isError) return null;

	return (
		<>
			<LinearLoader loading={isLoading || getClientIsLoading} />
			<ClientForm
				formError={formError}
				disabled={isLoading || getClientIsLoading}
				defaultValues={data}
				onSubmit={(clientValues) => {
					mutate(
						{
							...clientValues,
							id: clientID,
						},
						{
							onSuccess: () => {
								showAlert("Edited Client Successfully.", "success");
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
		</>
	);
};

export default EditClientForm;
