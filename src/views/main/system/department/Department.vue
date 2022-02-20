<template>
  <div class="department">
    <div class="search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleReset"
        @queryBtnClick="handleQuery"
      ></page-search>
    </div>
    <div class="content">
      <page-content
        pageName="department"
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
        <template #headerBtnTitle>新建部门</template>
      </page-content>
    </div>
    <div class="modal">
      <page-modal
        ref="pageModalRef"
        :defaultInfo="defaultInfo"
        :modalConfig="modalConfigRef"
        pageName="department"
      ></page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

import PageSearch from '@/components/page-search';
import searchFormConfig from './config/search.config';

import PageContent from '@/components/page-content';
import contentTableConfig from './config/content.config';

import PageModal from '@/components/page-modal';
import modalConfig from './config/modal.config';

// 引入封装的搜索、重置 hook
import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';

export default defineComponent({
  name: 'Department',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleReset, handleQuery] = usePageSearch();

    // modal配置信息
    const store = useStore();
    const modalConfigRef = computed(() => {
      const parentIdItem = modalConfig.formItems?.find(
        (item) => item.field === 'parentId'
      );
      parentIdItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id };
      });
      return modalConfig;
    });

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal();

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageContentRef,
      handleReset,
      handleQuery,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    };
  }
});
</script>

<style scoped></style>
