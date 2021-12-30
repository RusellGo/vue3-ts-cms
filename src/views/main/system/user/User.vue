<template>
  <div class="user">
    <div class="serch">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleReset"
        @queryBtnClick="handleQuery"
      />
    </div>

    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="users"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageSearch from '@/components/page-search';
import searchFormConfig from './config/search.config';

import PageContent from '@/components/page-content';
import contentTableConfig from './config/content.config';

// 引入封装的搜索、重置 hook
import { usePageSearch } from '@/hooks/usePageSearch';

export default defineComponent({
  name: 'User',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    // 搜索、重置 hook
    const [pageContentRef, handleReset, handleQuery] = usePageSearch();

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleReset,
      handleQuery
    };
  }
});
</script>

<style scoped lang="less"></style>
