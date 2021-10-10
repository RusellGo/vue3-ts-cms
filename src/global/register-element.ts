import { App } from 'vue';

import 'element-plus/theme-chalk/index.css';
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElAlert,
  ElTabs,
  ElTabPane,
  ElInput,
  ElCheckbox,
  ElLink
  // ElIcon,
  // ElAvatar
} from 'element-plus';

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElAlert,
  ElTabs,
  ElTabPane,
  ElInput,
  ElCheckbox,
  ElLink
  // ElIcon,
  // ElAvatar
];

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
