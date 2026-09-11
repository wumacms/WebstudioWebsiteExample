<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section
    id="work"
    class="relative border-b border-default"
  >
    <GridCross side="top-left" />
    <GridCross side="top-right" />

    <SectionHeader
      :headline="t('work.headline')"
      :title="t('work.title')"
      :description="t('work.description')"
      pattern="grid"
      pattern-fade="top-right"
    >
      <RevealBlock
        :delay="0.35"
        distance="120%"
        class="mt-8"
      >
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
          :label="t('work.all')"
          trailing-icon="i-lucide-arrow-up-right"
          :to="localePath('/work')"
        />
      </RevealBlock>
    </SectionHeader>

    <div class="cells-dashed md:grid-cols-3">
      <div
        v-for="(item, i) in cases"
        :key="item.slug"
        class="bg-default"
      >
        <RevealBlock
          :delay="i * 0.1"
          class="h-full"
        >
          <CaseCard :item="item" />
        </RevealBlock>
      </div>
    </div>
  </section>
</template>
