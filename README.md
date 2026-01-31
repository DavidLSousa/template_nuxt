# OnePanel - Nuxt 4

Template base de projeto Nuxt 4 seguindo os padrões de desenvolvimento estabelecidos.

## Características

- **Nuxt 4** com Vue 3 e TypeScript
- **PrimeVue** para componentes UI (usando `@primeuix/themes`)
- **Tailwind CSS** com sistema de design tokens
- **i18n** para internacionalização (PT/EN)
- **Dark Mode** com persistência
- **Validação de formulários** com VeeValidate + Zod
- **Autenticação** com middleware global
- **SEO** otimizado com @nuxtjs/seo
- **Paleta Slate** para cores

## Estrutura do Projeto

```
onepanel-console-nuxt/
├── app/
│   ├── assets/css/          # CSS global e variáveis
│   ├── components/          # Componentes Vue
│   ├── composables/         # Composables reutilizáveis
│   ├── middleware/          # Middleware de rota
│   ├── pages/               # Páginas da aplicação
│   └── app.vue              # Componente raiz
├── i18n/locales/            # Arquivos de tradução
├── server/
│   └── api/                 # API routes
├── nuxt.config.ts           # Configuração do Nuxt
├── tailwind.config.ts       # Configuração do Tailwind
└── package.json
```

## Instalação

As dependências já foram instaladas. Se precisar reinstalar:

```bash
pnpm install
```

## Desenvolvimento

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

### Credenciais de Demonstração

- **Email:** admin@example.com
- **Senha:** password123

## Build para Produção

```bash
pnpm build
```

## Preview do Build

```bash
pnpm preview
```

## Comandos Úteis

```bash
# Lint do código
pnpm lint

# Corrigir problemas de lint automaticamente
pnpm lint:fix

# Verificação de tipos TypeScript
pnpm typecheck
```

## Paleta de Cores (Slate)

### Light Mode

- Primary: `rgb(51 65 85)` - slate-700
- Surface: `rgb(248 250 252)` - slate-50
- Text: `rgb(15 23 42)` - slate-900

### Dark Mode

- Primary: `rgb(203 213 225)` - slate-300
- Surface: `rgb(15 23 42)` - slate-900
- Text: `rgb(248 250 252)` - slate-50

## Variáveis de Ambiente

Copie `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

### Variáveis Disponíveis

- `API_SECRET` - Secret para API (server-side)
- `AUTH_SERVICE_URL` - URL do serviço de autenticação
- `API_SERVICE_URL` - URL da API principal
- `NUXT_PUBLIC_APP_NAME` - Nome da aplicação (público)
- `NUXT_PUBLIC_SITE_URL` - URL do site (público)

## Internacionalização

O projeto suporta Português (pt) e English (en). Para adicionar novas traduções:

1. Edite `i18n/locales/pt.json` e `i18n/locales/en.json`
2. Use `t('chave.da.traducao')` nos componentes

## Componentes Principais

### ThemeSwitcher

Botão para alternar entre modo claro e escuro.

### LanguageSwitcher

Botão para alternar entre idiomas disponíveis.

## Middleware de Autenticação

O middleware `auth.global.ts` protege todas as rotas exceto:

- `/login`
- `/register`
- `/forgot-password`

Para desabilitar a autenticação em uma rota específica, edite o array `publicRoutes`.

## Padrões de Desenvolvimento

- **Mobile-first:** Todo CSS deve ser escrito pensando em mobile primeiro
- **Type-safety:** Use TypeScript em todo o código
- **Segurança:** Nunca exponha tokens ou URLs sensíveis ao cliente
- **Acessibilidade:** Use HTML semântico e atributos ARIA
- **Performance:** Aproveite lazy loading e code splitting do Nuxt

## Próximos Passos

1. Configure as variáveis de ambiente
2. Implemente a lógica de autenticação real em `server/api/auth/login.post.ts`
3. Conecte com sua API backend
4. Adicione novas páginas e funcionalidades
5. Customize as cores se necessário em `app/assets/css/main.css`

## Recursos

- [Documentação Nuxt 4](https://nuxt.com/docs)
- [PrimeVue](https://primevue.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [VeeValidate](https://vee-validate.logaretm.com/)
- [Zod](https://zod.dev/)

---

**Desenvolvido com** ❤️ **usando Nuxt 4**
