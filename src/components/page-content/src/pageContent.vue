<template>
  <div class="page-content">
    <ru-table :listData="listData" v-bind="contentTableConfig">
      <!-- header插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="small">新建用户</el-button>
      </template>

      <!-- 表格列插槽 -->
      <template v-slot:status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template v-slot:createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template v-slot:updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handler-btns">
          <el-button type="text" size="mini" icon="el-icon-edit">
            编辑
          </el-button>
          <el-button type="text" size="mini" icon="el-icon-delete">
            删除
          </el-button>
        </div>
      </template>
    </ru-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

import RuTable from '@/base-ui/table';

export default defineComponent({
  name: 'PageContent',
  components: {
    RuTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(props.pageName);
    const store = useStore();
    store.dispatch('systemModule/getPageListAction', {
      // pageUrl: '/users/list',
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    });

    const listData = computed(() =>
      store.getters['systemModule/pageListData'](props.pageName)
    );
    // const userCount = computed(() => store.state.systemModule.userCount);

    return {
      listData
    };
  }
});
</script>

<style scoped lang="less">
.page-content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
</style>
