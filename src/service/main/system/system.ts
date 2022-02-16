import { rlRequest } from '@/service';
import { IDataType } from '@/service/types';

export function getPageListData(url: string, queryInfo: any) {
  return rlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}

/**
 * 删除一行数据
 * @param url 请求地址 users/id
 * @returns 返回Promise结果
 */
export function deletePageData(url: string) {
  return rlRequest.delete<IDataType>({
    url
  });
}

/**
 * 新建一行数据
 * @param url
 * @param newData
 * @returns
 */
export function createPageData(url: string, newData: any) {
  return rlRequest.post<IDataType>({
    url,
    data: newData
  });
}

/**
 * 编辑一行数据
 * @param url
 * @param editData
 * @returns
 */
export function editPageData(url: string, editData: any) {
  return rlRequest.patch<IDataType>({
    url,
    data: editData
  });
}
