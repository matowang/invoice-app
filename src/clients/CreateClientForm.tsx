import axios from "axios";

import { useAlert } from "../contexts/AlertContext";
import { useCreateClient } from "./useCreateClient";
import { useCallback, useState } from "react";

import ClientForm, { ClientValues } from "./ClientForm";
import LinearLoader from "../components/LinearLoader";

interface CreateClientForm {
	onSubmitSuccess?: () => unknown;
}

const CreateClientForm = ({ onSubmitSuccess }: CreateClientForm) => {
	const { showAlert } = useAlert();
	const [formError, setFormError] = useState<string | null>(null);
	const { mutate, isLoading } = useCreateClient();

	const handleSubmit = useCallback(
		(clientValues: ClientValues) => {
			//We use a promise so that the InvoiceForm react-hook-form can know if submit was succesful
			return new Promise<void>((resolve, reject) => {
				mutate(clientValues, {
					onSuccess: () => {
						showAlert(<span data-test='form-success'>Added Client Successfully.</span>, "success");
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

	return (
		<>
			<LinearLoader loading={isLoading} />
			<ClientForm
				formError={formError}
				disabled={isLoading}
				resetOnSuccessfulSubmit
				onSubmit={handleSubmit}
			/>
		</>
	);
};

export default CreateClientForm;
