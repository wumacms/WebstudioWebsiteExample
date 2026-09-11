<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string
  prefix?: string
}>(), {
  prefix: '■ ~'
})

const { t } = useI18n()
const { copy, copied } = useClipboard({ source: () => props.text, copiedDuring: 1600 })
</script>

<template>
  <button
    type="button"
    class="group inline-flex h-12 max-w-full items-center gap-3 px-4 font-mono text-sm text-muted ring-1 ring-inset ring-default transition-colors duration-200 hover:bg-muted hover:text-highlighted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
    :aria-label="copied ? t('hero.copied') : t('hero.copy')"
    @click="copy()"
  >
    <span class="text-dimmed">{{ prefix }}</span>
    <span class="truncate">{{ text }}</span>
    <span class="relative size-4 shrink-0">
      <UIcon
        name="i-lucide-copy"
        class="absolute inset-0 size-4 transition-opacity duration-200"
        :class="copied ? 'opacity-0' : 'opacity-100'"
      />
      <UIcon
        name="i-lucide-check"
        class="absolute inset-0 size-4 transition-opacity duration-200"
        :class="copied ? 'opacity-100' : 'opacity-0'"
      />
    </span>
  </button>
</template>
