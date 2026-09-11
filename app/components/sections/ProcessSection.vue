<script setup lang="ts">
const { t } = useI18n()

const steps = ['brief', 'design', 'dev', 'launch']
</script>

<template>
  <section
    id="process"
    class="relative border-b border-default"
  >
    <GridCross side="top-left" />
    <GridCross side="top-right" />

    <SectionHeader
      :headline="t('process.headline')"
      :title="t('process.title')"
      :description="t('process.description')"
      pattern="cross"
    />

    <div class="relative">
      <div
        aria-hidden="true"
        class="absolute inset-x-0 -top-px z-10 h-px"
      >
        <Beam
          duration="6s"
          size="20%"
        />
      </div>

      <div class="cells-dashed md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(step, i) in steps"
          :key="step"
          class="relative bg-default"
        >
          <span
            aria-hidden="true"
            class="absolute left-8 top-0 z-10 size-2.5 -translate-y-1/2 bg-primary lg:left-12"
          />

          <RevealBlock
            :delay="i * 0.1"
            class="h-full"
          >
            <div class="flex h-full flex-col p-8 lg:p-12">
              <div class="flex items-center justify-between">
                <span class="font-mono text-xs text-dimmed">0{{ i + 1 }}</span>
                <UBadge
                  color="neutral"
                  variant="outline"
                  size="sm"
                >
                  {{ t(`process.steps.${step}.duration`) }}
                </UBadge>
              </div>

              <h3 class="mt-14 text-lg font-medium tracking-tight text-highlighted lg:text-xl">
                {{ t(`process.steps.${step}.title`) }}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-muted lg:text-base">
                {{ t(`process.steps.${step}.description`) }}
              </p>
            </div>
          </RevealBlock>
        </div>
      </div>
    </div>
  </section>
</template>
