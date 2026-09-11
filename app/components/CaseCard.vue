<script setup lang="ts">
import type { CaseStudy } from '~/utils/cases'

const props = defineProps<{
  item: CaseStudy
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const key = computed(() => `work.items.${props.item.slug}`)
</script>

<template>
  <NuxtLink
    :to="localePath(`/work/${item.slug}`)"
    class="group flex h-full flex-col transition-colors duration-300 hover:bg-muted"
  >
    <div class="relative aspect-4/3 overflow-hidden divider-dashed-b">
      <img
        :src="caseImage(item.seed, 1200, 900)"
        :alt="t(`${key}.name`)"
        width="1200"
        height="900"
        loading="lazy"
        decoding="async"
        class="size-full object-cover grayscale transition-[filter,transform] duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
        :style="{ viewTransitionName: `case-${item.slug}` }"
      >
      <span
        aria-hidden="true"
        class="absolute left-4 top-4 bg-default/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted backdrop-blur-sm"
      >
        {{ t(`${key}.year`) }}
      </span>
    </div>

    <div class="flex flex-1 flex-col p-8 lg:p-12">
      <div class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-dimmed">
        <span>{{ t(`${key}.category`) }}</span>
        <span>{{ t(`${key}.client`) }}</span>
      </div>

      <h3 class="mt-5 flex items-center gap-2 text-xl font-medium tracking-tight text-highlighted lg:text-2xl">
        {{ t(`${key}.name`) }}
        <UIcon
          name="i-lucide-arrow-up-right"
          class="size-4 text-dimmed transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-highlighted"
        />
      </h3>
      <p class="mt-2 text-sm text-muted lg:text-base">
        {{ t(`${key}.result`) }}
      </p>
    </div>
  </NuxtLink>
</template>
