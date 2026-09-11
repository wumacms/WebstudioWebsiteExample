<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'dots' | 'grid' | 'hatch' | 'cross' | 'glow'
  /** Which part of the pattern stays visible. */
  fade?: 'none' | 'radial' | 'left' | 'right' | 'top' | 'bottom' | 'top-right'
}>(), {
  variant: 'dots',
  fade: 'none'
})

const variants = {
  dots: 'dot-paper',
  grid: 'grid-paper',
  hatch: 'hatch-paper',
  cross: 'cross-paper',
  glow: 'glow-paper'
} as const

const fades = {
  'none': '',
  'radial': 'mask-show-radial',
  'left': 'mask-show-left',
  'right': 'mask-show-right',
  'top': 'mask-show-top',
  'bottom': 'mask-show-bottom',
  'top-right': 'mask-show-top-right'
} as const

const variantClass = computed(() => variants[props.variant])
const fadeClass = computed(() => fades[props.fade])
</script>

<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0"
    :class="fadeClass"
  >
    <div
      class="absolute inset-0"
      :class="variantClass"
    />
  </div>
</template>
