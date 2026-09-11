<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => String(route.params.slug))
const item = findCase(slug.value)

if (!item) {
  throw createError({ statusCode: 404, statusMessage: 'Case not found', fatal: true })
}

const next = nextCase(item.slug)
const key = `work.items.${item.slug}`

const meta = ['client', 'role', 'stack', 'duration'] as const
const sections = ['challenge', 'solution', 'outcome'] as const

useSeoMeta({
  title: () => `${t(`${key}.name`)} — ${t('brand.name')}`,
  description: () => t(`${key}.intro`),
  ogImage: caseImage(item.seed, 1600, 900)
})
</script>

<template>
  <article>
    <div class="relative divider-dashed-b px-6 pb-14 pt-10 lg:px-12 lg:pb-20 lg:pt-14">
      <Pattern
        variant="dots"
        fade="top-right"
        class="opacity-70"
      />

      <div class="relative">
        <NuxtLink
          :to="localePath('/work')"
          class="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-highlighted"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-x-0.5"
          />
          {{ t('work.back') }}
        </NuxtLink>

        <p class="mt-10 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span
            aria-hidden="true"
            class="size-1.5 bg-primary"
          />
          {{ t(`${key}.category`) }} · {{ t(`${key}.year`) }}
        </p>

        <h1 class="mt-6 max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-highlighted sm:text-6xl lg:text-7xl">
          <RevealText
            :text="t(`${key}.name`)"
            :stagger="0.06"
          />
        </h1>

        <p class="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          <RevealText
            :text="t(`${key}.intro`)"
            :delay="0.3"
            :stagger="0.012"
            :duration="0.7"
          />
        </p>
      </div>
    </div>

    <div class="cells-dashed border-b border-default sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="field in meta"
        :key="field"
        class="bg-default px-6 py-5 lg:px-12"
      >
        <div class="font-mono text-[10px] uppercase tracking-[0.2em] text-dimmed">
          {{ t(`work.meta.${field}`) }}
        </div>
        <div class="mt-2 text-sm text-highlighted">
          {{ t(`${key}.${field}`) }}
        </div>
      </div>
    </div>

    <figure class="relative border-b border-default">
      <GridCircle side="bottom-left" />
      <GridCircle
        side="bottom-right"
        reverse
      />
      <img
        :src="caseImage(item.seed, 1600, 900)"
        :alt="t(`${key}.name`)"
        width="1600"
        height="900"
        fetchpriority="high"
        decoding="async"
        class="aspect-video w-full object-cover grayscale-[0.3]"
        :style="{ viewTransitionName: `case-${item.slug}` }"
      >
    </figure>

    <div class="cells-dashed border-b border-default">
      <div
        v-for="(section, i) in sections"
        :key="section"
        class="grid bg-default lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
      >
        <div class="relative px-6 pb-2 pt-10 lg:divider-dashed-e lg:px-12 lg:py-14">
          <Pattern
            v-if="i === 1"
            variant="hatch"
            fade="left"
            class="opacity-50"
          />
          <div class="relative flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span class="text-dimmed">0{{ i + 1 }}</span>
            {{ t(`work.sections.${section}`) }}
          </div>
        </div>
        <div class="px-6 pb-10 pt-4 lg:px-12 lg:py-14">
          <p class="max-w-2xl text-lg leading-relaxed text-highlighted lg:text-2xl lg:leading-snug">
            <RevealText
              :text="t(`${key}.${section}`)"
              :stagger="0.008"
              :duration="0.7"
            />
          </p>
        </div>
      </div>
    </div>

    <div class="cells-dashed border-b border-default md:grid-cols-2">
      <figure
        v-for="n in 2"
        :key="n"
        class="relative overflow-hidden bg-default"
      >
        <img
          :src="caseImage(item.seed, 1200, 800, `-${n}`)"
          :alt="`${t(`${key}.name`)} — ${n}`"
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
          class="aspect-3/2 w-full object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
        >
        <figcaption class="absolute bottom-4 left-4 bg-default/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted backdrop-blur-sm">
          {{ t(`${key}.name`) }} / 0{{ n }}
        </figcaption>
      </figure>
    </div>

    <div class="relative border-b border-default">
      <GridCross side="top-left" />
      <GridCross side="top-right" />
      <div class="cells-dashed lg:grid-cols-3">
        <div
          v-for="(result, i) in item.results"
          :key="result.key"
          class="relative bg-default px-8 py-10 lg:px-12 lg:py-16"
        >
          <Pattern
            variant="hatch"
            fade="bottom"
            class="opacity-40"
          />
          <div class="relative">
            <div class="text-5xl font-medium tracking-tight text-highlighted lg:text-7xl">
              <span
                v-if="result.prefix"
                class="text-dimmed"
              >{{ result.prefix }}</span><CountUp
                :to="result.value"
                :decimals="result.decimals ?? 0"
                :delay="0.2 + i * 0.08"
              /><span class="text-dimmed">{{ result.suffix }}</span>
            </div>
            <p class="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {{ t(`${key}.results.${result.key}`) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <NuxtLink
      :to="localePath(`/work/${next.slug}`)"
      class="group relative flex items-center justify-between gap-6 border-b border-default px-6 py-10 transition-colors duration-300 hover:bg-muted lg:px-12 lg:py-14"
    >
      <Pattern
        variant="cross"
        fade="right"
        class="opacity-60"
      />
      <div class="relative">
        <div class="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {{ t('work.next') }}
        </div>
        <div class="mt-3 text-2xl font-medium tracking-tight text-highlighted lg:text-4xl">
          {{ t(`work.items.${next.slug}.name`) }}
        </div>
      </div>
      <UIcon
        name="i-lucide-arrow-right"
        class="relative size-6 shrink-0 text-dimmed transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-highlighted"
      />
    </NuxtLink>

    <CtaSection />
  </article>
</template>
