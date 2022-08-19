import LoginFormContainer from "../src/user/LoginFormContainer";
import NotAuthGuard from "../src/user/NotAuthGuard";

import { useRouter } from 'next/router';
import { useAuth } from '../src/user/AuthContext';
import { useEffect } from "react";

const Login = () => {
    return <NotAuthGuard>
        <div className='my-40 mx-20 flex justify-center relative'>
            <div className='max-w-md w-full'>
                <LoginFormContainer />
            </div>
        </div>
    </NotAuthGuard>
}

export default Login;