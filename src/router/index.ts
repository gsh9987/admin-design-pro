import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes } from './routes/staticRoutes'
import { setupBeforeEachGuard } from './guards/beforeEach'

// 创建路由实例
export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes // 静态路由
})

// 初始化路由
export function initRouter(app: App<Element>): void {
  setupBeforeEachGuard(router) // 路由前置守卫
  app.use(router)
  console.log('🚀 ~ index.ts:16 ~ initRouter ~ router:', router.options)
}

// 主页路径，默认使用菜单第一个有效路径，配置后使用此路径
export const HOME_PAGE_PATH = ''
