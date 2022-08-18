import RegisterForm from "./RegisterForm"

import { useAuth } from './AuthContext';

const RegisterFormContainer = () => {

    const { register } = useAuth();

    return <RegisterForm onSubmit={({ email, password, confirmPassword }) => register({ email, password, confirmPassword })} />
}

export default RegisterFormContainer;