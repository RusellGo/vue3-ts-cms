<template>
  <div class="category">
    <div class="search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleReset"
        @queryBtnClick="handleQuery"
      ></page-search>
    </div>
    <div class="content">
      <page-content
        ref="pageContentRef"
        pageName="category"
        :contentTableConfig="contentTableConfig"
      >
        <template #headerBtnTitle>新建类别</template>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageSearch from '@/components/page-search';
import searchFormConfig from './config/search.config';

import PageContent from '@/components/page-content';
import contentTableConfig from './config/content.config';

import { usePageSearch } from '@/hooks/usePageSearch';

export default defineComponent({
  name: 'Category',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
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

<style scoped></style>
