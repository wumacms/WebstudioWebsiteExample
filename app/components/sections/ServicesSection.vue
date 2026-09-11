<script setup lang="ts">
const { t } = useI18n()

const services = [
  { key: 'landing', icon: 'i-lucide-layout-template' },
  { key: 'apps', icon: 'i-lucide-app-window' },
  { key: 'design', icon: 'i-lucide-pen-tool' },
  { key: 'ecommerce', icon: 'i-lucide-shopping-bag' },
  { key: 'performance', icon: 'i-lucide-gauge' },
  { key: 'support', icon: 'i-lucide-life-buoy' }
]
</script>

<template>
  <section
    id="services"
    class="relative border-b border-default"
  >
    <GridCross side="top-left" />
    <GridCross side="top-right" />

    <SectionHeader
      :headline="t('services.headline')"
      :title="t('services.title')"
      :description="t('services.description')"
      pattern="hatch"
    />

    <div class="cells-dashed sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(service, i) in services"
        :key="service.key"
        class="bg-default"
      >
        <RevealBlock
          :delay="(i % 3) * 0.08"
          class="h-full"
        >
          <article class="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-muted lg:p-12">
            <div class="flex items-center justify-between">
              <div class="flex size-10 items-center justify-center text-highlighted ring-1 ring-inset ring-default transition-colors duration-300 group-hover:bg-primary group-hover:text-inverted">
                <UIcon
                  :name="service.icon"
                  class="size-5"
                />
              </div>
              <span class="font-mono text-xs text-dimmed">0{{ i + 1 }}</span>
            </div>

            <h3 class="mt-12 text-lg font-medium tracking-tight text-highlighted lg:text-xl">
              {{ t(`services.items.${service.key}.title`) }}
            </h3>
            <p class="mt-3 max-w-md text-sm leading-relaxed text-muted lg:text-base">
              {{ t(`services.items.${service.key}.description`) }}
            </p>
          </article>
        </RevealBlock>
      </div>
    </div>
  </section>
</template>
