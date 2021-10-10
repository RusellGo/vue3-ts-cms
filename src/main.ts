import { createApp } from 'vue';

// 按需引入组件
import { registerApp } from './global';

// 初始化 全局css
import 'normalize.css';
import './assets/css/index.less';

// 导入实例化对象（封装的 axios 类）
import { rlRequest } from './service';

import App from './App.vue';

import router from './router';
import store from './store';

const app = createApp(App);

// 按需引入组件
registerApp(app);

app.use(router);
app.use(store);

app.mount('#app');

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}

rlRequest
  .request<DataType>({
    url: '/goods/list',
    method: 'POST'
  })
  .then((res) => {
    console.log(res);
  });

// rlRequest.request({
//   url: '/goods/list',
//   method: 'POST',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单个请求的拦截');
//       return config;
//     }
//   }
// });
