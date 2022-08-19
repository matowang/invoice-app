import { ReactNode, useEffect } from "react"

import { useAuth } from './AuthContext';

import { useRouter } from 'next/router';

interface AuthGuardProps {
    children: ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const { loading, user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !user)
            router.push('/login');
    }, [loading, user]);
    if (!user)
        return <div><h1>loading...</h1></div>;
    return <>{children}</>;
}

export default AuthGuard;