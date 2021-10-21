import { RouteRecordRaw } from 'vue-router';
import { IBreadcrumb } from '@/base-ui/breadcrumb';

let firstMenu: any = null;

/**
 * 根据请求的用户菜单，映射对应的路由
 * @param userMenus 请求的用户菜单
 * @returns 菜单对应的路由对象数组
 */
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
          // 保存第一个路由对象
          if (!firstMenu) {
            firstMenu = menu;
          }

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

/**
 * 根据请求的菜单、使用当前路径匹配对应路由菜单
 * @param userMenus 请求的菜单
 * @param currentPath 当前路径
 * @returns 返回路径对应路由对象
 */
/**
 * 根据请求的菜单、使用当前路径匹配对应路由菜单
 * @param userMenus 请求的菜单
 * @param currentPath 当前路径
 * @param breadcrumbs 可选参数 面包屑数据
 * @returns 返回路径对应路由对象
 */
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        // 面包屑数据
        breadcrumbs?.push({ name: menu.name, path: menu.url });
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url });

        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

/**
 * 获取面包屑数据
 * @param userMenus 请求的菜单
 * @param currentPath 当前路径
 * @returns 返回面包屑数据
 */
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = [];

  pathMapToMenu(userMenus, currentPath, breadcrumbs);

  return breadcrumbs;
}

// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
//   const breadcrumbs: IBreadcrumb[] = [];

//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.url });
//         breadcrumbs.push({ name: findMenu.name, path: findMenu.url });
//         return findMenu;
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu;
//     }
//   }
// }

export { firstMenu };
