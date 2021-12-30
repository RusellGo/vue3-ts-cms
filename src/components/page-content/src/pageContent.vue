<template>
  <div class="page-content">
    <ru-table
      :listData="listData"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="small">
          新建用户
        </el-button>
      </template>

      <!-- 表格列插槽 -->
      <template v-slot:status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? '启用' : '禁用' }}
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
          <el-button
            v-if="isUpdate"
            type="text"
            size="mini"
            icon="el-icon-edit"
          >
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            type="text"
            size="mini"
            icon="el-icon-delete"
          >
            删除
          </el-button>
        </div>
      </template>

      <!-- 在此处动态插入剩余插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ru-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from '@/store';

import RuTable from '@/base-ui/table';

// 获取权限 hook
import { usePermission } from '@/hooks/usePermission';

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
    const store = useStore();

    // 获取操作权限
    const isCreate = usePermission(props.pageName, 'create');
    const isUpdate = usePermission(props.pageName, 'update');
    const isDelete = usePermission(props.pageName, 'delete');
    const isQuery = usePermission(props.pageName, 'query');

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => getPageData());

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      // 没权限不请求
      if (!isQuery) return;
      store.dispatch('systemModule/getPageListAction', {
        // pageUrl: '/users/list',
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    getPageData();

    // 从vuex获取数据
    const listData = computed(() =>
      store.getters['systemModule/pageListData'](props.pageName)
    );
    //
    const dataCount = computed(() =>
      store.getters['systemModule/pageListCount'](props.pageName)
    );

    // 获取其他的动态插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName == 'status') return false;
        if (item.slotName == 'createAt') return false;
        if (item.slotName == 'updateAt') return false;
        if (item.slotName == 'handler') return false;
        return true;
      }
    );

    return {
      listData,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete
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
