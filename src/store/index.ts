import { createStore, Store, useStore as useVuexStore } from 'vuex';

import { getPageListData } from '@/service/main/system/system';

// 导入 createStore 泛型类型
import type { IRootState, IStoreType } from './types';

// 导入 Modules
import loginModule from './login/login';
import systemModule from './main/system/system';

// 使用 TypeScript 最好为 createStore 添加类型
const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: []
    };
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    }
  },
  actions: {
    async getInitialDataAction(context) {
      // 1.请求部门和角色数据
      // 部门
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      });
      const { list: departmentList } = departmentResult.data;
      // 角色
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      });
      const { list: roleList } = roleResult.data;

      // 2.保存数据
      context.commit('changeEntireDepartment', departmentList);
      context.commit('changeEntireRole', roleList);
    }
  },
  modules: {
    loginModule,
    systemModule
  }
});

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin');
  store.dispatch('getInitialDataAction');
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
