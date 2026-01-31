// nuxt.config.ts
import { definePreset } from '@primeuix/themes'
import Material from '@primeuix/themes/material'

// Ajuste as cores do preset conforme a paleta Slate escolhida
const CustomPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}',
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

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],
  devtools: { enabled: true },

  app: {
    head: {
      titleTemplate: '%s | OnePanel',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0f172a' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  css: ['@/assets/css/main.css', 'primeicons/primeicons.css'],

  // Color mode
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },

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
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'OnePanel',
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-01',

  // ESLint
  eslint: {
    config: {
      stylistic: true,
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
    langDir: 'locales',
  },

  // PrimeVue
  primevue: {
    options: {
      theme: {
        preset: CustomPreset,
      },
    },
  },
})
