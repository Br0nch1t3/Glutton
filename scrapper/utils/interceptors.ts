import axios, { InternalAxiosRequestConfig } from "axios";
import dayjs from "dayjs";

export function useInterceptors() {
  axios.interceptors.request.use(timeDateInterceptor);
}

const timeDateInterceptor = (
  config: InternalAxiosRequestConfig<any>,
): InternalAxiosRequestConfig<any> => ({
  ...config,
  params: {
    ...config.params,
    timestamp: config.params?.timestamp ?? dayjs().format(),
  },
});
