import { IForm } from '@/base-ui/form';

const searchFormConfig: IForm = {
  formItems: [
    {
      type: 'input',
      label: 'id',
      rules: [],
      placeholder: '输入id'
    },
    {
      type: 'input',
      label: '用户名',
      rules: [],
      placeholder: '输入用户名'
    },
    {
      type: 'password',
      label: '密码',
      rules: [],
      placeholder: '输入密码'
    },
    {
      type: 'select',
      label: '选择',
      rules: [],
      placeholder: '选择一项',
      options: [
        { label: 'vn', value: 'vn' },
        { label: 'kaisa', value: 'kaisa' }
      ]
    },
    {
      type: 'datepicker',
      label: '创建时间',
      rules: [],
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 30px'
  },
  colLayout: {
    span: 8
  }
};

export default searchFormConfig;
