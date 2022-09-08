import axios from "axios";

import { useAlert } from "../components/AlertContext";
import { useCreateClient } from "./useCreateClient";
import { useState } from "react";

import ClientForm from "./ClientForm";
import LinearLoader from "../components/LinearLoader";

interface CreateClientForm {
	onSubmitSuccess?: () => unknown;
}

const CreateClientForm = ({ onSubmitSuccess }: CreateClientForm) => {
	const { showAlert } = useAlert();
	const [formError, setFormError] = useState<string | null>(null);
	const { mutate, isLoading } = useCreateClient();
	//TODO Clear Form on Creation
	return (
		<>
			<LinearLoader loading={isLoading} />
			<ClientForm
				formError={formError}
				disabled={isLoading}
				resetOnSuccessfulSubmit
				onSubmit={(clientValues) => {
					mutate(clientValues, {
						onSuccess: () => {
							showAlert(
								<span data-test='form-success'>Added Client Successfully.</span>,
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
			/>
		</>
	);
};

export default CreateClientForm;
