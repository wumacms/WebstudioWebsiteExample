<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const year = new Date().getFullYear()

const home = computed(() => localePath('/'))

const navigation = computed(() => [
  { label: t('nav.services'), to: `${home.value}#services` },
  { label: t('nav.process'), to: `${home.value}#process` },
  { label: t('nav.work'), to: localePath('/work') },
  { label: t('nav.faq'), to: `${home.value}#faq` }
])

const services = ['landing', 'apps', 'design', 'ecommerce', 'performance', 'support']

const socials = [
  { icon: 'i-simple-icons-telegram', label: 'Telegram', to: site.telegram },
  { icon: 'i-simple-icons-github', label: 'GitHub', to: site.github },
  { icon: 'i-simple-icons-behance', label: 'Behance', to: site.behance }
]
</script>

<template>
  <footer class="relative">
    <GridCross side="top-left" />
    <GridCross side="top-right" />

    <div class="cells-dashed md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
      <div class="relative bg-default p-8 lg:p-12">
        <Pattern
          variant="dots"
          fade="left"
          class="opacity-60"
        />
        <div class="relative">
          <NuxtLink
            :to="localePath('/')"
            class="inline-flex"
            :aria-label="t('brand.name')"
          >
            <AppLogo />
          </NuxtLink>
          <p class="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            {{ t('footer.description') }}
          </p>
        </div>
      </div>

      <div class="bg-default p-8 lg:p-12">
        <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-dimmed">
          {{ t('footer.navigation') }}
        </h3>
        <ul class="mt-5 space-y-2.5">
          <li
            v-for="item in navigation"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              class="text-sm text-muted transition-colors hover:text-highlighted"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="bg-default p-8 lg:p-12">
        <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-dimmed">
          {{ t('footer.services') }}
        </h3>
        <ul class="mt-5 space-y-2.5">
          <li
            v-for="key in services"
            :key="key"
          >
            <NuxtLink
              :to="`${home}#services`"
              class="text-sm text-muted transition-colors hover:text-highlighted"
            >
              {{ t(`services.items.${key}.title`) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="bg-default p-8 lg:p-12">
        <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-dimmed">
          {{ t('footer.contacts') }}
        </h3>
        <ul class="mt-5 space-y-2.5 text-sm text-muted">
          <li>
            <a
              :href="`mailto:${site.email}`"
              class="transition-colors hover:text-highlighted"
            >{{ site.email }}</a>
          </li>
          <li>
            <a
              :href="site.telegram"
              target="_blank"
              rel="noopener"
              class="transition-colors hover:text-highlighted"
            >Telegram</a>
          </li>
          <li class="pt-2 font-mono text-xs text-dimmed">
            {{ t('footer.location') }}
          </li>
        </ul>
      </div>
    </div>

    <div class="flex flex-col gap-4 border-t border-default px-6 py-5 font-mono text-xs text-dimmed sm:flex-row sm:items-center sm:justify-between lg:px-12">
      <span>{{ t('footer.copyright', { year }) }}</span>
      <div class="flex items-center gap-1">
        <UButton
          v-for="social in socials"
          :key="social.label"
          :to="social.to"
          :icon="social.icon"
          :aria-label="social.label"
          target="_blank"
          color="neutral"
          variant="ghost"
          size="sm"
          square
        />
      </div>
    </div>
  </footer>
</template>
