import { App } from 'vue';

import { formatUTCString } from '@/utils/data-format';

// 添加全局属性
export default function registerProperties(app: App) {
  // 定义一个全局的过滤对象
  app.config.globalProperties.$filters = {
    formatTime(time: string) {
      return formatUTCString(time);
    }
  };
}
