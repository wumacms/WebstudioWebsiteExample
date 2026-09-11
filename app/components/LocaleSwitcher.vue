<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()

// `setLocale` writes the i18n cookie first and then navigates to the localized
// route, so the `redirectOn: 'root'` detection never bounces us back.
async function switchTo(code: typeof locale.value) {
  if (code === locale.value) return
  await setLocale(code)
}
</script>

<template>
  <div
    class="flex items-center font-mono text-xs tracking-[0.14em] ring-1 ring-inset ring-default"
    role="group"
    :aria-label="t('nav.language')"
  >
    <button
      v-for="item in locales"
      :key="item.code"
      type="button"
      class="h-8 px-2.5 uppercase transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      :class="item.code === locale
        ? 'bg-primary text-inverted'
        : 'text-muted hover:text-highlighted hover:bg-elevated'"
      :aria-pressed="item.code === locale"
      :lang="item.language"
      :title="item.name"
      @click="switchTo(item.code)"
    >
      {{ item.code }}
    </button>
  </div>
</template>
