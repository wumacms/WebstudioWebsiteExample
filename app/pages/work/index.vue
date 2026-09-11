<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('work.pageTitle')} — ${t('brand.name')}`,
  description: () => t('work.pageDescription')
})
</script>

<template>
  <div>
    <section class="relative border-b border-default">
      <SectionHeader
        :headline="t('work.headline')"
        :title="t('work.pageTitle')"
        :description="t('work.pageDescription')"
        pattern="grid"
        pattern-fade="top-right"
      />

      <div class="cells-dashed md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(item, i) in cases"
          :key="item.slug"
          class="bg-default"
        >
          <RevealBlock
            :delay="(i % 3) * 0.1"
            class="h-full"
          >
            <CaseCard :item="item" />
          </RevealBlock>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
