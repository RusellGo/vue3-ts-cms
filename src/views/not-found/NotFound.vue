<template>
  <div class="not-found">
    <h1 class="tip">404 Not Found</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFound',
  setup() {
    return {};
  }
});
</script>

<style scoped lang="less">
.not-found {
  width: 100%;
  height: 100%;

  .tip {
    text-align: center;
    margin: 200px auto;
  }
}
</style>
