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
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" maxlength="10" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" maxlength="16" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import store from '@/store';

import { ElForm } from 'element-plus';
// 导入编写好的校验规则
import { rules } from '../config/account-config';
// 缓存 工具函数
import localCache from '@/utils/cache';

export default defineComponent({
  name: 'LoginAccount',
  setup() {
    // form 表单数据
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    });

    // 获取表单实例
    const accountForm = ref<InstanceType<typeof ElForm>>();

    // 该组件的登录函数
    const loginByAccount = (iskeepPassword: boolean) => {
      // 表单验证是否通过
      accountForm.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否记住密码
          if (iskeepPassword) {
            // 账号、密码 进行本地缓存
            localCache.setCache('name', account.name);
            localCache.setCache('password', account.password);
          } else {
            // 账号、密码 清除本地缓存
            localCache.deleteCache('name');
            localCache.deleteCache('password');
          }

          // 通过 vuex 来发送请求 因为要将一些请求到的状态保存起来
          store.dispatch('loginModule/accountLoginAction', {
            name: account.name,
            password: account.password
          });
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
