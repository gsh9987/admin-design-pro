/**
 * 用户状态管理模块
 *
 * 提供用户相关的状态管理
 *
 * ## 主要功能
 *
 * - 用户登录状态管理
 * - 用户信息存储
 * - 访问令牌和刷新令牌管理
 * - 语言设置
 * - 搜索历史记录
 * - 锁屏状态和密码管理
 * - 登出清理逻辑
 *
 * ## 使用场景
 *
 * - 用户登录和认证
 * - 权限验证
 * - 个人信息展示
 * - 多语言切换
 * - 锁屏功能
 * - 搜索历史管理
 *
 * ## 持久化
 *
 * - 使用 localStorage 存储
 * - 存储键：sys-v{version}-user
 * - 登出时自动清理
 *
 * @module store/modules/user
 */

import { LanguageEnum } from '@/enums/appEnum'
import { router } from '@/router'
import { AppRouteRecord } from '@/types/router'
import { setPageTitle } from '@/utils/router'

/**
 * 用户状态管理
 * 管理用户登录状态、个人信息、语言设置、搜索历史、锁屏状态等
 */
export const useUserStore = defineStore('userStore', () => {
  // 语言设置
  const language = ref(LanguageEnum.ZH)
  // 搜索历史记录
  const searchHistory = ref<AppRouteRecord[]>([])
  /**
   * 设置语言
   * @param lang 语言枚举值
   */
  const setLanguage = (lang: LanguageEnum) => {
    setPageTitle(router.currentRoute.value)
    language.value = lang
  }

  return {
    searchHistory,
    setLanguage
  }
})
