<template>
  <div>
    <el-dialog
      v-model="centerDialogVisible"
      title="新建"
      width="30%"
      center
      destroy-on-close
    >
      <ru-form v-bind="modalConfig" v-model="formData"></ru-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

import RuForm from '@/base-ui/form';

export default defineComponent({
  name: 'PageModal',
  components: {
    RuForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const centerDialogVisible = ref(false);
    const formData = ref<any>({});

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );

    // 模态框确定
    const store = useStore();
    const handleConfirmClick = () => {
      centerDialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length > 0) {
        // 编辑
        store.dispatch('systemModule/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        });
      } else {
        // 新建
        store.dispatch('systemModule/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        });
      }
    };

    return {
      centerDialogVisible,
      formData,
      handleConfirmClick
    };
  }
});
</script>

<style scoped></style>
