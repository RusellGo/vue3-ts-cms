import { Module } from 'vuex';
import type { ISystemState } from './types';
import type { IRootState } from '@/store/types';

import { getPageListData } from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    };
  },
  getters: {},
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList;
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount;
    }
  },
  actions: {
    async getPageListAction(context, payload: any) {
      const pageRuselt = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      );
      const { list, totalCount } = pageRuselt.data;
      context.commit('changeUserList', list);
      context.commit('changeUserCount', totalCount);
    }
  },
  modules: {}
};

export default systemModule;
