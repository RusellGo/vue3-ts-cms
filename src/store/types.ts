import type { ILoginState } from './login/types';
import type { ISystemState } from './main/system/types';
import type { IDashboardState } from './main/analysis/types';

// 根 store 的 state 的类型
export interface IRootState {
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

export interface IRootWithModule {
  loginModule: ILoginState;
  systemModule: ISystemState;
  dashboardModule: IDashboardState;
}

export type IStoreType = IRootState & IRootWithModule;
