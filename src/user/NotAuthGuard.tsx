import { ReactNode, useEffect } from "react"

import { useAuth } from './AuthContext';

import { useRouter } from 'next/router';

interface NotAuthGuardProps {
    children: ReactNode
}

const NotAuthGuard = ({ children }: NotAuthGuardProps) => {
    const { loading, user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && user)
            router.push('/dashboard');
    }, [loading, user]);
    if (loading || user)
        return <div><h1>loading...</h1></div>;
    return <>{children}</>;
}

export default NotAuthGuard;