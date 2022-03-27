<template>
  <div class="rose-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import BaseEchart from '@/base-ui/echart/index';
import type { IDataType } from '../types/types';

const props = defineProps<{
  roseData: IDataType[];
}>();

const option = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '分类数量',
        type: 'pie',
        radius: [10, 80],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData // 动态数据
      }
    ]
  };
});
</script>

<style scoped></style>
