<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  locales.value.filter(l => typeof l === 'object' && l.code !== locale.value),
)

function switchLanguage() {
  const nextLocale = availableLocales.value[0]
  if (nextLocale && typeof nextLocale === 'object') {
    setLocale(nextLocale.code)
  }
}

const currentLocaleName = computed(() => {
  const current = locales.value.find(l => typeof l === 'object' && l.code === locale.value)
  return typeof current === 'object' ? current.name : locale.value
})
</script>

<template>
  <button
    class="flex items-center gap-2 px-3 py-2 text-sm text-text-muted border border-transparent hover:border-border-hover rounded-md transition-colors"
    @click="switchLanguage"
  >
    <i class="pi pi-globe" />
    {{ currentLocaleName }}
  </button>
</template>
