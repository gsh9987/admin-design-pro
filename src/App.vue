<script lang="ts" setup>
  import { initializeTheme } from './hooks/core/useTheme'

  onBeforeMount(() => {
    initializeTheme()
  })
</script>

<template>
  <RouterView></RouterView>
</template>
