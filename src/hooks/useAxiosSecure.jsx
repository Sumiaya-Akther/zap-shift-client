import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {

    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const token = user?.accessToken
    //intercept requests
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`
        return config;
    });

    //response interceptor
    axiosSecure.interceptors.response.use(response => {
        return response;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error)
    });

    return axiosSecure;
};

export default useAxiosSecure;