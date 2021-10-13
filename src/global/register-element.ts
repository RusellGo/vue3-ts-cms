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
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu
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
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu
];

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
