require('dotenv').config();
import axios from 'axios';
import {getCookie} from 'cookies-next';
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    httpsAgent: new (require('https')).Agent({
        rejectUnauthorized: false, // Ignore SSL certificate validation errors
    }),
});
api.defaults.headers.common['Content-Type'] = "application/json"
api.defaults.headers.common['Accept'] = "application/json"

api.interceptors.request.use(async (config) => {
    const accessToken =  getCookie('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default api;