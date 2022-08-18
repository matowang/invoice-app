import LoginFormContainer from "../src/user/LoginFormContainer";

import { useRouter } from 'next/router';
import { useAuth } from '../src/user/AuthContext';
import { useEffect } from "react";

const Login = () => {

    const router = useRouter();
    const { loading, token } = useAuth();

    useEffect(() => {
        if (!loading && token)
            router.push('/dashboard');
    }, [loading, token, router])

    return <div className='my-40 mx-20 flex justify-center relative'>
        <div className='max-w-md w-full'>
            <LoginFormContainer />
        </div>
    </div>
}

export default Login;