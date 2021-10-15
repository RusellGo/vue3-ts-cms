import { RouteRecordRaw } from 'vue-router';

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  // 1.加载所有的路由（所有的路由已经在 router 目录下创建好）
  const allRoutes: RouteRecordRaw[] = [];

  // webpack 方法 require.context(路径, 是否递归查找, 文件匹配正则)
  const routeFile = require.context('../router/main', true, /\.ts/);

  // routeFile.keys() 返回获取到的路径数组
  // ./system/user/user.ts
  routeFile.keys().forEach((key) => {
    const route = require('../router/main' +
      key.split('.').splice(1).join('.'));

    allRoutes.push(route.default);
  });

  // 2.根据 userMenus 对所有路由进行匹配筛选
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) {
          routes.push(route);
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
}
