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
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
        <template v-slot:headerBtnTitle>新建用户</template>
      </page-content>
    </div>

    <div class="modal">
      <page-modal
        :defaultInfo="defaultInfo"
        ref="pageModalRef"
        pageName="users"
        :modalConfig="modalConfigRef"
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
  name: 'User',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 搜索、重置 hook
    const [pageContentRef, handleReset, handleQuery] = usePageSearch();

    // pageModal 相关的hook逻辑
    // 1.新建和编辑时密码的显示与隐藏
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      );
      passwordItem!.isHidden = false;
    };
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      );
      passwordItem!.isHidden = true;
    };

    // 2.动态添加部门和角色列表
    const store = useStore();
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      );
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id };
      });

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return { label: item.name, value: item.id };
      });

      return modalConfig;
    });

    // 3.调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback);

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

<style scoped lang="less"></style>
