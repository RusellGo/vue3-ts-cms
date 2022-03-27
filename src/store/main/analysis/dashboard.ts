import { Module } from 'vuex';

import type { IDashboardState } from './types';
import type { IRootState } from '@/store/types';

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard';

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    };
  },
  getters: {},
  mutations: {
    changeCategoryGoodsCount(state, list: any[]) {
      state.categoryGoodsCount = list;
    },
    changeCategoryGoodsSale(state, list: any[]) {
      state.categoryGoodsSale = list;
    },
    changeCategoryGoodsFavor(state, list: any[]) {
      state.categoryGoodsFavor = list;
    },
    changeAddressGoodsSale(state, list: any[]) {
      state.addressGoodsSale = list;
    }
  },
  actions: {
    async getDashboardDataAction(context) {
      const categoryGoodsCountResult = await getCategoryGoodsCount();
      context.commit('changeCategoryGoodsCount', categoryGoodsCountResult.data);

      const categoryGoodsSaleResult = await getCategoryGoodsSale();
      context.commit('changeCategoryGoodsSale', categoryGoodsSaleResult.data);

      const categoryGoodsFavorResult = await getCategoryGoodsFavor();
      context.commit('changeCategoryGoodsFavor', categoryGoodsFavorResult.data);

      const addressGoodsSaleResult = await getAddressGoodsSale();
      context.commit('changeAddressGoodsSale', addressGoodsSaleResult.data);
    }
  }
};

export default dashboardModule;
