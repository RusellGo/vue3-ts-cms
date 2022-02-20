<template>
  <div class="list">
    <div class="content">
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="story"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageContent from '@/components/page-content';
import contentTableConfig from './config/content.config';

export default defineComponent({
  name: 'List',
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
