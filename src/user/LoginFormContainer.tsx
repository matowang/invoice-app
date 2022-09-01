import LoginForm from "./LoginForm";
import LinearLoader from "../components/LinearLoader";

import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useAlert } from "../components/AlertContext";

import AuthAPI from "../api/auth";
import axios from "axios";

const LoginFormContainer = () => {
	const { login } = useAuth();
	const { showAlert } = useAlert();

	const [formError, setFormError] = useState<string | null>(null);
	const [disabled, setDisabled] = useState<boolean>(false);

	return (
		<>
			<LinearLoader loading={disabled} />
			<LoginForm
				formError={formError}
				disabled={disabled}
				onSubmit={async (loginValues) => {
					setFormError(null);
					try {
						setDisabled(true);
						const { data } = await AuthAPI.login(loginValues);
						await login(data.token);
					} catch (err) {
						if (axios.isAxiosError(err) && err.response?.status === 400) {
							setFormError("The entered Email or Password is wrong.");
						} else {
							showAlert(
								<span data-test='form-error'>Something went wrong</span>
							);
						}
						setDisabled(false);
					}
				}}
			/>
		</>
	);
};

export default LoginFormContainer;
