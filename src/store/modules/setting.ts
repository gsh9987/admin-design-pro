/**
 * 系统设置状态管理模块
 *
 * 提供完整的系统设置状态管理
 *
 * ## 主要功能
 *
 * - 菜单布局配置（左侧、顶部、混合、双栏）
 * - 主题管理（亮色、暗色、自动）
 * - 菜单主题样式配置
 * - 界面显示开关（面包屑、标签页、语言切换等）
 * - 功能开关（手风琴模式、色弱模式、水印等）
 * - 样式配置（边框、圆角、容器宽度、页面过渡）
 * - 节日功能配置
 * - Element Plus 主题色动态设置
 *
 * ## 使用场景
 *
 * - 设置面板配置管理
 * - 主题切换和样式定制
 * - 界面功能开关控制
 * - 用户偏好设置持久化
 *
 * ## 持久化
 *
 * - 使用 localStorage 存储
 * - 存储键：sys-v{version}-setting
 * - 支持跨版本数据迁移
 *
 * @module store/modules/setting
 */

import { setElementThemeColor } from '@/utils/ui/colors'
import { SETTING_DEFAULT_CONFIG } from '@/config/setting'
import { SystemThemeEnum } from '@/enums/appEnum'
import { StorageConfig } from '@/utils'

/**
 * 系统设置状态管理
 * 管理应用的菜单、主题、界面显示等各项设置
 * @param id - 存储的唯一标识符，用于区分不同的存储实例
 * @param storeDefinition - 存储的定义函数，用于初始化存储状态和方法
 * @returns 返回定义好的存储实例，可用于状态管理和访问
 */
export const useSettingStore = defineStore('settingStore', () => {
  // 主题相关设置
  /** 系统主题类型 */
  const systemThemeType = ref(SETTING_DEFAULT_CONFIG.systemThemeType)
  /** 系统主题模式 */
  const systemThemeMode = ref(SETTING_DEFAULT_CONFIG.systemThemeMode)
  /** 系统主题颜色 */
  const systemThemeColor = ref(SETTING_DEFAULT_CONFIG.systemThemeColor)

  // 界面显示设置
  /** 是否显示语言切换 */
  const showLanguage = ref(SETTING_DEFAULT_CONFIG.showLanguage)
  /** 是否显示进度条 */
  const showNprogress = ref(SETTING_DEFAULT_CONFIG.showNprogress)

  // 功能设置
  /** 是否刷新 */
  const refresh = ref(SETTING_DEFAULT_CONFIG.refresh)

  // 样式设置
  /** 自定义圆角 */
  const customRadius = ref(SETTING_DEFAULT_CONFIG.customRadius)

  /**
   * 判断是否为暗色模式
   */
  const isDark = computed((): boolean => {
    return systemThemeType.value === SystemThemeEnum.DARK
  })

  /**
   * 设置全局主题
   * @param theme 主题类型
   * @param themeMode 主题模式
   */
  const setGlopTheme = (theme: SystemThemeEnum, themeMode: SystemThemeEnum) => {
    systemThemeType.value = theme
    systemThemeMode.value = themeMode
    localStorage.setItem(StorageConfig.THEME_KEY, theme)
  }

  /** 获取自定义圆角 */
  const getCustomRadius = computed((): string => {
    return customRadius.value + 'rem' || SETTING_DEFAULT_CONFIG.customRadius + 'rem'
  })

  /**
   * 设置Element Plus主题颜色
   * @param theme 主题颜色
   */
  const setElementTheme = (theme: string) => {
    console.log('🚀 ~ setting.ts:96 ~ setElementTheme ~ theme:', theme)
    // 设置系统主题颜色值
    systemThemeColor.value = theme
    // 调用方法应用主题颜色
    setElementThemeColor(theme)
  }

  /**
   * 切换语言切换显示
   */
  const setLanguage = () => {
    showLanguage.value = !showLanguage.value
  }

  /** 刷新页面 */
  const reload = () => {
    refresh.value = !refresh.value
  }

  /**
   * 切换进度条显示
   */
  const setNprogress = () => {
    showNprogress.value = !showNprogress.value
  }

  /**
   * 设置自定义圆角
   * @param radius 圆角值
   */
  const setCustomRadius = (radius: string) => {
    customRadius.value = radius
    document.documentElement.style.setProperty('--custom-radius', `${radius}rem`)
  }

  return {
    systemThemeColor,
    systemThemeType,
    setElementTheme,
    isDark,
    reload,
    showLanguage,
    setGlopTheme,
    customRadius,
    setLanguage,
    showNprogress,
    setNprogress,
    setCustomRadius,
    getCustomRadius
  }
})
