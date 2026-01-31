# Padrões de Desenvolvimento Nuxt

> Este documento define os padrões técnicos do projeto. Use como referência em todos os prompts de desenvolvimento.

---

## 1. CSS Variables & Tailwind

### Variáveis CSS (main.css)

```css
@layer base {
  :root {
    --color-primary: 51 65 85;        /* slate-700 */
    --color-surface: 248 250 252;     /* slate-50 */
    --color-surface-alt: 255 255 255; /* white */
    --color-surface-hover: 241 245 249; /* slate-100 */
    --color-border: 226 232 240;      /* slate-200 */
    --color-border-hover: 203 213 225; /* slate-300 */
    --color-text: 15 23 42;           /* slate-900 */
    --color-text-muted: 100 116 139;  /* slate-500 */
  }

  .dark {
    --color-primary: 203 213 225;     /* slate-300 */
    --color-surface: 15 23 42;        /* slate-900 */
    --color-surface-alt: 30 41 59;    /* slate-800 */
    --color-surface-hover: 51 65 85;  /* slate-700 */
    --color-border: 51 65 85;         /* slate-700 */
    --color-border-hover: 71 85 105;  /* slate-600 */
    --color-text: 248 250 252;        /* slate-50 */
    --color-text-muted: 148 163 184;  /* slate-400 */
  }
}
```

### Tailwind Config

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',
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
}
```

### Regras de Uso

| Proibido | Use em vez |
|----------|------------|
| `bg-slate-*`, `bg-gray-*` | `bg-surface`, `bg-surface-alt`, `bg-surface-hover` |
| `text-slate-*`, `text-gray-*` | `text-text-base`, `text-text-muted`, `text-primary` |
| `border-slate-*` | `border-border`, `border-border-hover` |
| `divide-slate-*` | `divide-border` |

**Exceção:** Cores semânticas (emerald, red, amber, blue, purple) são permitidas para status e alertas.

---

## 2. Layout & Responsividade

### Mobile-First

Sempre começar com layout mobile e adicionar breakpoints para telas maiores.

```html
<!-- Correto -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

<!-- Errado -->
<div class="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-1">
```

### Container Padrão

```html
<div class="max-w-6xl w-full mx-auto px-4 md:px-6">
```

### Breakpoints

| Breakpoint | Largura | Uso |
|------------|---------|-----|
| `sm` | 640px | Tablets pequenos |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop grande |

### Padrões de Grid

```html
<!-- Cards -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- Formulários 2 colunas -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">

<!-- Sidebar + Conteúdo -->
<div class="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
```

---

## 3. Estrutura de Diretórios

```
app/
├── assets/
│   └── css/
│       └── main.css          # CSS variables + Tailwind imports
├── components/
│   ├── [Feature]/            # Componentes agrupados por feature
│   │   ├── Card.vue
│   │   └── List.vue
│   ├── ThemeSwitcher.vue     # Toggle dark/light
│   └── LanguageSwitcher.vue  # Toggle idioma
├── composables/
│   ├── useAuthStore.ts       # Pinia store de auth
│   └── useApi.ts             # Wrapper para server routes
├── middleware/
│   └── auth.global.ts        # Proteção de rotas
├── pages/
│   ├── index.vue
│   └── login.vue
└── types/
    └── index.ts              # Interfaces TypeScript

server/
├── api/
│   └── [feature]/
│       ├── index.get.ts      # GET /api/feature
│       ├── index.post.ts     # POST /api/feature
│       └── [id].get.ts       # GET /api/feature/:id
├── middleware/
│   └── auth.ts               # Validação de token
└── utils/
    └── api.ts                # Helpers de API

i18n/
└── locales/
    ├── pt.json
    └── en.json
```

---

## 4. API & Segurança

### Server Routes (Obrigatório)

URLs de serviços externos e tokens NUNCA devem ser expostos no cliente.

```typescript
// server/api/billing/summary.get.ts
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token')
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  return await $fetch('/api/summary', {
    baseURL: process.env.BILLING_SERVICE_URL,
    headers: { Authorization: `Bearer ${token}` }
  })
})
```

### Composable Cliente

```typescript
// composables/useApi.ts
export function useBillingApi() {
  const getSummary = () => useFetch('/api/billing/summary')
  const getOrders = (params: OrderFilter) =>
    useFetch('/api/billing/orders', { params })

  return { getSummary, getOrders }
}
```

### Regras

- `process.env.*` → Apenas em server routes
- `$fetch` para APIs externas → Apenas em server routes
- `useFetch` → Sempre no cliente para chamar server routes
- Tokens em cookies → `sameSite: 'strict'`, `httpOnly: true`

---

## 5. i18n

### Estrutura de Chaves

```json
{
  "common": {
    "save": "Salvar",
    "cancel": "Cancelar",
    "loading": "Carregando...",
    "error": "Erro ao carregar dados"
  },
  "feature": {
    "title": "Título da Feature",
    "form": {
      "name": "Nome",
      "email": "E-mail"
    },
    "messages": {
      "success": "Operação realizada com sucesso",
      "error": "Falha na operação"
    }
  }
}
```

### Uso em Componentes

```typescript
const { t } = useI18n()

