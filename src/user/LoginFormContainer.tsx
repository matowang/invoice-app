import LoginForm from "./LoginForm"

import { useAuth, LoginData } from './AuthContext';

const LoginFormContainer = () => {

    const { login } = useAuth();

    return <LoginForm onSubmit={({ email, password }) => login(email, password)} />
}

export default LoginFormContainer;