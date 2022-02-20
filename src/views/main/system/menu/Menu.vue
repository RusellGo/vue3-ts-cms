<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu">
      <template #headerBtnTitle>新建菜单</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageContent from '@/components/page-content';
import contentTableConfig from './config/content.config';

export default defineComponent({
  name: 'Menu',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    };
  }
});
</script>

<style scoped></style>