// Simples
t('common.save')

// Com interpolação
t('feature.messages.count', { count: 5 })
```

### Configuração

```typescript
// nuxt.config.ts
i18n: {
  locales: [
    { code: 'pt', name: 'Português', file: 'pt.json' },
    { code: 'en', name: 'English', file: 'en.json' }
  ],
  defaultLocale: 'pt',
  strategy: 'no_prefix',
  langDir: 'i18n/locales'
}
```

---

## 6. Componentes

### Nomenclatura

- PascalCase para arquivos: `BillingCard.vue`
- Prefixo por feature: `Billing`, `Auth`, `User`
- Componentes globais sem prefixo: `ThemeSwitcher.vue`

### Estrutura

```vue
<script setup lang="ts">
// 1. Imports
import type { Order } from '~/types'

// 2. Props & Emits
const props = defineProps<{
  order: Order
  loading?: boolean
}>()

const emit = defineEmits<{
  select: [id: string]
  delete: [id: string]
}>()

// 3. Composables
const { t } = useI18n()

// 4. State
const isExpanded = ref(false)

// 5. Computed
const formattedDate = computed(() => /* ... */)

// 6. Methods
function handleSelect() {
  emit('select', props.order.id)
}

// 7. Lifecycle
onMounted(() => /* ... */)
</script>

<template>
  <!-- Template aqui -->
</template>
```

### PrimeVue com Tailwind

Use `:pt` (passthrough) para aplicar classes Tailwind:

```vue
<Select
  v-model="selected"
  :options="options"
  :pt="{
    root: 'bg-surface border-border',
    label: 'text-text-muted',
    dropdown: 'bg-surface-alt'
  }"
/>
```

---

## 7. Validação de Forms

### Setup com vee-validate + zod

```typescript
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = toTypedSchema(
  z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
    name: z.string().min(2, 'Nome obrigatório')
  })
)

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema
})

const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = handleSubmit(async (values) => {
  // values é tipado automaticamente
  await api.register(values)
})
```

### Template

```vue
<template>
  <form @submit="onSubmit">
    <div class="flex flex-col gap-2">
      <label class="text-sm text-text-muted">E-mail</label>
      <InputText v-model="email" :class="{ 'border-red-500': errors.email }" />
      <span v-if="errors.email" class="text-sm text-red-500">
        {{ errors.email }}
      </span>
    </div>

    <Button type="submit" :loading="isSubmitting">
      {{ t('common.save') }}
    </Button>
  </form>
</template>
```

---

## 8. SEO

> **⚠️ IMPORTANTE:** NÃO usar o módulo `@nuxtjs/seo`. Ele pode causar conflitos e erros de hidratação (erro 404 em `/_nuxt`). Use o `useSeoMeta` nativo do Nuxt que já vem incluído.

### Por Página

```typescript
// Em cada página (useSeoMeta é NATIVO do Nuxt, não precisa de módulo externo)
useSeoMeta({
  title: 'Título da Página | Nome do App',
  description: 'Descrição para motores de busca',
  ogTitle: 'Título para compartilhamento',
  ogDescription: 'Descrição para redes sociais',
  ogImage: '/og-image.png'
})
```

### Global (nuxt.config.ts)

```typescript
app: {
  head: {
    titleTemplate: '%s | Meu App',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#0f172a' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  }
}
```

---

## 9. Autenticação

### Middleware Global

```typescript
// middleware/auth.global.ts
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

### Store de Auth

```typescript
// composables/useAuthStore.ts
export const useAuthStore = defineStore('auth', () => {
  const accessToken = useCookie('access_token', {
    maxAge: 60 * 15, // 15 minutos
    sameSite: 'strict'
  })

  const user = ref<User | null>(null)

  async function login(credentials: LoginCredentials) {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })
    accessToken.value = response.token
    user.value = response.user
  }

  function logout() {
    accessToken.value = null
    user.value = null
    navigateTo('/login')
  }

  return { user, login, logout, isAuthenticated: computed(() => !!accessToken.value) }
})
```

---

## 10. Padrões de Loading & Erros

### Loading State

```vue
<template>
  <div v-if="loading" class="flex items-center justify-center p-8">
    <i class="pi pi-spin pi-spinner text-2xl text-text-muted" />
  </div>

  <div v-else-if="error" class="p-8 text-center text-red-500">
    {{ t('common.error') }}
  </div>

  <div v-else-if="data.length === 0" class="p-8 text-center text-text-muted">
    {{ t('common.noData') }}
  </div>

  <div v-else>
    <!-- Conteúdo -->
  </div>
</template>
```

### Toast para Feedback

```typescript
const toast = useToast()

// Sucesso
toast.add({
  severity: 'success',
  summary: t('common.success'),
  detail: t('feature.messages.saved'),
  life: 3000
})

// Erro
toast.add({
  severity: 'error',
  summary: t('common.error'),
  detail: error.message,
  life: 5000
})
```
