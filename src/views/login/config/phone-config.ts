// 编写LoginPhone的校验规则
export const rules = {
  phoneNumber: [
    { required: true, message: '请输入手机号~', trriger: 'blur' },
    {
      pattern:
        /^1(3[0-9]|4[01456789]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
      message: '手机号不符合规则~',
      trigger: 'blur'
    }
  ],
  verificationCode: [
    { required: true, message: '请输入验证码~', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6}$/,
      message: '验证码必须是6个字母或数字的组合~',
      trigger: 'blur'
    }
  ]
};
