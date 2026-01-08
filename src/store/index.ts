/**
 * Pinia Store 配置模块
 *
 * 提供全局状态管理的初始化和配置
 *
 * ## 主要功能
 *
 * - Pinia Store 实例创建
 * - 持久化插件配置（pinia-plugin-persistedstate）
 * - 版本化存储键管理
 * - 自动数据迁移（跨版本）
 * - LocalStorage 序列化配置
 * - Store 初始化函数
 *
 * ## 持久化策略
 *
 * - 使用 StorageKeyManager 生成版本化的存储键
 * - 格式：sys-v{version}-{storeId}
 * - 自动迁移旧版本数据到当前版本
 * - 使用 localStorage 作为存储介质
 *
 * @module store/index
 */

import type { App } from 'vue'
import { createPinia } from 'pinia'

export const store = createPinia()

/**
 * 初始化应用的状态管理插件
 *
 * @param app - Vue应用实例，用于注册状态管理插件
 * @returns 无返回值
 */
export function initStore(app: App<Element>): void {
  // 注册状态管理插件到应用实例
  app.use(store)
}
