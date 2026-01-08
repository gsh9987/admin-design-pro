/**
 * Store 状态类型定义模块
 *
 * 提供 Pinia Store 的状态类型定义
 *
 * ## 主要功能
 *
 * - 系统主题类型
 * - 菜单主题类型
 * - 设置状态类型
 * - 工作标签页类型
 * - 用户状态类型
 * - 菜单状态类型
 * - 根状态类型
 *
 * ## 使用场景
 *
 * - Store 状态类型约束
 * - 状态数据结构定义
 * - 类型提示和自动补全
 *
 * @module types/store/index
 */

import { SystemThemeEnum } from '@/enums/appEnum'

// 系统主题样式（light | dark）
export interface SystemThemeType {
  /** 主题类名 */
  className: string
}

// 定义包含多个主题的类型
export type SystemThemeTypes = {
  [key in Exclude<SystemThemeEnum, SystemThemeEnum.AUTO>]: SystemThemeType
}
