import { setCookie, destroyCookie, parseCookies } from 'nookies'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useRouter } from 'next/router';

interface AuthContextType {
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
    token: string | null;
}

interface AuthProviderProps {
    children?: ReactNode
}

const AuthContext = createContext<null | AuthContextType>(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (ctx === null) {
        throw new Error("You can't the Auth Context with no Auth Context Provider.")
    }
    return ctx;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const { token } = parseCookies();
        if (token) {
            setToken(token);
        }
        setLoading(false);
    }, []);

    const login = async (token: string) => {
        setCookie(null, 'token', token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        setToken(token);
        setLoading(false);
    }
    const logout = () => {
        destroyCookie(null, 'token');
        setToken(null);
        router.push('/login');
    }

    return <AuthContext.Provider value={{ loading, login, logout, token }}>
        {children}
    </AuthContext.Provider>
}