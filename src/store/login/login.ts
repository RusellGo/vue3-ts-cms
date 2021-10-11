import { Module } from 'vuex';
import router from '@/router';

// 导入 Module 类型的泛型类型
import { ILoginState } from './types';
import { IRootState } from '../types';

// 导入 action 函数参数的类型约束
import { IAccountInfo } from '@/service/login/types';

// 网络请求
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login';

// 缓存 工具函数
import localCache from '@/utils/cache';

// 定义 loginModule
// Module 类型要传入两个泛型类型 <S(当前模块state的类型), R(根模块的类型)>
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
    }
  },
  actions: {
    async accountLoginAction(context, payload: IAccountInfo) {
      // 1.登录请求用户 token id
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      context.commit('changeToken', token);
      localCache.setCache('token', token);

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      context.commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      context.commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);

      // 4.跳转到首页
      router.push('/main');
    },
    phoneLoginAction(context, payload: any) {
      console.log('电话登录网络请求', payload);
    },
    // 刷新时读取缓存数据到 state
    loadLocalLogin(context) {
      const token = localCache.getCache('token');
      const userInfo = localCache.getCache('userInfo');
      const userMenus = localCache.getCache('userMenus');

      if (token) {
        context.commit('changeToken', token);
      }
      if (userInfo) {
        context.commit('changeUserInfo', userInfo);
      }
      if (userMenus) {
        context.commit('changeUserMenus', userMenus);
      }
    }
  }
};

export default loginModule;
