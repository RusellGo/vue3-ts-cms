// 作为 service 的统一出口

// 导入封装好的类
import RLRequest from './request';
import { BASE_URL, TIMEOUT } from './request/config';

// 创建一个类实例对象并导出
export const rlRequest = new RLRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  // 此处的 interceptors 属性是扩展的属性（可选类型）
  interceptors: {
    requestInterceptor: (config) => {
      const token = '';
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log('请求成功的拦截');
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截');
      return err;
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截');
      return res;
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截');
      return err;
    }
  }
});

// 如果有多个根地址，那么就可以创建多个实例对象
