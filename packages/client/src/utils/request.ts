import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { message } from "antd";
import { storeAuth } from "../hooks/useStoreAuth";

export const BASE_URL = "http://127.0.0.1:3000/api";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    if (storeAuth.token) {
      config.headers.Authorization = `Bearer ${storeAuth.token}`  
      
      // ` ${storeAuth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const data = response?.data;
    if (data.code == 200) {
      message.success(data.message);
    }
    return response.data;
  },
  (error) => {
    return Promise.reject({ data: error.response?.data });
  }
);
export default async function makeRequest(
  url: string,
  options?: AxiosRequestConfig
) {
  return await request({
    url,
    ...options,
  });
}
