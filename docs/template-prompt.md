# Prompt: Criar Template Nuxt 4

> Use este prompt para gerar um novo projeto Nuxt 4 seguindo todos os padrões estabelecidos.
> **Importante:** Sempre referencie `docs/standards.md` para detalhes de implementação.

---

## Contexto

Você é um especialista em Nuxt 4, Vue 3, TypeScript e Tailwind CSS. Sua tarefa é criar um template de projeto seguindo rigorosamente os padrões definidos em `docs/standards.md`.

**Princípios:**

- Mobile-first em todo o CSS
- Segurança: nunca expor tokens ou URLs de API no cliente
- Type-safety: TypeScript em todo o código
- Acessibilidade: HTML semântico e ARIA quando necessário
- Performance: lazy loading, code splitting automático do Nuxt

---

## Passo 1: Criar Projeto e Instalar Dependências

```bash
# Criar projeto Nuxt 4
pnpm create nuxt@latest my-app
cd my-app

# Dependências de UI
pnpm add primevue @primevue/themes primeicons

# Módulos Nuxt
pnpm add -D @nuxtjs/tailwindcss @primevue/nuxt-module @nuxtjs/i18n @nuxtjs/color-mode @pinia/nuxt @nuxt/eslint

# SEO
pnpm add -D @nuxtjs/seo

# Validação de formulários
pnpm add vee-validate @vee-validate/zod zod

# TypeScript
pnpm add -D typescript @types/node
```

---

## Passo 2: Definir Paleta de Cores

**Pergunte ao usuário:**

> Qual paleta de cores base você deseja usar?
>
> 1. **slate** (padrão neutro, recomendado)
> 2. **zinc** (cinza mais frio/azulado)
> 3. **stone** (cinza mais quente/amarronzado)
> 4. **gray** (cinza puro)
> 5. **neutral** (cinza neutro)
> 6. **Customizada** (forneça os valores hex para primary, surface, text)

### Mapeamento de Paletas

| Variável        | slate       |
| --------------- | ----------- |
| primary (light) | 51 65 85    |
| primary (dark)  | 203 213 225 |
| surface (light) | 248 250 252 |
| surface (dark)  | 15 23 42    |
| text (light)    | 15 23 42    |
| text (dark)     | 248 250 252 |

Aplique a paleta escolhida em `app/assets/css/main.css` conforme `docs/standards.md`.

---

## Passo 3: Configurar nuxt.config.ts

```typescript
// nuxt.config.ts
import { definePreset } from '@primevue/themes'
import Material from '@primevue/themes/material'

// Ajuste as cores do preset conforme a paleta escolhida
const CustomPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '{slate.50}',
      // ... 100-900
      950: '{slate.950}',
    },
    colorScheme: {
      light: {
        primary: { color: '{slate.700}', contrastColor: '#fff' },
        surface: { 0: '#fff', 50: '{slate.50}', 900: '{slate.900}', 950: '{slate.950}' },
      },
      dark: {
        primary: { color: '{slate.300}', contrastColor: '{slate.950}' },
        surface: { 0: '{slate.950}', 50: '{slate.800}', 900: '{slate.50}', 950: '#fff' },
      },
    },
  },
})

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
  ],

  css: ['@/assets/css/main.css', 'primeicons/primeicons.css'],

  // Runtime config para variáveis de ambiente
  runtimeConfig: {
    // Apenas server-side (seguro)
    apiSecret: process.env.API_SECRET,
    services: {
      auth: process.env.AUTH_SERVICE_URL,
      api: process.env.API_SERVICE_URL,
    },
    // Público (exposto ao cliente) - apenas não-sensível
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Meu App',
    },
  },

  // i18n
  i18n: {
    locales: [
      { code: 'pt', name: 'Português', file: 'pt.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'pt',
    strategy: 'no_prefix',
    langDir: 'i18n/locales',
  },

  // Color mode
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },

  // PrimeVue
  primevue: {
    options: {
      theme: {
        preset: CustomPreset,
      },
    },
  },

  // ESLint
  eslint: {
    config: {
      stylistic: true,
    },
  },

  // SEO
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    name: process.env.NUXT_PUBLIC_APP_NAME || 'Meu App',
  },

  app: {
    head: {
      titleTemplate: '%s | Meu App',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0f172a' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})
```

---

## Passo 4: Criar Estrutura de Arquivos

