import axios from "axios";

import { parseCookies } from 'nookies'

const dbInstance = axios.create({
    baseURL: 'http://localhost:3139',
    headers: { 'x-access-token': '555' }
});

dbInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { token } = parseCookies();
    console.log(token);
    config = {
        ...config,
        headers: {
            ...config.headers,
            'x-access-token': token
        }
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


export const getClients = async () => {
    const { data } = await dbInstance.get('/clients');
    return data;
}

export const getInvoices = async () => {
    const res = await dbInstance.get('/invoices?limit=10');
    return res;
}
