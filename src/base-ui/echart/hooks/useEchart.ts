import * as echarts from 'echarts';
// 中国地图数据
import ChinaMapData from '../data/china.json';
// 注册地图
echarts.registerMap('China', ChinaMapData);

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el, 'light', { renderer: 'svg' });
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };

  const updateSize = () => {
    echartInstance.resize();
  };

  window.addEventListener('resize', () => {
    echartInstance.resize();
  });

  return {
    echartInstance,
    setOptions,
    updateSize
  };
}
