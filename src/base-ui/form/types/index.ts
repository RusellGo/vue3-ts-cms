type IFormType = 'input' | 'password' | 'select' | 'datepicker';

interface IFormOptions {
  label: string;
  value: any;
}

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: string;
  // 针对 select
  options?: IFormOptions[];
  // 针对特殊属性
  otherOptions?: any;
  isHidden?: boolean;
}

export interface IForm {
  title?: string;
  formItems: IFormItem[];
  labelWidth?: string;
  itemStyle?: any;
  colLayout?: any;
}
