<template>
  <div class="user">
    <div class="serch">
      <ru-form v-bind="searchFormConfig" />
    </div>

    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RuForm from '@/base-ui/form';
import searchFormConfig from './config/search.config';

export default defineComponent({
  name: 'User',
  components: {
    RuForm
  },
  setup() {
    return {
      searchFormConfig
    };
  }
});
</script>

<style scoped></style>
