<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="log" />
      <span v-if="!isCollapse" class="title">Vue3+TS</span>
    </div>

    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="isCollapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="menu in userMenus" :key="menu.id">
        <template v-if="menu.type === 1">
          <template v-if="menu.children">
            <el-sub-menu :index="menu.id + ''">
              <template v-slot:title>
                <i v-if="menu.icon" :class="menu.icon"></i>
                <span>{{ menu.name }}</span>
              </template>

              <template v-for="subMenu in menu.children" :key="subMenu.id">
                <el-menu-item
                  :index="subMenu.id + ''"
                  @click="handleSubMenuRoute(subMenu)"
                >
                  <i v-if="subMenu.icon" :class="subMenu.icon"></i>
                  <span>{{ subMenu.name }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>

          <template v-else>
            <el-menu-item :index="menu.id + ''">
              <i v-if="menu.icon" :class="menu.icon"></i>
              <span>{{ menu.name }}</span>
            </el-menu-item>
          </template>
        </template>

        <template v-else-if="menu.type === 2">
          <el-menu-item :index="menu.id + ''">
            <i v-if="menu.icon" :class="menu.icon"></i>
            <span>{{ menu.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from '@/store/index';
import { useRouter, useRoute } from 'vue-router';

// 工具函数
import { pathMapToMenu } from '@/utils/mapMenus';

export default defineComponent({
  name: 'NavMenu',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // store
    const store = useStore();
    const userMenus = computed(() => store.state.loginModule.userMenus);

    // router
    const router = useRouter();
    const route = useRoute();
    const currentPath = route.path;

    // 获取当前路径的菜单对象
    const currentMenu = pathMapToMenu(userMenus.value, currentPath);
    const defaultActive = ref(currentMenu.id + '');

    const handleSubMenuRoute = (subMenu: any) => {
      router.push({
        path: subMenu.url ?? '/not-found'
      });
    };

    return {
      userMenus,
      defaultActive,
      handleSubMenuRoute
    };
  }
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
  }

  .el-menu {
    background-color: #001529 !important;
    border-right: 0;

    .el-sub-menu {
      .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135;
      }
    }
  }

  :deep(.el-sub-menu__title) {
    background-color: #001529 !important;
  }

  .el-menu-item:hover {
    color: #fff !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collpase) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
