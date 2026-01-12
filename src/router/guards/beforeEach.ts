/**
 * 路由全局前置守卫模块
 *
 * 适用于只有静态路由的场景
 *
 * ## 主要功能
 *
 * - 路由匹配检查
 * - 错误处理和异常跳转
 *
 * @module router/guards/beforeEach
 */

import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

/**
 * 设置路由全局前置守卫
 *
 * @param router Vue Router 实例
 */
export function setupBeforeEachGuard(router: Router): void {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      try {
        // 所有路由都是静态路由，直接放行
        // Vue Router 会自动匹配路由，404 路由使用通配符会匹配所有未匹配的路由
        next()
      } catch (error) {
        console.error('[RouteGuard] 路由守卫处理失败:', error)
        next({ name: 'Exception500' })
      }
    }
  )
}
