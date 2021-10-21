<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="foldClick"
    ></i>

    <div class="content">
      <div>
        <ru-breadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div class="user-info">
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';

import UserInfo from './cpns/UserInfo.vue';
import RuBreadcrumb from '@/base-ui/breadcrumb';

// 工具函数 获取面包屑数据
import { pathMapBreadcrumbs } from '@/utils/mapMenus';

export default defineComponent({
  name: 'NavaHeader',
  components: {
    UserInfo,
    RuBreadcrumb
  },
  setup(props, context) {
    const isFold = ref(false);

    const foldClick = () => {
      isFold.value = !isFold.value;
      context.emit('changeFold', isFold.value);
    };

    // 面包屑数据 [{name: '', path: ''}]
    const breadcrumbs = computed(() => {
      // 获取用户菜单
      const store = useStore();
      const userMenus = store.state.loginModule.userMenus;

      // 获取当前路径
      const route = useRoute();
      const currentPath = route.path;

      // 返回面包屑数据
      return pathMapBreadcrumbs(userMenus, currentPath);
    });

    return {
      isFold,
      breadcrumbs,
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
