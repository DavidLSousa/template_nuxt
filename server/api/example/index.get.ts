export default defineEventHandler(async (event) => {
  // Validar autenticação
  const token = getCookie(event, 'access_token')
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  // Usar config do servidor (seguro, não exposto ao cliente)
  const config = useRuntimeConfig()

  // Exemplo de resposta
  return {
    message: 'Example API response',
    appName: config.public.appName,
    timestamp: new Date().toISOString(),
  }
})
