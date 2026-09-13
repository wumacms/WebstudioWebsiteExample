<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { t, locale } = useI18n()
const head = useLocaleHead()
const { app } = useRuntimeConfig()

// Map our i18n codes (ISO 639-1) to @nuxt/ui locale keys (BCP-47 style).
// For example, our `zh` code corresponds to `zh_cn` in @nuxt/ui.
function resolveUiLocale(code: string) {
  if (code === 'zh') return locales.zh_cn
  if (code === 'en') return locales.en
  return locales.en
}

useHead(() => ({
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang
  },
  link: [
    { rel: 'icon', href: `${app.baseURL}favicon.svg`, type: 'image/svg+xml' },
    ...(head.value.link ?? [])
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ...(head.value.meta ?? [])
  ]
}))

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  twitterCard: 'summary'
})
</script>

<template>
  <UApp :locale="resolveUiLocale(locale)">
    <MotionConfig reduced-motion="user">
      <ClientOnly>
        <ScrollProgress />
      </ClientOnly>

      <AppHeader />

      <UMain>
        <div class="relative mx-auto w-full max-w-(--ui-container) border-x border-default">
          <NuxtPage />
          <AppFooter />
        </div>
      </UMain>
    </MotionConfig>
  </UApp>
</template>
