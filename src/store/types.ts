import type { ILoginState } from './login/types';
import type { ISystemState } from './main/system/types';

// 根 store 的 state 的类型
export interface IRootState {
  entireDepartment: any[];
  entireRole: any[];
}

export interface IRootWithModule {
  loginModule: ILoginState;
  systemModule: ISystemState;
}

export type IStoreType = IRootState & IRootWithModule;
