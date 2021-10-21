<template>
  <div class="page-search">
    <ru-form v-bind="searchFormConfig" v-model="formData">
      <template v-slot:searchHeader>
        <h3 class="search-header">高级检索</h3>
      </template>
      <template v-slot:searchFooter>
        <div class="search-footer">
          <el-button icon="el-icon-refresh" size="small">重置</el-button>
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
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      choice: '',
      createTime: ''
    });

    return {
      formData
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
