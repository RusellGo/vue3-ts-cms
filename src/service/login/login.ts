// 导入创建好的 axios 实例
import { rlRequest } from '../index';
// 限制参数类型
import { IAccountInfo, ILoginResult } from './types';
import { IDataType } from '../types';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // /users/1
  UserMenus = '/role/' // /role/1/menu
}

export function accountLoginRequest(accountInfo: IAccountInfo) {
  return rlRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: accountInfo
  });
}

export function requestUserInfoById(id: number) {
  return rlRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  });
}

export function requestUserMenusByRoleId(roleId: number) {
  return rlRequest.get<IDataType>({
    url: LoginAPI.UserMenus + roleId + '/menu',
    showLoading: false
  });
}
