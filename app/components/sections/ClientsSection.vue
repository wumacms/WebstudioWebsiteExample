<script setup lang="ts">
const { t } = useI18n()

const clients = ['Atlas', 'Northwind', 'Vertex', 'Helix', 'Orbit', 'Kappa', 'Lumen', 'Meridian']
</script>

<template>
  <section class="relative border-b border-default">
    <div class="grid lg:grid-cols-[18rem_1fr]">
      <div class="flex items-center gap-2.5 px-6 py-5 font-mono text-xs uppercase tracking-[0.18em] text-muted divider-dashed-b lg:divider-dashed-e lg:px-12 lg:after:hidden">
        <span
          aria-hidden="true"
          class="size-1.5 bg-primary"
        />
        {{ t('clients.label') }}
      </div>

      <UMarquee
        pause-on-hover
        overlay
        :ui="{ root: 'py-5' }"
      >
        <div
          v-for="client in clients"
          :key="client"
          class="flex items-center gap-3 px-10 font-mono text-sm uppercase tracking-[0.22em] text-dimmed"
        >
          <span
            aria-hidden="true"
            class="size-2 border border-current"
          />
          {{ client }}
        </div>
      </UMarquee>
    </div>
  </section>
</template>
