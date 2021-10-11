import { createStore } from 'vuex';

// 导入 createStore 泛型类型
import { IRootState } from './types';

// 导入 Modules
import loginModule from './login/login';

// 使用 TypeScript 最好为 createStore 添加类型
const store = createStore<IRootState>({
  state() {
    return {
      name: 'vn'
    };
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginModule
  }
});

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin');
}

export default store;
