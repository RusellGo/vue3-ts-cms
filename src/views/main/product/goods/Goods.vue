<template>
  <div class="goods">
    <div class="content">
      <page-content :contentTableConfig="contentTableConfig" pageName="goods">
        <template #headerBtnTitle>新建商品</template>
        <template v-slot:image="scope">
          <el-image
            style="width: 30px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
          ></el-image>
        </template>
        <template v-slot:oldPrice="scope">
          {{ '￥' + scope.row.oldPrice }}
        </template>
        <template v-slot:newPrice="scope">
          {{ '￥' + scope.row.newPrice }}
        </template>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageContent from '@/components/page-content';
import contentTableConfig from './config/content.config';

export default defineComponent({
  name: 'Goods',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    };
  }
});
</script>

<style scoped></style>
