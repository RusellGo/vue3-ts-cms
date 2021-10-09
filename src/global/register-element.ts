import { App } from 'vue';

import 'element-plus/theme-chalk/index.css';
import { ElButton, ElForm, ElAlert, ElCalendar } from 'element-plus';

const components = [ElButton, ElForm, ElAlert, ElCalendar];

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
