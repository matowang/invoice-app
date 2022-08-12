import LoginForm from "./LoginForm"

const LoginFormContainer = () => {
    return <LoginForm onSubmit={(data) => {
        console.log(data);
    }} />
}

export default LoginFormContainer;