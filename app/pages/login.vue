<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

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
    toast.add({
      severity: 'success',
      summary: t('common.success'),
      detail: 'Login realizado com sucesso',
      life: 3000,
    })
    navigateTo('/')
  } catch {
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
      <Card class="w-full max-w-md shadow-lg bg-surface border border-border">
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
                :placeholder="t('auth.emailPlaceholder')"
                class="w-full bg-surface text-text-base border-border"
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
                :placeholder="t('auth.passwordPlaceholder')"
                input-class="w-full bg-surface text-text-base border-border"
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
              class="w-full mt-2 bg-surface text-text-base border-border"
            />
          </form>
          <div class="mt-4 p-3 bg-surface rounded border border-border">
            <p class="text-xs text-text-muted">
              <strong>Demonstração:</strong><br />
              Email: admin@example.com<br />
              Senha: password123
            </p>
          </div>
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
