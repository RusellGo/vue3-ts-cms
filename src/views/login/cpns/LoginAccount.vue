<template>
  <div class="login-account">
    <el-form
      label-width="65px"
      :model="account"
      :rules="rules"
      ref="accountForm"
      status-icon
    >
      <!-- prop 属性用于校验规则找到对应的目标 -->
      <el-form-item label="账号" prop="uname">
        <el-input v-model="account.uname" maxlength="10" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" maxlength="16" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';

// 导入编写好的校验规则
import { rules } from '../config/account-config';

export default defineComponent({
  name: 'LoginAccount',
  setup() {
    // form 表单数据
    const account = reactive({
      uname: '',
      password: ''
    });

    // 获取表单实例
    const accountForm = ref<InstanceType<typeof ElForm>>();

    // 该组件的登录方式
    const loginByAccount = () => {
      // 表单验证是否通过
      accountForm.value?.validate((valid) => {
        if (valid) {
          console.log('真正的登录逻辑');
        }
      });
    };

    return {
      account,
      rules,
      accountForm,
      loginByAccount
    };
  }
});
</script>

<style scoped></style>
