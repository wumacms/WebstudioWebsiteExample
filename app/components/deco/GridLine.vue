<script setup lang="ts">
const props = withDefaults(defineProps<{
  side?: 'left' | 'right' | 'top' | 'bottom'
  dashed?: boolean
  /** Fade the line out towards both ends. */
  fade?: boolean
  /** Extend the line beyond the parent on both ends. */
  extend?: string
  /** Push the line outward from the parent edge. */
  offset?: string
}>(), {
  side: 'left',
  dashed: false,
  fade: false,
  extend: '0px',
  offset: '0px'
})

const vertical = computed(() => props.side === 'left' || props.side === 'right')
</script>

<template>
  <div
    aria-hidden="true"
    class="grid-line hidden md:block"
    :class="[
      dashed ? (vertical ? 'line-dashed-y' : 'line-dashed-x') : 'bg-border',
      fade && (vertical ? 'mask-fade-y' : 'mask-fade-x')
    ]"
    :data-side="side"
    :style="{ '--extend': extend, '--offset': offset }"
  />
</template>

<style scoped>
.grid-line {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  opacity: var(--line-opacity);
}

.grid-line[data-side='left'],
.grid-line[data-side='right'] {
  top: calc(-1 * var(--extend));
  bottom: calc(-1 * var(--extend));
  width: 1px;
}

.grid-line[data-side='top'],
.grid-line[data-side='bottom'] {
  left: calc(-1 * var(--extend));
  right: calc(-1 * var(--extend));
  height: 1px;
}

.grid-line[data-side='left'] {
  left: calc(-1 * var(--offset));
}

.grid-line[data-side='right'] {
  right: calc(-1 * var(--offset));
}

.grid-line[data-side='top'] {
  top: calc(-1 * var(--offset));
}

.grid-line[data-side='bottom'] {
  bottom: calc(-1 * var(--offset));
}
</style>
