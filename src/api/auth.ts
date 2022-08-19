import axios from "axios";

import { LoginValues } from "../user/LoginForm";
import { RegisterValues } from "../user/RegisterForm";

export type CompanyDetails = {
    name: string
    address: string
    vatNumber: string
    regNumber: string
    iban?: string
    swift?: string
}

export type LoginReturnData = {
    user_id: string,
    email: string,
    name: string,
    token: string,
    companyDetails: CompanyDetails
}

export type UserDTO = {
    id: string
    name: string
    email: string
    password: string
    avatar?: string
    companyDetails?: CompanyDetails
};

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

if (!process.env.NEXT_PUBLIC_API_URL) throw new Error("No NEXT_PUBLIC_API_URL environment variable");

const login = async (loginValues: LoginValues) => {
    await new Promise(r => setTimeout(r, 2000));
    return await axiosInstance.post<LoginReturnData>(`/login`, loginValues);
}

const register = async (registerValues: RegisterValues) => {
    console.log(registerValues);
}

const validateToken = async (token: string): Promise<UserDTO | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            headers: {
                'x-access-token': token
            }
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err))
            return null;
        return null;
    }
}

const AuthAPI = {
    login,
    register,
    validateToken
}

export default AuthAPI;