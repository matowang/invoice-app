import LoginForm from "./LoginForm"

const LoginFormContainer = () => {
    const handleSubmit = (data: any) => {
        console.log(data);
    }
    return <LoginForm onSubmit={handleSubmit} />
}

export default LoginFormContainer;