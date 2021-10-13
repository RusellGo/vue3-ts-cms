import { ILoginState } from './login/types';

// 根 store 的 state 的类型
export interface IRootState {
  name: string;
}

export interface IRootWithModule {
  loginModule: ILoginState;
}

export type IStoreType = IRootState & IRootWithModule;
