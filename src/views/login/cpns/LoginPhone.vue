<template>
  <div class="login-phone">
    <el-form
      label-width="65px"
      :model="phone"
      :rules="rules"
      ref="phoneForm"
      status-icon
    >
      <!-- prop 属性用于校验规则找到对应的目标 -->
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="phone.phoneNumber" minlength="11" maxlength="11" />
      </el-form-item>

      <el-form-item label="验证码" prop="verificationCode">
        <div class="get-code">
          <el-input v-model="phone.verificationCode" maxlength="6" />
          <el-button type="primary" class="get-code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import store from '@/store';

import { ElForm } from 'element-plus';
// 导入编写好的校验规则
import { rules } from '../config/phone-config';
// 缓存 工具函数
import localCache from '@/utils/cache';

export default defineComponent({
  name: 'LoginPhone',
  setup() {
    // 表单数据
    const phone = reactive({
      phoneNumber: localCache.getCache('phoneNumber') ?? '',
      verificationCode: ''
    });

    // 获取表单实例
    const phoneForm = ref<InstanceType<typeof ElForm>>();

    // 该组件的登录函数
    const loginByPhone = (iskeepPassword: boolean) => {
      // 校验是否通过
      phoneForm.value?.validate((valid) => {
        if (valid) {
          // 是否记住账号
          if (iskeepPassword) {
            localCache.setCache('phoneNumber', phone.phoneNumber);
          } else {
            localCache.deleteCache('phoneNumber');
          }

          store.dispatch('loginModule/phoneLoginAction', { ...phone });
        }
      });
    };

    return {
      phone,
      rules,
      phoneForm,
      loginByPhone
    };
  }
});
</script>

<style scoped lang="less">
.get-code {
  display: flex;

  .get-code-btn {
    margin-left: 8px;
  }
}
</style>
