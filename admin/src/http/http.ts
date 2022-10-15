import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { message } from "antd";

interface ResponseResult {
    code: number;
    data: any;
    msg: string;
}

const instance = axios.create({
    baseURL: "/api",
    withCredentials: true,
});
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers && (config.headers.Authorization = `Bearer ${token}`);
    }
    return config;
});
instance.interceptors.response.use(
    (response: AxiosResponse<ResponseResult>) => {
        if (response.status === 200 || response.status === 201) {
            if (response.data.code === 401) {
                message.error("未登录或登录过期");
                return Promise.reject();
            }
            if (response.data.code !== 200) {
                message.error(response.data.msg || "未知错误");
                return Promise.reject();
            }
            return response.data.data;
        } else {
            message.error(response.data.msg);
            return Promise.reject();
        }
    }
);

const http = {
    get: <T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> => {
        return instance.get(url, config);
    },

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        return instance.delete(url, config);
    },

    post: <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        return instance.post(url, data, config);
    },

    put: <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        return instance.put(url, data, config);
    },

    patch: <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        return instance.patch(url, data, config);
    },
};

export default http;
