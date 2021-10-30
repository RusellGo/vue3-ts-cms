import { App } from 'vue';

// 按需注册组件
import registerElement from './register-element';
// 注册自定义属性
import registerProperties from './register-properties';

export function registerApp(app: App): void {
  registerElement(app);
  // 两种方式效果一致
  app.use(registerProperties);
}
