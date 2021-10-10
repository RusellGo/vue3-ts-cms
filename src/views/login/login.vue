<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import LoginPanel from './cpns/LoginPanel.vue';

export default defineComponent({
  name: 'Login',
  components: {
    LoginPanel
  },
  setup() {
    return {};
  }
});
</script>
<style scoped lang="less">
.login {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/img/login-bg.svg');
}
</style>
