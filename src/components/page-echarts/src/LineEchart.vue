<template>
  <div class="line-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults, defineProps } from 'vue';
import BaseEchart from '@/base-ui/echart/index';

const props = withDefaults(
  defineProps<{
    title?: string;
    xLabels: string[];
    value: any[];
  }>(),
  {
    title: ''
  }
);

const option = computed(() => {
  return {
    title: {
      text: props.title // 动态标题
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLabels // 动态数据
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '销量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.value // 动态数据
      }
    ]
  };
});
</script>

<style scoped></style>
