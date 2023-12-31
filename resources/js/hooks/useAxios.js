import axios from "axios"
import {useEffect} from "react"
import {getSessionToken} from "@shopify/app-bridge/utilities"
import {useAppBridge, useNavigate} from "@shopify/app-bridge-react";

const useAxios = () => {
    const app = useAppBridge()
    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        const interceptor = axios.interceptors.request.use(config => {
            return getSessionToken(app).then(token => {
                config.headers.Authorization = `Bearer ${token}`;
                config.params = {...config.params, host: window.__SHOPIFY_HOST}

                return config;
            });
        });

        const responseInterceptor = axios.interceptors.response.use(res => res, error => {
            if (error.response.status === 403 && error.response?.data?.forceRedirectUrl) {
                navigate(error.response.data.forceRedirectUrl)
            }

            return Promise.reject(error);
        })

        return () => {
            axios.interceptors.request.eject(interceptor);
            axios.interceptors.request.eject(responseInterceptor);
        }
    }, [])

    return {axios}
}

export default useAxios
