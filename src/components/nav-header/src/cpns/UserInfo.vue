<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          :src="headPortrait"
          style="vertical-align: middle"
        ></el-avatar>
        &nbsp;
        <span>{{ userName }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon :size="16" style="vertical-align: middle">
              <user />
            </el-icon>
            用户信息
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon :size="16" style="vertical-align: middle">
              <setting />
            </el-icon>
            系统管理
          </el-dropdown-item>
          <el-dropdown-item divided @click="handleExitClick">
            <el-icon :size="16" style="vertical-align: middle">
              <circle-close />
            </el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import localCache from '@/utils/cache';

import { User, Setting, CircleClose } from '@element-plus/icons';

export default defineComponent({
  name: 'UserInfo',
  components: {
    User,
    Setting,
    CircleClose
  },
  setup() {
    const store = useStore();
    const userName = computed(() => store.state.loginModule.userInfo.name);
    const headPortrait =
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

    // 退出登录
    const router = useRouter();
    const handleExitClick = () => {
      localCache.deleteCache('token');
      router.push('/main');
    };

    return {
      userName,
      headPortrait,
      handleExitClick
    };
  }
});
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
