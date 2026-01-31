export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validação básica
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required',
    })
  }

  // Aqui você implementaria a lógica de autenticação real
  // Por exemplo, validar contra um banco de dados ou API externa
  // Este é apenas um exemplo simplificado

  // Simular autenticação (REMOVER em produção)
  if (body.email === 'admin@example.com' && body.password === 'password123') {
    // Gerar token (use uma biblioteca JWT em produção)
    const token = 'example-token-' + Date.now()

    // Definir cookie
    setCookie(event, 'access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      sameSite: 'strict',
    })

    return {
      success: true,
      message: 'Login successful',
    }
  }

  throw createError({
    statusCode: 401,
    message: 'Invalid credentials',
  })
})
