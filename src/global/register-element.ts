import { App } from 'vue';

import 'element-plus/theme-chalk/index.css';
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElAlert,
  ElIcon,
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
  ElSubMenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElSelect,
  ElDatePicker,
  ElOption,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog
} from 'element-plus';

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElAlert,
  ElIcon,
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
  ElSubMenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog
];

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
