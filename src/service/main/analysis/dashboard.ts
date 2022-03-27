import { rlRequest } from '../../index';
import type { IDataType } from '../../types';

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

/**
 * 请求分类商品数量
 * @returns
 */
export function getCategoryGoodsCount() {
  return rlRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  });
}

/**
 * 请求分类商品销量
 * @returns
 */
export function getCategoryGoodsSale() {
  return rlRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  });
}

/**
 * 请求分类商品收藏
 * @returns
 */
export function getCategoryGoodsFavor() {
  return rlRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  });
}

/**
 * 请求地区商品销量
 * @returns
 */
export function getAddressGoodsSale() {
  return rlRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  });
}
