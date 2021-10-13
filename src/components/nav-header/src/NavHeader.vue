<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="foldClick"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NavaHeader',
  setup(props, context) {
    const isFold = ref(false);

    const foldClick = () => {
      isFold.value = !isFold.value;
      context.emit('changeFold', isFold.value);
    };

    return {
      isFold,
      foldClick
    };
  },
  emits: ['changeFold']
});
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
