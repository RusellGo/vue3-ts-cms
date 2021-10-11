<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- tabs 面板 -->
    <el-tabs type="border-card" v-model="currentTab" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <!-- 密码操作 -->
    <div class="password-control">
      <el-checkbox v-model="iskeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="loginHandleClick">
      登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import LoginAccount from './LoginAccount.vue';
import LoginPhone from './LoginPhone.vue';

export default defineComponent({
  name: 'LoginPanel',
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 是否记住密码
    const iskeepPassword = ref(true);

    // 获取子组件实例（最终使用的是子组件对象）
    // 泛型规定的是子组件实例的类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();

    // 记录 tabs 的选择
    const currentTab = ref('account');

    // 此处会调用子组件的登录函数
    const loginHandleClick = () => {
      // tabs 切换时选择登录方式
      if (currentTab.value === 'account') {
        accountRef.value?.loginByAccount(iskeepPassword.value);
      } else if (currentTab.value === 'phone') {
        phoneRef.value?.loginByPhone(iskeepPassword.value);
      }
    };

    return {
      iskeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      loginHandleClick
    };
  }
});
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;

  .title {
    text-align: center;
  }

  .password-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
