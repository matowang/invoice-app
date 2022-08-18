import axios from "axios";

import { LoginValues } from "../user/LoginForm";
import { RegisterValues } from "../user/RegisterForm";

export type LoginReturnData = {
    user_id: string,
    email: string,
    name: string,
    token: string,
    companyDetails: {
        name: string
        address: string
        vatNumber: string
        regNumber: string
        iban?: string
        swift?: string
    }

}

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

const AuthAPI = {
    login,
    register
}

export default AuthAPI;