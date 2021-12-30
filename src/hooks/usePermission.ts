import { useStore } from '@/store';

export function usePermission(pageName: string, handleName: string) {
  const store = useStore();
  const userPermissions = store.state.loginModule.userPermissions;
  const verifyPermission = `system:${pageName}:${handleName}`;
  return !!userPermissions.find((item) => item === verifyPermission);
}
