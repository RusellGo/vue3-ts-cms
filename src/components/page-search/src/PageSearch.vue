<template>
  <div class="page-search">
    <ru-form v-bind="searchFormConfig" v-model="formData">
      <template v-slot:searchHeader>
        <h3 class="search-header">高级检索</h3>
      </template>
      <template v-slot:searchFooter>
        <div class="search-footer">
          <el-button
            icon="el-icon-refresh"
            size="small"
            @click="handleResetClick"
          >
            重置
          </el-button>
          <el-button type="primary" icon="el-icon-search" size="small">
            搜索
          </el-button>
        </div>
      </template>
    </ru-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import RuForm from '@/base-ui/form';
import type { IForm } from '@/base-ui/form';

export default defineComponent({
  name: 'PageSearch',
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  components: {
    RuForm
  },
  setup(props) {
    // 双向绑定的数据应该由配置文件中的 field 属性决定
    // 优化一：表单双向绑定根据配置文件决定
    const formItems = props.searchFormConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = '';
    }
    const formData = ref(formOriginData);

    // 数据重置
    const handleResetClick = () => {
      formData.value = formOriginData;
      console.log(formData.value);
    };

    return {
      formData,
      handleResetClick
    };
  }
});
</script>

<style scoped lang="less">
.search-header {
  color: red;
  letter-spacing: 30px;
}

.search-footer {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
