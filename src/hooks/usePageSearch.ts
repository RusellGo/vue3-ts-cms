import { ref } from 'vue';
import PageContent from '@/components/page-content';

export function usePageSearch() {
  // 获取PageContent组件实例
  const pageContentRef = ref<InstanceType<typeof PageContent>>();

  const handleReset = () => {
    pageContentRef.value?.getPageData();
  };
  const handleQuery = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo);
  };

  return [pageContentRef, handleReset, handleQuery];
}
