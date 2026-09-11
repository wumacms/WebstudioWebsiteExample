<script setup lang="ts">
const { t } = useI18n()

const corners = [
  { key: 'brief', class: 'left-8 top-8' },
  { key: 'design', class: 'right-8 top-8 text-right' },
  { key: 'dev', class: 'left-8 bottom-8' },
  { key: 'launch', class: 'right-8 bottom-8 text-right' }
]
</script>

<template>
  <div class="relative h-full min-h-[560px] overflow-hidden">
    <Pattern
      variant="dots"
      fade="radial"
    />

    <div
      aria-hidden="true"
      class="absolute inset-y-0 left-1/2 w-px line-dashed-y"
    >
      <Beam
        axis="y"
        duration="7s"
        size="30%"
      />
    </div>
    <div
      aria-hidden="true"
      class="absolute inset-x-0 top-1/2 h-px line-dashed-x"
    >
      <Beam
        duration="5s"
        delay="1.5s"
        size="30%"
      />
    </div>

    <Rings class="absolute left-1/2 top-1/2 size-[min(88%,640px)] -translate-x-1/2 -translate-y-1/2" />

    <span
      aria-hidden="true"
      class="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 bg-primary"
    />
    <span
      aria-hidden="true"
      class="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 ring-1 ring-inset ring-accented"
    />

    <span
      v-for="(corner, i) in corners"
      :key="corner.key"
      class="absolute max-w-[40%] font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-dimmed"
      :class="corner.class"
    >
      <span class="text-muted">0{{ i + 1 }}</span> — {{ t(`process.steps.${corner.key}.title`) }}
    </span>
  </div>
</template>
