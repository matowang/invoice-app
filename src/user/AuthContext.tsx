import { setCookie, destroyCookie, parseCookies } from 'nookies'

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import AuthAPI, { UserDTO, setHeaderToken } from '../api/auth';

interface AuthContextType {
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
    token: string | null;
    user: UserDTO | null;
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

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserDTO | null>(null);

    const initAuth = useCallback(async () => {
        setLoading(true);
        console.log("init auth");
        const { token } = parseCookies();
        if (!token) return setLoading(false);
        const user = await AuthAPI.validateToken(token);
        if (user) {
            setToken(token);
            setUser(user);
            setHeaderToken(token, logout);
        } else {
            destroyCookie(null, 'token');
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        initAuth();
    }, [initAuth]);

    const login = async (token: string) => {
        const user = await AuthAPI.validateToken(token);
        if (user) {
            setToken(token);
            setUser(user);
            setHeaderToken(token, logout);
        } else {
            destroyCookie(null, 'token');
        }
        setCookie(null, 'token', token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
    }

    const logout = () => {
        destroyCookie(null, 'token');
        setToken(null);
        setUser(null);
    }

    return <AuthContext.Provider value={{ loading, login, logout, token, user }}>
        {children}
    </AuthContext.Provider>
}