### 4.1 CSS Variables (`app/assets/css/main.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: 51 65 85;
    --color-surface: 248 250 252;
    --color-surface-alt: 255 255 255;
    --color-surface-hover: 241 245 249;
    --color-border: 226 232 240;
    --color-border-hover: 203 213 225;
    --color-text: 15 23 42;
    --color-text-muted: 100 116 139;
  }

  .dark {
    --color-primary: 203 213 225;
    --color-surface: 15 23 42;
    --color-surface-alt: 30 41 59;
    --color-surface-hover: 51 65 85;
    --color-border: 51 65 85;
    --color-border-hover: 71 85 105;
    --color-text: 248 250 252;
    --color-text-muted: 148 163 184;
  }
}
```

### 4.2 Tailwind Config (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/components/**/*.{vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.ts',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-alt': 'rgb(var(--color-surface-alt) / <alpha-value>)',
        'surface-hover': 'rgb(var(--color-surface-hover) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'border-hover': 'rgb(var(--color-border-hover) / <alpha-value>)',
        'text-base': 'rgb(var(--color-text) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
      },
    },
  },
} satisfies Config
```

### 4.3 App Root (`app/app.vue`)

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
</script>
```

### 4.4 ThemeSwitcher (`app/components/ThemeSwitcher.vue`)

```vue
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
```

### 4.5 LanguageSwitcher (`app/components/LanguageSwitcher.vue`)

```vue
<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
  locales.value.filter((l) => typeof l === 'object' && l.code !== locale.value)
)

function switchLanguage() {
  const nextLocale = availableLocales.value[0]
  if (nextLocale && typeof nextLocale === 'object') {
    setLocale(nextLocale.code)
  }
}

const currentLocaleName = computed(() => {
  const current = locales.value.find((l) => typeof l === 'object' && l.code === locale.value)
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
```

### 4.6 Auth Middleware (`app/middleware/auth.global.ts`)

```typescript
export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('access_token')
  const publicRoutes = ['/login', '/register', '/forgot-password']

  if (publicRoutes.includes(to.path)) {
    if (token.value) return navigateTo('/')
    return
  }

  if (!token.value) {
    return navigateTo('/login')
  }
})
```

### 4.7 Server Route Exemplo (`server/api/example/index.get.ts`)

```typescript
export default defineEventHandler(async (event) => {
  // Validar autenticação
  const token = getCookie(event, 'access_token')
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  // Usar config do servidor (seguro, não exposto ao cliente)
  const config = useRuntimeConfig()

  // Chamar API externa
  const data = await $fetch('/endpoint', {
    baseURL: config.services.api,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
})
```

### 4.8 Composable de API (`app/composables/useApi.ts`)

```typescript
export function useApi() {
  const getExample = () => useFetch('/api/example')

  return { getExample }
}
```

### 4.9 i18n Base (`i18n/locales/pt.json`)

```json
{
  "common": {
    "appName": "Meu App",
    "save": "Salvar",
    "cancel": "Cancelar",
    "delete": "Excluir",
    "edit": "Editar",
    "loading": "Carregando...",
    "error": "Erro ao carregar dados",
    "success": "Operação realizada com sucesso",
    "noData": "Nenhum dado encontrado",
    "confirm": "Confirmar",
    "back": "Voltar",
    "next": "Próximo",
    "previous": "Anterior",
    "page": "Página",
    "of": "de",
    "copyright": "© 2025 Meu App. Todos os direitos reservados."
  },
  "auth": {
    "login": "Entrar",
    "logout": "Sair",
    "email": "E-mail",
    "password": "Senha",
    "forgotPassword": "Esqueceu a senha?",
    "register": "Criar conta",
    "loginTitle": "Acesse sua conta",
    "registerTitle": "Crie sua conta"
  },
  "validation": {
    "required": "Campo obrigatório",
    "email": "E-mail inválido",
    "minLength": "Mínimo {min} caracteres",
    "maxLength": "Máximo {max} caracteres"
  }
}
```

### 4.10 i18n English (`i18n/locales/en.json`)

```json
{
  "common": {
    "appName": "My App",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "loading": "Loading...",
    "error": "Error loading data",
    "success": "Operation completed successfully",
    "noData": "No data found",
    "confirm": "Confirm",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "page": "Page",
    "of": "of",
    "copyright": "© 2025 My App. All rights reserved."
  },
  "auth": {
    "login": "Sign In",
    "logout": "Sign Out",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot password?",
    "register": "Create account",
    "loginTitle": "Access your account",
    "registerTitle": "Create your account"
  },
  "validation": {
    "required": "Required field",
    "email": "Invalid email",
    "minLength": "Minimum {min} characters",
    "maxLength": "Maximum {max} characters"
  }
}
```

---

## Passo 5: Página de Login com Validação

```vue
<!-- app/pages/login.vue -->
<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const { t } = useI18n()
const toast = useToast()

const schema = toTypedSchema(
  z.object({
    email: z.string().email(t('validation.email')),
    password: z.string().min(8, t('validation.minLength', { min: 8 })),
  })
)

const { handleSubmit, errors, isSubmitting } = useForm({ validationSchema: schema })
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: values,
    })
    navigateTo('/')
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: 'Credenciais inválidas',
      life: 5000,
    })
  }
})

