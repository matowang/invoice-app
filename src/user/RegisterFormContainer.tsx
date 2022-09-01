import RegisterForm from "./RegisterForm";
import AuthAPI from "../api/auth";
import axios from "axios";
import { useState } from "react";
import { useAlert } from "../components/AlertContext";
import LinearLoader from "../components/LinearLoader";

interface RegisterFormContainerProps {
	onRegisterSuccess: () => unknown;
}

const RegisterFormContainer = ({
	onRegisterSuccess,
}: RegisterFormContainerProps) => {
	const { showAlert } = useAlert();
	const [formError, setFormError] = useState<string | null>(null);
	const [disabled, setDisabled] = useState<boolean>(false);

	return (
		<>
			<LinearLoader loading={disabled} />
			<RegisterForm
				formError={formError}
				disabled={disabled}
				onSubmit={async (registerData) => {
					setDisabled(true);
					try {
						await AuthAPI.register(registerData);
						onRegisterSuccess();
					} catch (err) {
						if (axios.isAxiosError(err) && err.response?.status === 400)
							setFormError((err.response?.data as string) ?? null);
						else
							showAlert(
								<span data-test='form-error'>Something went wrong</span>
							);
						setDisabled(false);
					}
				}}
			/>
		</>
	);
};

export default RegisterFormContainer;
