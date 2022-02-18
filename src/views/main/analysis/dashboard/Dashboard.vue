<template>
  <div>
    <div ref="domRef" :style="{ width: '600px', height: '400px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import * as echarts from 'echarts';

export default defineComponent({
  name: 'Dashboard',
  setup() {
    // echearts的绘制位置
    const domRef = ref<HTMLElement>();
    onMounted(() => {
      // 1.创建echarts的实例
      // - canvas更适合绘制图形元素数量非常大的图表（一般是由于数据量大），也利于实现某些视觉特效
      // - svg在不少场景中具有重要优势，它的内存占用更低（这对移动端尤其重要），渲染性能略高，使用浏览器内置的缩放功能时不会模糊
      const echartsInstance = echarts.init(domRef.value!, 'light', {
        renderer: 'svg'
      });
      // 2.编写配置文件
      const options = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'shadow'
            type: 'cross'
          }
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 3.设置配置，并且开始绘制
      echartsInstance.setOption(options);
    });
    return {
      domRef
    };
  }
});
</script>

<style scoped></style>
