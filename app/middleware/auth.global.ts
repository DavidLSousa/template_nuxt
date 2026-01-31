export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('access_token')
  const publicRoutes = ['/login', '/register', '/forgot-password']

  if (publicRoutes.includes(to.path)) {
    if (import.meta.client && token.value) return navigateTo('/')
    return
  }

  if (!token.value) {
    return navigateTo('/login')
  }
})
