<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const home = computed(() => localePath('/'))

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('nav.services'), to: `${home.value}#services` },
  { label: t('nav.process'), to: `${home.value}#process` },
  { label: t('nav.work'), to: localePath('/work') },
  { label: t('nav.faq'), to: `${home.value}#faq` }
])
</script>

<template>
  <UHeader :toggle="{ color: 'neutral', variant: 'ghost' }">
    <template #left>
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 outline-primary"
        :aria-label="t('brand.name')"
      >
        <AppLogo />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      color="neutral"
    />

    <template #right>
      <LocaleSwitcher />
      <ThemeToggle />
      <UButton
        class="hidden sm:inline-flex"
        :label="t('nav.contact')"
        :to="`${home}#contact`"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        variant="link"
        color="neutral"
        class="-mx-2.5"
      />
      <USeparator class="my-4" />
      <UButton
        block
        size="lg"
        :label="t('nav.contact')"
        :to="`${home}#contact`"
      />
    </template>
  </UHeader>
</template>
