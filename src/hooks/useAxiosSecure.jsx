import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {

    const { user, logOut } = useAuth();
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
        if (error.status === 401 || error.status === 403) {
            logOut()
                .then(() => {
                    console.log('sign out for 401 status code')
                })
                .catch(err => {
                    console.log(err)
                })
        }

        return Promise.reject(error)
    });

    return axiosSecure;
};

export default useAxiosSecure;