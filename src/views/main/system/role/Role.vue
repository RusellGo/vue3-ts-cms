<template>
  <div class="role">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>

    <div class="content">
      <page-content :contentTableConfig="contentTableConfig" pageName="role" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageSearch from '@/components/page-search';
import searchFormConfig from './config/search.config';

import PageContent from '@/components/page-content';
import contentTableConfig from './config/content.config';

export default defineComponent({
  name: 'Role',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    };
  }
});
</script>

<style scoped lang="less"></style>
