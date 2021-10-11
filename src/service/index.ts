// 作为 service 的统一出口

// 导入封装好的类
import RLRequest from './request';
import { BASE_URL, TIMEOUT } from './request/config';

import localCache from '@/utils/cache';

// 创建一个类实例对象并导出
export const rlRequest = new RLRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  // 此处的 interceptors 属性是扩展的属性（可选类型）
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    }
  }
});

// 如果有多个根地址，那么就可以创建多个实例对象
