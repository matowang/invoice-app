import axios from "axios";
import { setCookie, destroyCookie, parseCookies } from 'nookies'

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { useRouter } from 'next/router';

export type LoginData = {
    user_id: string;
    email: string;
    name: string;
    token: string;
} //TODO: put this somewhere else

interface AuthContextType {
    loading: boolean;
    login: (email: string, password: string) => void;
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

    const login = async (email: string, password: string) => {
        if (process.env.NEXT_PUBLIC_API_URL) {
            console.log("Logging in...")
            try {
                const { data } = await axios.post<LoginData>(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                    email: email,
                    password: password
                });
                setCookie(null, 'token', data.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                setToken(data.token);
                setLoading(false);
                router.push('/');
            } catch (err) {
                console.error(err);
            }
            console.log("Logged in.");
        }
        else
            throw new Error("No NEXT_PUBLIC_API_URL environment variable ")
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