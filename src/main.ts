import { createApp } from 'vue';

// 按需引入组件
import { registerApp } from './global';

// 初始化 全局css
import 'normalize.css';
import './assets/css/index.less';

import App from './App.vue';

import router from './router';
import store, { setupStore } from './store';

const app = createApp(App);

// 按需引入组件
registerApp(app);

app.use(router);
app.use(store);
setupStore();

app.mount('#app');
