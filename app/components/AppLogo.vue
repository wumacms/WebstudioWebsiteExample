<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <span class="inline-flex items-center gap-2.5 text-highlighted">
    <svg
      class="size-5 shrink-0"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        stroke="currentColor"
        fill="none"
      />
      <rect
        x="5"
        y="5"
        width="10"
        height="10"
        fill="currentColor"
      />
    </svg>
    <span class="text-sm font-semibold tracking-[0.2em]">{{ t('brand.name') }}</span>
  </span>
</template>
