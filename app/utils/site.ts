/**
 * Static site facts that must not go through the i18n message compiler
 * (an `@` inside a vue-i18n message is parsed as a linked message).
 */
export const site = {
  email: 'hello@norma.studio',
  telegram: 'https://t.me/norma_studio',
  github: 'https://github.com/',
  behance: 'https://www.behance.net/'
} as const
