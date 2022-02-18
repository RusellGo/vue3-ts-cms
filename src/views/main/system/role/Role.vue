<template>
  <div class="role">
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
        :contentTableConfig="contentTableConfig"
        pageName="role"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      >
        <template #headerBtnTitle>新建角色</template>
      </page-content>
    </div>

    <div class="modal">
      <page-modal
        ref="pageModalRef"
        :defaultInfo="defaultInfo"
        :otherInfo="otherInfo"
        :modalConfig="modalConfig"
        pageName="role"
        title="新建角色"
      >
        <div class="menu-tree">
          <el-tree
            ref="elTreeRef"
            :data="menus"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheckChange"
          />
        </div>
      </page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import { mapMenuLeafKeys } from '@/utils/mapMenus';

import PageSearch from '@/components/page-search';
import searchFormConfig from './config/search.config';

import PageContent from '@/components/page-content';
import contentTableConfig from './config/content.config';

import PageModal from '@/components/page-modal';
import modalConfig from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';

import { ElTree } from 'element-plus';

export default defineComponent({
  name: 'Role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 处理PageSearch的hook
    const [pageContentRef, handleReset, handleQuery] = usePageSearch();

    // 处理PageModal
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallback = (item: any) => {
      const leafKeys = mapMenuLeafKeys(item.menuList);
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback);

    const store = useStore();
    const menus = computed(() => store.state.entireMenu);

    // 处理树结构菜单数据
    const otherInfo = ref({});
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedNodes = data2.checkedNodes;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedNodes, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      handleReset,
      handleQuery,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      elTreeRef,
      menus,
      otherInfo,
      handleCheckChange
    };
  }
});
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