useSeoMeta({
  title: t('auth.loginTitle'),
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface">
    <!-- Header -->
    <header class="border-b border-border">
      <div class="max-w-6xl w-full mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-semibold text-text-base">
          {{ t('common.appName') }}
        </NuxtLink>
        <div class="flex items-center gap-1">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 flex items-center justify-center p-4 md:p-6">
      <Card class="w-full max-w-md shadow-lg bg-surface-alt border border-border">
        <template #title>
          <span class="text-center block text-text-base">
            {{ t('auth.loginTitle') }}
          </span>
        </template>
        <template #content>
          <form class="flex flex-col gap-4" @submit="onSubmit">
            <div class="flex flex-col gap-2">
              <label for="email" class="text-sm font-medium text-text-muted">
                {{ t('auth.email') }}
              </label>
              <InputText
                id="email"
                v-model="email"
                type="email"
                class="w-full bg-surface text-text-base"
                :class="{ 'border-red-500': errors.email }"
              />
              <span v-if="errors.email" class="text-sm text-red-500">
                {{ errors.email }}
              </span>
            </div>

            <div class="flex flex-col gap-2">
              <label for="password" class="text-sm font-medium text-text-muted">
                {{ t('auth.password') }}
              </label>
              <Password
                id="password"
                v-model="password"
                :feedback="false"
                toggle-mask
                class="w-full"
                input-class="w-full bg-surface text-text-base"
                :class="{ 'border-red-500': errors.password }"
              />
              <span v-if="errors.password" class="text-sm text-red-500">
                {{ errors.password }}
              </span>
            </div>

            <div class="flex justify-end">
              <NuxtLink to="/forgot-password" class="text-sm text-primary hover:underline">
                {{ t('auth.forgotPassword') }}
              </NuxtLink>
            </div>

            <Button
              type="submit"
              :label="t('auth.login')"
              :loading="isSubmitting"
              class="w-full mt-2"
            />
          </form>
        </template>
      </Card>
    </main>

    <!-- Footer -->
    <footer class="bg-surface">
      <div class="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <p class="text-text-muted text-center text-sm">
          {{ t('common.copyright') }}
        </p>
      </div>
    </footer>
  </div>
</template>
```

---

## Passo 6: Página Dashboard de Exemplo

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Dashboard',
  description: 'Painel principal do aplicativo',
})

const stats = ref([
  {
    label: 'Usuários',
    value: '1,234',
    icon: 'pi pi-users',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    label: 'Vendas',
    value: 'R$ 45.678',
    icon: 'pi pi-shopping-cart',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    label: 'Pedidos',
    value: '89',
    icon: 'pi pi-list',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    label: 'Tickets',
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
              <i :class="[stat.icon, stat.color]" class="text-xl" />
              <span class="text-sm text-text-muted">{{ stat.label }}</span>
            </div>
            <p class="text-2xl font-bold text-text-base">{{ stat.value }}</p>
          </div>
        </div>

        <!-- Content Card -->
        <div class="bg-surface-alt rounded-lg border border-border p-6">
          <h2 class="text-lg font-semibold text-text-base mb-4">Conteúdo Principal</h2>
          <p class="text-text-muted">
            Este é um template base seguindo os padrões de desenvolvimento. Consulte
            <code class="bg-surface px-1 rounded">docs/standards.md</code> para mais detalhes.
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
```

---

## Checklist Final

- [ ] Projeto criado com `pnpm create nuxt@latest`
- [ ] Todas as dependências instaladas
- [ ] `nuxt.config.ts` configurado com todos os módulos
- [ ] `tailwind.config.ts` com mapeamento de CSS variables
- [ ] `app/assets/css/main.css` com variáveis light/dark
- [ ] `ThemeSwitcher.vue` funcionando
- [ ] `LanguageSwitcher.vue` funcionando
- [ ] Arquivos i18n criados (pt.json, en.json)
- [ ] Middleware de autenticação configurado
- [ ] Server routes estruturadas
- [ ] Página de login com validação
- [ ] Página dashboard de exemplo
- [ ] ESLint configurado e funcionando
- [ ] Dark mode funcionando corretamente
- [ ] Layout responsivo (mobile-first)

---

## Comandos Úteis

```bash
# Desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Preview do build
pnpm preview

# Lint
pnpm lint
pnpm lint:fix

# Type check
pnpm nuxi typecheck
```

---

## Referência

Para padrões detalhados de:

- CSS Variables e cores
- Estrutura de componentes
- Padrões de API
- Validação de formulários
- SEO e meta tags
- Autenticação

**Consulte sempre:** `docs/standards.md`
