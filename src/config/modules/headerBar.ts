/**
 * 顶部栏功能配置
 *
 * 统一管理顶部栏各个功能模块的启用状态。
 * 通过修改此配置文件可以快速启用或禁用顶部栏的功能按钮。
 *
 * @module config/headerBar
 */

import { HeaderBarFeatureConfig } from '@/types'

/**
 * 顶部栏功能配置对象
 */
export const headerBarConfig: HeaderBarFeatureConfig = {
  language: {
    enabled: true,
    description: '多语言切换功能'
  },
  themeToggle: {
    enabled: true,
    description: '主题切换功能（明暗主题）'
  }
}

export default headerBarConfig
