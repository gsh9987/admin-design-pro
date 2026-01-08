/**
 * 存储配置管理模块
 *
 * 提供统一的本地存储配置和工具方法
 *
 * ## 主要功能
 *
 * - 版本化存储键管理，支持多版本数据隔离
 * - 存储键名生成和解析（带版本前缀）
 * - 版本号提取和验证
 * - 存储键匹配的正则表达式生成
 * - 旧版本存储键兼容处理
 * - 升级和登出延迟配置
 * - 主题存储键配置
 *
 * ## 使用场景
 *
 * - Pinia Store 持久化存储
 * - 应用版本升级时的数据迁移
 * - 多版本数据清理
 * - 存储键的统一管理和规范
 *
 * 存储键格式：sys-v{version}-{storeId}
 * 例如：sys-v1.0.0-user, sys-v1.0.0-setting
 *
 * @module utils/storage/storage-config
 */

export class StorageConfig {
  /** 主题键名（index.html中使用了，如果修改，需要同步修改） */
  static readonly THEME_KEY = 'sys-theme'
}
