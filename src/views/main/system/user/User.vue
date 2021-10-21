<template>
  <div class="user">
    <div class="serch">
      <page-search :searchFormConfig="searchFormConfig" />
    </div>

    <div class="content">
      <ru-table :listData="userList" :propList="propList">
        <template v-slot:status="scope">
          <el-button
            size="small"
            :type="scope.row.enable ? 'success' : 'danger'"
          >
            {{ scope.row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>
        <template v-slot:createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
        <template v-slot:updateAt="scope">
          <strong>{{ scope.row.updateAt }}</strong>
        </template>
      </ru-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

import PageSearch from '@/components/page-search';
import searchFormConfig from './config/search.config';

import RuTable from '@/base-ui/table';

export default defineComponent({
  name: 'User',
  components: {
    PageSearch,
    RuTable
  },
  setup() {
    const store = useStore();
    store.dispatch('systemModule/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    });

    const userList = computed(() => store.state.systemModule.userList);
    const userCount = computed(() => store.state.systemModule.userCount);
    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '电话号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '200',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '修改时间',
        minWidth: '200',
        slotName: 'updateAt'
      }
    ];

    return {
      searchFormConfig,
      userList,
      propList
    };
  }
});
</script>

<style scoped lang="less">
.content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
</style>
