<script setup lang="ts">
const { t } = useI18n()

const specs = [
  { key: 'stack', icon: 'i-lucide-layers' },
  { key: 'speed', icon: 'i-lucide-gauge' },
  { key: 'design', icon: 'i-lucide-pen-tool' },
  { key: 'since', icon: 'i-lucide-calendar' }
]
</script>

<template>
  <section class="relative">
    <div class="relative border-b border-default">
      <Pattern
        variant="glow"
        class="hidden lg:block"
      />

      <GridCircle side="bottom-left" />
      <GridCircle
        side="bottom-right"
        reverse
      />

      <div class="relative grid lg:grid-cols-12">
        <div class="relative px-6 pb-16 pt-20 lg:col-span-7 lg:px-12 lg:pb-24 lg:pt-28 xl:col-span-7">
          <Pattern
            variant="dots"
            fade="top-right"
            class="opacity-60 lg:hidden"
          />

          <div class="relative">
            <RevealBlock
              distance="140%"
              :duration="0.8"
            >
              <UBadge
                color="neutral"
                variant="outline"
                size="md"
                :ui="{ base: 'gap-2.5 px-3 py-1.5 text-[11px]' }"
              >
                <span
                  aria-hidden="true"
                  class="size-1.5 bg-primary animate-blink"
                />
                {{ t('hero.badge') }}
              </UBadge>
            </RevealBlock>

            <h1 class="mt-8 text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-highlighted sm:text-6xl sm:leading-[1.02] lg:text-7xl xl:text-[5.75rem] 2xl:text-[6.5rem]">
              <RevealText
                :text="t('hero.title')"
                :delay="0.1"
                :stagger="0.06"
                :duration="1"
              />
            </h1>

            <p class="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              <RevealText
                :text="t('hero.subtitle')"
                :delay="0.45"
                :stagger="0.014"
                :duration="0.8"
              />
            </p>

            <RevealBlock
              distance="120%"
              :delay="0.7"
              class="mt-10"
            >
              <div class="flex flex-col gap-3 sm:flex-row">
                <UButton
                  size="xl"
                  class="justify-center"
                  :label="t('hero.primary')"
                  to="#contact"
                  trailing-icon="i-lucide-arrow-right"
                />
                <UButton
                  size="xl"
                  class="justify-center"
                  color="neutral"
                  variant="outline"
                  :label="t('hero.secondary')"
                  to="#work"
                />
              </div>
            </RevealBlock>

            <RevealBlock
              distance="120%"
              :delay="0.85"
              class="mt-4"
            >
              <CopyCommand
                :text="site.email"
                class="w-full justify-center sm:w-auto"
              />
            </RevealBlock>
          </div>
        </div>

        <div class="relative hidden lg:col-span-5 lg:block divider-dashed-s">
          <HeroVisual />
        </div>
      </div>
    </div>

    <div class="cells-dashed border-b border-default sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(spec, i) in specs"
        :key="spec.key"
        class="bg-default"
      >
        <RevealBlock
          :delay="1 + i * 0.08"
          :duration="0.9"
        >
          <div class="flex items-center gap-3 px-6 py-5 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:bg-muted lg:px-12">
            <UIcon
              :name="spec.icon"
              class="size-4 shrink-0 text-dimmed"
            />
            <span>{{ t(`hero.specs.${spec.key}`) }}</span>
          </div>
        </RevealBlock>
      </div>
    </div>
  </section>
</template>
