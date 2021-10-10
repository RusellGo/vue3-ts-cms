import { createRouter, createWebHashHistory } from 'vue-router';

// vue-router 中明确规定了 routes 数组的类型
// 加上 type 表示导入的就是一个类型
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/views/login/Login.vue')
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

export default router;
