<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <ru-card title="分类商品数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </ru-card>
      </el-col>
      <el-col :span="10">
        <ru-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </ru-card>
      </el-col>
      <el-col :span="7">
        <ru-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </ru-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <ru-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </ru-card>
      </el-col>
      <el-col :span="12">
        <ru-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </ru-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store/index';

import RuCard from '@/base-ui/card';
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts/index';

export default defineComponent({
  name: 'Dashboard',
  components: {
    RuCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore();
    store.dispatch('dashboardModule/getDashboardDataAction');

    // 1.获取分类商品数据（饼图、玫瑰图）
    const categoryGoodsCount = computed(() => {
      // 简单处理一下数据格式
      return store.state.dashboardModule.categoryGoodsCount.map((item) => {
        return { value: item.goodsCount, name: item.name };
      });
    });

    // 2.获取分类商品销量数据
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = [];
      const value: any[] = [];

      const SaleData = store.state.dashboardModule.categoryGoodsSale;
      for (const item of SaleData) {
        xLabels.push(item.name);
        value.push(item.goodsCount);
      }

      return {
        xLabels,
        value
      };
    });

    // 3.获取分类商品收藏数据
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = [];
      const value: any[] = [];

      const FavorData = store.state.dashboardModule.categoryGoodsFavor;
      for (const item of FavorData) {
        xLabels.push(item.name);
        value.push(item.goodsFavor);
      }

      return {
        xLabels,
        value
      };
    });

    // 4.获取不同城市销量
    const addressGoodsSale = computed(() => {
      return store.state.dashboardModule.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count };
      });
    });

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    };
  }
});
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
