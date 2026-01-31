<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('dashboard.title'),
  description: 'Painel principal do aplicativo',
})

const stats = ref([
  {
    label: t('dashboard.users'),
    value: '1,234',
    icon: 'pi pi-users',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    label: t('dashboard.sales'),
    value: 'R$ 45.678',
    icon: 'pi pi-shopping-cart',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    label: t('dashboard.orders'),
    value: '89',
    icon: 'pi pi-list',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    label: t('dashboard.tickets'),
    value: '12',
    icon: 'pi pi-ticket',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
])
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface">
    <!-- Header -->
    <header class="border-b border-border">
      <div class="max-w-6xl w-full mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <h1 class="text-xl font-semibold text-text-base">
          {{ t('common.appName') }}
        </h1>
        <div class="flex items-center gap-1">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1">
      <div class="max-w-6xl w-full mx-auto px-4 md:px-6 py-6">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-lg p-4 border border-border"
            :class="stat.bg"
          >
            <div class="flex items-center gap-3 mb-2">
              <i
                :class="[stat.icon, stat.color]"
                class="text-xl"
              />
              <span class="text-sm text-text-muted">{{ stat.label }}</span>
            </div>
            <p class="text-2xl font-bold text-text-base">
              {{ stat.value }}
            </p>
          </div>
        </div>

        <!-- Content Card -->
        <div class="bg-surface-alt rounded-lg border border-border p-6">
          <h2 class="text-lg font-semibold text-text-base mb-4">
            {{ t('dashboard.mainContent') }}
          </h2>
          <p class="text-text-muted">
            {{ t('dashboard.description', { code: 'docs/standards.md' }) }}
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-surface border-t border-border">
      <div class="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <p class="text-text-muted text-center text-sm">
          {{ t('common.copyright') }}
        </p>
      </div>
    </footer>
  </div>
</template>
