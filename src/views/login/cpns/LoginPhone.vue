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
      <el-form-item label="账号" prop="phoneNumber">
        <el-input v-model="phone.phoneNumber" maxlength="13" />
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
import { ElForm } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';

// 导入编写好的校验规则
import { rules } from '../config/phone-config';

export default defineComponent({
  name: 'LoginPhone',
  setup() {
    const phone = reactive({
      phoneNum: '',
      verificationCode: ''
    });

    const phoneForm = ref<InstanceType<typeof ElForm>>();

    const loginByPhone = () => {
      phoneForm.value?.validate((valid) => {
        if (valid) {
          console.log('登录逻辑');
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
