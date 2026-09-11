<script setup lang="ts">
const { t } = useI18n()

const items = ['t1', 't2', 't3']

function initials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
}
</script>

<template>
  <section class="relative border-b border-default">
    <GridCross side="top-left" />
    <GridCross side="top-right" />

    <SectionHeader
      :headline="t('testimonials.headline')"
      :title="t('testimonials.title')"
      pattern="dots"
    />

    <div class="cells-dashed lg:grid-cols-3">
      <div
        v-for="(key, i) in items"
        :key="key"
        class="bg-default"
      >
        <RevealBlock
          :delay="i * 0.1"
          class="h-full"
        >
          <figure class="flex h-full flex-col justify-between p-8 lg:p-12">
            <blockquote class="text-lg leading-snug tracking-tight text-highlighted lg:text-2xl">
              “{{ t(`testimonials.items.${key}.quote`) }}”
            </blockquote>

            <figcaption class="mt-10 flex items-center gap-4">
              <span
                aria-hidden="true"
                class="flex size-10 shrink-0 items-center justify-center bg-elevated font-mono text-xs text-highlighted"
              >
                {{ initials(t(`testimonials.items.${key}.name`)) }}
              </span>
              <div class="min-w-0">
                <div class="text-sm font-medium text-highlighted">
                  {{ t(`testimonials.items.${key}.name`) }}
                </div>
                <div class="text-xs text-muted">
                  {{ t(`testimonials.items.${key}.role`) }}
                </div>
              </div>
            </figcaption>
          </figure>
        </RevealBlock>
      </div>
    </div>
  </section>
</template>
