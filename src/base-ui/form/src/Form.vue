<template>
  <div class="ru-form">
    <div class="searchHeader">
      <slot name="searchHeader"></slot>
    </div>

    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                  size="medium"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                  size="medium"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                  size="medium"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="searchFooter">
      <slot name="searchFooter"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import type { IFormItem } from '../types';

export default defineComponent({
  name: 'Form',
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      required: true
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // > 1920px 一列占6份 一行放4列
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  setup(props, context) {
    const formData = ref({ ...props.modelValue });

    watch(formData, (newValue) => context.emit('update:modelValue', newValue), {
      deep: true
    });

    return {
      formData
    };
  }
});
</script>

<style scoped lang="less">
.ru-form {
  padding-top: 22px;
}
</style>
