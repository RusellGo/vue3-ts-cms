type IFormType = 'input' | 'password' | 'select' | 'datepicker';

interface IFormOptions {
  label: string;
  value: any;
}

export interface IFormItem {
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: string;
  // 针对 select
  options?: IFormOptions[];
  // 针对特殊属性
  otherOptions?: any;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  itemStyle: any;
  colLayout: any;
}
