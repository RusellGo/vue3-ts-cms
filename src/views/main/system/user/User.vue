<template>
  <div class="user">
    <div class="serch">
      <page-search :searchFormConfig="searchFormConfig" />
    </div>

    <div class="content">
      <page-content :contentTableConfig="contentTableConfig" pageName="user" />
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
  name: 'User',
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
