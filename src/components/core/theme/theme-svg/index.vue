<!-- 一个让 SVG 图片跟随主题的组件，只对特定 svg 图片生效，不建议开发者使用 -->
<!-- 图片地址 https://iconpark.oceanengine.com/illustrations/13 -->
<script lang="ts" setup>
  interface Props {
    /** 组件尺寸大小，可选值 */
    size?: string | number
    /** 主题颜色，可选值 */
    themeColor?: string
    /** 资源路径，可选值 */
    src?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 500,
    themeColor: 'var(--el-color-primary)'
  })

  // 响应式数据引用，用于存储SVG内容字符串
  const svgContent = ref('')

  /**
   * 计算组件尺寸样式
   *
   * 该函数根据传入的size属性值，生成对应的宽度和高度样式对象。
   * 当size为数字类型时，会自动添加px单位；当size为字符串时，直接使用该值。
   *
   * @returns {Object} 包含width和height样式的对象
   */
  const sizeStyle = computed(() => {
    const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size
    return {
      width: sizeValue,
      height: sizeValue
    }
  })

  // 颜色映射配置
  const COLOR_MAPPINGS = {
    '#C7DEFF': 'var(--el-color-primary-light-6)',
    '#071F4D': 'var(--el-color-primary-dark-2)',
    '#00E4E5': 'var(--el-color-primary-light-1)',
    '#006EFF': 'var(--el-color-primary)',
    '#fff': 'var(--default-box-color)',
    '#ffffff': 'var(--default-box-color)',
    '#DEEBFC': 'var(--el-color-primary-light-7)'
  } as const

  //将主题色应用到 SVG 内容
  const applyThemeToSvg = (content: string): string => {
    return Object.entries(COLOR_MAPPINGS).reduce(
      (processedContent, [originalColor, themeColor]) => {
        const fillRegex = new RegExp(`fill="${originalColor}"`, 'gi')
        const strokeRegex = new RegExp(`stroke="${originalColor}"`, 'gi')

        return processedContent
          .replace(fillRegex, `fill="${themeColor}"`)
          .replace(strokeRegex, `stroke="${themeColor}"`)
      },
      content
    )
  }

  /**
   * 加载SVG内容并应用主题样式
   *
   * 该函数根据传入的src属性异步加载SVG文件内容，
   * 并将加载到的内容通过applyThemeToSvg函数应用主题样式后存储到响应式变量中。
   * 如果加载失败或src为空，则清空svgContent的值。
   *
   * @returns {Promise<void>} 返回一个无resolve值的Promise，表示加载操作完成
   */
  const loadSvgContent = async () => {
    if (!props.src) {
      svgContent.value = ''
      return
    }

    try {
      const response = await fetch(props.src)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const content = await response.text()
      svgContent.value = applyThemeToSvg(content)
    } catch (error) {
      console.error('Failed to load SVG:', error)
      svgContent.value = ''
    }
  }

  /**
   * 监听副作用函数，用于加载SVG内容
   *
   * 该函数使用watchEffect监听响应式数据的变化，当依赖的数据发生变化时，
   * 会自动重新执行loadSvgContent函数来加载SVG内容。
   *
   * @returns {void}
   */
  watchEffect(() => {
    loadSvgContent()
  })
</script>

<template>
  <div class="theme-svg" :style="sizeStyle">
    <div v-if="src" class="svg-container" v-html="svgContent"></div>
  </div>
</template>

<style lang="scss" scoped>
  .theme-svg {
    display: inline-block;

    .svg-container {
      width: 100%;
      height: 100%;

      :deep(svg) {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
