<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

const { t } = useI18n()

const keys = ['f1', 'f2', 'f3', 'f4', 'f5']

const items = computed<AccordionItem[]>(() => keys.map(key => ({
  label: t(`faq.items.${key}.question`),
  content: t(`faq.items.${key}.answer`)
})))
</script>

<template>
  <section
    id="faq"
    class="relative border-b border-default"
  >
    <GridCross side="top-left" />
    <GridCross side="top-right" />

    <div class="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <SectionHeader
        :headline="t('faq.headline')"
        :title="t('faq.title')"
        pattern="hatch"
        pattern-fade="bottom"
        class="lg:divider-dashed-e lg:after:hidden"
      />

      <div class="px-6 py-4 lg:px-12 lg:py-10">
        <RevealBlock
          distance="64px"
          :delay="0.15"
        >
          <UAccordion :items="items" />
        </RevealBlock>
      </div>
    </div>
  </section>
</template>
