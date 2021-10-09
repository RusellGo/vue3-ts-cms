import { App } from 'vue';

// 按需注册组件
import registerElement from './register-element';

export function registerApp(app: App): void {
  registerElement(app);
}
