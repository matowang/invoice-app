import LoginForm, { LoginValues } from "./LoginForm";
import LinearLoader from "../components/LinearLoader";

import { useAuth } from "../user/AuthContext";
import { useCallback, useState } from "react";
import { useAlert } from "../contexts/AlertContext";

import { login } from "../api/auth";
import axios from "axios";

const LoginFormContainer = () => {
	const { login: setToken } = useAuth();
	const { showAlert } = useAlert();

	const [formError, setFormError] = useState<string | null>(null);
	const [disabled, setDisabled] = useState<boolean>(false);

	const handleSubmit = useCallback(
		async (loginValues: LoginValues) => {
			setFormError(null);
			try {
				setDisabled(true);
				const { data } = await login(loginValues);
				await setToken(data.token);
			} catch (err) {
				if (axios.isAxiosError(err) && err.response?.status === 400) {
					setFormError("The entered Email or Password is wrong.");
				} else {
					showAlert(<span data-test='form-error'>Something went wrong</span>);
				}
				setDisabled(false);
			}
		},
		[setToken, showAlert]
	);

	return (
		<>
			<LinearLoader loading={disabled} />
			<LoginForm formError={formError} disabled={disabled} onSubmit={handleSubmit} />
		</>
	);
};

export default LoginFormContainer;
