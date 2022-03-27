<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue';
// import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import useEchart from '../hooks/useEchart';

// 定义props（有默认值的写法）
const props = withDefaults(
  defineProps<{
    options: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    width: '100%',
    height: '360px'
  }
);

const echartDivRef = ref<HTMLElement>();

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!);
  // 数据改变
  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>

<style scoped></style>
