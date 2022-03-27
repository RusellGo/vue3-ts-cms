<template>
  <div class="map-echart">
    <!-- 地图有问题 -->
    <!-- <base-echart :options="option"></base-echart> -->
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import BaseEchart from '@/base-ui/echart/index';
import type { IDataType } from '../types/types';

import { convertData } from '../utils/convert-data';

const props = defineProps<{
  mapData: IDataType[];
}>();

const option = computed(() => {
  return {
    backgroundColor: '#fff',
    title: {
      text: '全国销量统计',
      left: 'center',
      textStyle: {
        color: '#000'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2];
      }
    },
    visualMap: {
      min: 0,
      max: 100000,
      left: 0,
      bottom: 80,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: '#000'
      }
    },
    geo: {
      map: 'China',
      roam: 'scale',
      emphasis: {
        areaColor: '#f4cccc',
        borderColor: 'rgb(9, 54, 95)',
        itemStyle: {
          areaColor: '#f4cccc'
        }
      }
    },
    series: [
      {
        name: '销量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        type: 'map',
        map: 'China',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
  };
});
</script>

<style scoped></style>
