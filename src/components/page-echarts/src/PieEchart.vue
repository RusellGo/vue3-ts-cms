<template>
  <div class="pie-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import BaseEchart from '@/base-ui/echart/index';
import type { IDataType } from '../types/types';

const props = defineProps<{
  pieData: IDataType[];
}>();

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数量',
        type: 'pie',
        radius: '50%',
        data: props.pieData, // 动态数据
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
});
</script>

<style scoped></style>
