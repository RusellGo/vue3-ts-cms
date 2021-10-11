import { createRouter, createWebHashHistory } from 'vue-router';

// vue-router 中明确规定了 routes 数组的类型
// 加上 type 表示导入的就是一个类型
import type { RouteRecordRaw } from 'vue-router';

import localCache from '@/utils/cache';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/Main.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token');
    if (!token) {
      return '/login';
    }
  }
});

export default router;
