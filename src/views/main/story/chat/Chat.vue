<template>
  <div class="chat">
    <ru-editor v-model:value="htmlString" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RuEditor from '@/base-ui/editor';

export default defineComponent({
  name: 'chat',
  components: {
    RuEditor
  },
  setup() {
    const htmlString = ref<string>('coderwhy');
    return {
      htmlString
    };
  }
});
</script>

<style scoped></style>
