<script setup lang="ts">
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isDark = computed(() => colorMode.value === 'dark')
</script>

<template>
  <button
    class="flex items-center justify-center w-9 h-9 text-text-muted border border-transparent hover:border-border-hover rounded-md transition-colors"
    :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
    @click="toggleTheme"
  >
    <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" />
  </button>
</template>
