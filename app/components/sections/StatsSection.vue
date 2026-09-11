<script setup lang="ts">
const { t } = useI18n()

const stats = [
  { key: 'projects', value: 120, suffix: '+', decimals: 0 },
  { key: 'years', value: 8, suffix: '', decimals: 0 },
  { key: 'retention', value: 98, suffix: '%', decimals: 0 },
  { key: 'lcp', value: 0.8, suffix: 's', decimals: 1 }
]
</script>

<template>
  <section class="relative border-b border-default">
    <GridCircle
      side="top-left"
      :size="56"
    />
    <GridCircle
      side="top-right"
      :size="56"
      reverse
    />

    <div class="cells-dashed sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(stat, i) in stats"
        :key="stat.key"
        class="relative bg-default"
      >
        <Pattern
          variant="hatch"
          fade="bottom"
          class="opacity-40"
        />
        <RevealBlock
          :delay="i * 0.08"
          class="relative h-full"
        >
          <div class="px-8 py-10 lg:px-12 lg:py-16">
            <div class="text-5xl font-medium tracking-tight text-highlighted lg:text-7xl">
              <CountUp
                :to="stat.value"
                :decimals="stat.decimals"
                :delay="0.2 + i * 0.08"
              /><span class="text-dimmed">{{ stat.suffix }}</span>
            </div>
            <p class="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {{ t(`stats.${stat.key}.label`) }}
            </p>
          </div>
        </RevealBlock>
      </div>
    </div>
  </section>
</template>
