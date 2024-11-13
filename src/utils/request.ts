import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { useAppStore } from "@/store/appStore";

const instance = axios.create({
  timeout: 30 * 1000,
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    const appStore = useAppStore();
    const token = appStore.token.value;
    config.headers = {
      Authorization: `Bearer ${token}`,
      ...config.headers,
    } as unknown as AxiosRequestHeaders;
    config.headers.roleCode = appStore.activeRole.value.roleCode;
    config.headers.roleName = appStore.activeRole.value.roleName;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    if (
      res.data.code !== undefined &&
      res.data.code !== 0 &&
      res.data.code !== 200 &&
      !(res.config as AxiosRequestConfig & { skipErrorHandler?: boolean })
        .skipErrorHandler
    ) {
      return Promise.reject(res.data);
    }
    return Promise.resolve(res.data);
  },
  (error: AxiosError<{ code: number; message?: string; msg?: string }>) => {
    // const skipErrorHandler = (
    //   error.config as AxiosRequestConfig & { skipErrorHandler?: boolean }
    // ).skipErrorHandler;
    return Promise.reject(error);
  },
);

type Request = <T = unknown>(
  config: AxiosRequestConfig & { skipErrorHandler?: boolean },
) => Promise<T>;

export const request = instance.request as Request;
