import axios, {AxiosRequestConfig} from "axios";
import {Toast} from '@douyinfe/semi-ui'
import {getLocalStorage, removeLocalStorage} from "@util/storage.tsx";
import {TOKEN, USER} from "@util/constant.tsx";

// 创建实例时配置默认值
const instance = axios.create({
    baseURL: '/api'
});

const getToken = () => {
    return getLocalStorage(TOKEN)
}

// 重写库的超时默认值
// 现在，所有使用此实例的请求都将等待2.5秒，然后才会超时
instance.defaults.timeout = 10_000;
instance.defaults.withCredentials = false;
instance.defaults.validateStatus = (status) => status >= 200 && status < 300;

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; //携带权限参数
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response.data;
    },
    error => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        Toast.error(error.response.data);
        if (error.response.status === 401) {
            removeLocalStorage(TOKEN)
            removeLocalStorage(USER)
            window.location.href = `/login${'?from=' + encodeURIComponent(location.pathname)}`
        }

        return Promise.reject(error);
    }
);


export const get = async (url: string, config?: AxiosRequestConfig<any>) => {
    return instance.get(url, {
        headers: {
            ...config?.headers
        },
        // `params` 是与请求一起发送的 URL 参数
        // 必须是一个简单对象或 URLSearchParams 对象
        params: config?.params,
    })
}

// POST 请求
export const post = async (url: string, data?: any, config?: AxiosRequestConfig<any>) => {
    return instance.post(url, data, {
        headers: {
            ...config?.headers
        },
        // `params` 是与请求一起发送的 URL 参数
        // 必须是一个简单对象或 URLSearchParams 对象
        params: config?.params,
    })
}
