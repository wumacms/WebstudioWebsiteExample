<script setup lang="ts">
withDefaults(defineProps<{
  headline?: string
  title: string
  description?: string
  /** Optional decorative background pattern. */
  pattern?: 'dots' | 'grid' | 'hatch' | 'cross' | 'glow'
  patternFade?: 'none' | 'radial' | 'left' | 'right' | 'top' | 'bottom' | 'top-right'
}>(), {
  headline: undefined,
  description: undefined,
  pattern: undefined,
  patternFade: 'right'
})
</script>

<template>
  <div class="relative divider-dashed-b px-6 py-14 lg:px-12 lg:py-20">
    <Pattern
      v-if="pattern"
      :variant="pattern"
      :fade="patternFade"
      class="opacity-80"
    />

    <div class="relative">
      <p
        v-if="headline"
        class="mb-6 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted"
      >
        <span
          aria-hidden="true"
          class="size-1.5 bg-primary"
        />
        <RevealText
          :text="headline"
          :duration="0.6"
        />
      </p>

      <h2 class="max-w-3xl text-3xl font-medium leading-[1.05] tracking-tight text-highlighted sm:text-4xl lg:text-5xl">
        <RevealText
          :text="title"
          :delay="0.05"
        />
      </h2>

      <p
        v-if="description"
        class="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
      >
        <RevealText
          :text="description"
          :delay="0.2"
          :stagger="0.012"
          :duration="0.7"
        />
      </p>

      <slot />
    </div>
  </div>
</template>
