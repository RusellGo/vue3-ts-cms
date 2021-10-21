import { createStore, Store, useStore as useVuexStore } from 'vuex';

// 导入 createStore 泛型类型
import type { IRootState, IStoreType } from './types';

// 导入 Modules
import loginModule from './login/login';
import systemModule from './main/system/system';

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
    loginModule,
    systemModule
  }
});

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin');
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
