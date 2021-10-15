<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="foldClick"
    ></i>

    <div class="content">
      <div>面包屑</div>
      <div class="user-info">
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserInfo from './cpns/UserInfo.vue';

export default defineComponent({
  name: 'NavaHeader',
  components: {
    UserInfo
  },
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
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
