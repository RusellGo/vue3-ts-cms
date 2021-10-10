// 编写LoginAccount的校验规则
export const rules = {
  uname: [
    { required: true, message: '请输入用户名~', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或数字~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码~', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,16}$/,
      message: '密码必须是6-16个字母或数字~',
      trigger: 'change'
    }
  ]
};
