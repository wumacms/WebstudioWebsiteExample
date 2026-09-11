<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section
    id="contact"
    class="relative border-b border-default"
  >
    <GridCross side="top-left" />
    <GridCross side="top-right" />

    <div
      aria-hidden="true"
      class="absolute inset-0 overflow-hidden"
    >
      <Pattern
        variant="dots"
        fade="radial"
        class="opacity-70"
      />
      <Ripple />
    </div>

    <div class="relative flex flex-col items-center px-6 py-24 text-center lg:px-12 lg:py-40">
      <p class="mb-6 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        <span
          aria-hidden="true"
          class="size-1.5 bg-primary"
        />
        <RevealText
          :text="t('cta.headline')"
          :duration="0.6"
        />
      </p>

      <h2 class="max-w-4xl text-4xl font-medium leading-[1.02] tracking-tight text-highlighted sm:text-5xl lg:text-7xl">
        <RevealText
          :text="t('cta.title')"
          :delay="0.05"
        />
      </h2>

      <p class="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
        <RevealText
          :text="t('cta.description')"
          :delay="0.2"
          :stagger="0.012"
          :duration="0.7"
        />
      </p>

      <RevealBlock
        distance="120%"
        :delay="0.35"
        class="mt-10 w-full sm:w-auto"
      >
        <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <UButton
            size="xl"
            class="justify-center"
            :label="t('cta.primary')"
            :to="`mailto:${site.email}`"
            icon="i-lucide-mail"
          />
          <UButton
            size="xl"
            class="justify-center"
            color="neutral"
            variant="outline"
            :label="t('cta.secondary')"
            :to="site.telegram"
            target="_blank"
            icon="i-simple-icons-telegram"
          />
        </div>
      </RevealBlock>

      <RevealBlock
        distance="120%"
        :delay="0.45"
        class="mt-4 w-full sm:w-auto"
      >
        <CopyCommand
          :text="site.email"
          class="w-full justify-center sm:w-auto"
        />
      </RevealBlock>
    </div>
  </section>
</template>
