import { Module } from 'vuex';
import type { ISystemState } from './types';
import type { IRootState } from '@/store/types';

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodList: [],
      goodCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userList;
          case 'role':
            return state.roleList;
          case 'goods':
            return state.goodList;
          case 'menu':
            return state.menuList;
        }
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userCount;
          case 'role':
            return state.roleCount;
          case 'goods':
            return state.goodCount;
          case 'menu':
            return state.menuCount;
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
    },
    changeGoodList(state, goodList: any[]) {
      state.goodList = goodList;
    },
    changeGoodCount(state, goodCount: number) {
      state.goodCount = goodCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    }
  },
  actions: {
    async getPageListAction(context, payload: any) {
      let pageUrl = '';
      const pageName = payload.pageName;

      switch (pageName) {
        case 'users':
          pageUrl = `/users/list`;
          break;
        case 'role':
          pageUrl = `/role/list`;
          break;
        case 'goods':
          pageUrl = `/goods/list`;
          break;
        case 'menu':
          pageUrl = `/menu/list`;
          break;
      }

      const pageRuselt = await getPageListData(pageUrl, payload.queryInfo);
      const { list, totalCount } = pageRuselt.data;
      switch (pageName) {
        case 'users':
          context.commit('changeUserList', list);
          context.commit('changeUserCount', totalCount);
          break;
        case 'role':
          context.commit('changeRoleList', list);
          context.commit('changeRoleCount', totalCount);
          break;
        case 'goods':
          context.commit('changeGoodList', list);
          context.commit('changeGoodCount', totalCount);
          break;
        case 'menu':
          context.commit('changeMenuList', list);
          context.commit('changeMenuCount', totalCount);
          break;
      }
    },

    async deletePageDataAction(context, payload: any) {
      // 1.获取pageName和id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      // 2.调用删除网络请求
      await deletePageData(pageUrl);

      // 3.重新请求最新的数据
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },

    async createPageDataAction(context, playload: any) {
      const { pageName, newData } = playload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);

      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },

    async editPageDataAction(context, playload: any) {
      const { pageName, editData, id } = playload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);

      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  },
  modules: {}
};

export default systemModule;
