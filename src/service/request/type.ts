import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// interceptors 的类型
export interface RLRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (config: any) => any;
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (config: any) => any;
}
// 这个接口就是扩展 axios 原有的类型约束接口 AxiosRequestConfig
// 让开发者在实例化对象时或传递请求参数时根据需要传入 拦截器
export interface RLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RLRequestInterceptors<T>;
  showLoading?: boolean;
}
