/**
 * useHeaderBar - 顶部栏功能管理
 *
 * 统一管理顶部栏各个功能模块的显示状态和配置信息。
 * 提供灵活的功能开关控制，支持动态显示/隐藏顶部栏的各个功能按钮。
 *
 * ## 主要功能
 *
 * 1. 功能开关控制 - 统一管理菜单按钮、刷新按钮、快速入口等功能的显示状态
 * 2. 配置信息获取 - 获取各个功能模块的详细配置信息
 * 3. 功能列表查询 - 快速获取所有启用或禁用的功能列表
 * 4. 响应式状态 - 所有状态自动响应配置和 store 变化
 *
 * @module useHeaderBar
 */

import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/modules/setting'
import { headerBarConfig } from '@/config/modules/headerBar'
import { HeaderBarFeatureConfig } from '@/types'

/**
 * 顶部栏功能管理
 * @returns 顶部栏功能相关的状态和方法
 */
export function useHeaderBar() {
  const settingStore = useSettingStore()

  // 获取顶部栏配置
  const headerBarConfigRef = computed<HeaderBarFeatureConfig>(() => headerBarConfig)

  // 从store中获取相关状态
  const { showLanguage } = storeToRefs(settingStore)

  /**
   * 检查特定功能是否启用
   * @param feature 功能名称
   * @returns 是否启用
   */
  const isFeatureEnabled = (feature: keyof HeaderBarFeatureConfig): boolean => {
    return headerBarConfigRef.value[feature]?.enabled ?? false
  }

  // 检查语言切换是否显示
  const shouldShowLanguage = computed(() => {
    return isFeatureEnabled('language') && showLanguage.value
  })

  // 检查主题切换是否显示
  const shouldShowThemeToggle = computed(() => {
    return isFeatureEnabled('themeToggle')
  })

  /**
   * 检查功能是否启用（别名）
   * @param feature 功能名称
   * @returns 是否启用
   */
  const isFeatureActive = (feature: keyof HeaderBarFeatureConfig): boolean => {
    return isFeatureEnabled(feature)
  }

  return {
    // 配置
    headerBarConfig: headerBarConfigRef,

    // 显示状态计算属性
    shouldShowLanguage, // 是否显示语言切换
    shouldShowThemeToggle, // 是否显示主题切换

    // 方法
    isFeatureEnabled, // 检查功能是否启用
    isFeatureActive // 检查功能是否启用（别名）
  }
}
