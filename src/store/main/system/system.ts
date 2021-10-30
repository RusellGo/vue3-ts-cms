import { Module } from 'vuex';
import type { ISystemState } from './types';
import type { IRootState } from '@/store/types';

import { getPageListData } from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.userList;
          case 'role':
            return state.roleList;
        }
      };
    },
    pageCountData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.userCount;
          case 'role':
            return state.roleCount;
        }
      };
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList;
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    }
  },
  actions: {
    async getPageListAction(context, payload: any) {
      let pageUrl = '';
      const pageName = payload.pageName;

      switch (pageName) {
        case 'user':
          pageUrl = `/users/list`;
          break;
        case 'role':
          pageUrl = `/role/list`;
          break;
      }

      const pageRuselt = await getPageListData(pageUrl, payload.queryInfo);
      console.log(pageRuselt);
      const { list, totalCount } = pageRuselt.data;
      switch (pageName) {
        case 'user':
          context.commit('changeUserList', list);
          context.commit('changeUserCount', totalCount);
          break;
        case 'role':
          context.commit('changeRoleList', list);
          context.commit('changeRoleCount', totalCount);
          break;
      }
    }
  },
  modules: {}
};

export default systemModule;
