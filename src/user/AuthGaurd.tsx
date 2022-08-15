import { ReactNode, useEffect } from "react"

import { useAuth } from './AuthContext';

import { useRouter } from 'next/router';

interface AuthGaurdProps {
    children: ReactNode
}

const AuthGaurd = ({ children }: AuthGaurdProps) => {
    const { loading, token } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !token)
            router.push('/login');
    }, [loading, token]);
    if (loading)
        return <div><h1>loading...</h1></div>;
    return children;
}

export default AuthGaurd;