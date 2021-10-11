// 将 axios 的相关操作封装成一个类

import axios from 'axios';
// 对于使用 axios.create(config) 创建的实例 instance，axios 有自己的类型
// 而在创建实例时传递的参数 config 同样规定了自己的类型
import type { AxiosInstance } from 'axios';
import { RLRequestInterceptors, RLRequestConfig } from './type';

import { ElLoading } from 'element-plus';
import type { ILoadingInstance } from 'element-plus';

class RLRequest {
  private isntance: AxiosInstance; // axios 规定了实例类型
  private interceptors?: RLRequestInterceptors; // 存放实例化对象时传入的 拦截器
  private showLoading: boolean;
  private loading?: ILoadingInstance;

  // 继承并扩展了 axios 原有的类型
  constructor(config: RLRequestConfig) {
    this.isntance = axios.create(config);
    this.interceptors = config.interceptors;
    // 默认加载 loading
    this.showLoading = config.showLoading ?? true;

    // 如果在实例化时就传入了 自定义拦截器
    // 那么会在此处初始化 实例的专属拦截器
    // 请求拦截
    this.isntance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    // 响应拦截
    this.isntance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 所有实例都有的拦截器
    this.isntance.interceptors.request.use(
      (config) => {
        // 发送请求时 给定全局loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求...',
            background: 'rgba(80, 80, 80, 0.5)'
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.isntance.interceptors.response.use(
      (res) => {
        // 将 loading 移除
        this.loading?.close();

        const data = res.data;
        // 根据返回码 显示错误信息
        // if (data.code === '-1001') {
        //   console.log('请求错误');
        // } else {
        //   return data;
        // }
        return data;
      },
      (err) => {
        // 将 loading 移除
        this.loading?.close();

        // 根据不同的 HttpErrorCode 显示不同错误信息
        if (err.response.status === 401) {
          console.log('401错误');
        }
        return err;
      }
    );
  }

  // 封装的请求方法
  // 单独的请求也可以传入拦截器
  request<T>(config: RLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求是否有拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.单个请求是否需要加载 loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      // 3.网络请求
      this.isntance
        .request<any, T>(config)
        .then((res) => {
          // 4.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          // 设置为 true 不影响后续请求 loading
          this.showLoading = true;

          resolve(res);
        })
        .catch((err) => {
          // 设置为 true 不影响后续请求 loading
          this.showLoading = true;
          reject(err);
        });
    });
  }

  get<T>(config: RLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T>(config: RLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T>(config: RLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T>(config: RLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default RLRequest;
