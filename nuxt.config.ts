import { cases } from './app/utils/cases'

// Every route that must exist in the static build. `/en` is only reachable
// through the locale switcher (a button, not a link), so the crawler would
// never find it on its own.
// No trailing slashes: `/en/` and the crawled `/en` would be rendered twice
// and race on the same prerender cache file.
const locales = ['', '/en']
const prerenderRoutes = locales.flatMap(prefix => [
  prefix || '/',
  `${prefix}/work`,
  ...cases.map(c => `${prefix}/work/${c.slug}`)
])

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/hints',
    '@nuxt/image',
    '@compodium/nuxt',
    '@nuxt/a11y',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'motion-v/nuxt'
  ],

  components: [
    { path: '~/components', pathPrefix: false }
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true }
  },

  experimental: {
    viewTransition: true
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: prerenderRoutes
    }
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
        commaDangle: 'never',
        braceStyle: '1tbs',
        arrowParens: false,
        blockSpacing: true,
        quoteProps: 'consistent-as-needed'
      }
    }
  },

  fonts: {
    families: [
      { name: 'Onest', provider: 'google', weights: [300, 400, 500, 600] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500] }
    ]
  },

  i18n: {
    baseUrl: 'https://norma.studio',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256
    }
  }
})
