<script setup lang="ts">
withDefaults(defineProps<{
  axis?: 'x' | 'y'
  duration?: string
  delay?: string
  /** Length of the glowing segment relative to the track. */
  size?: string
}>(), {
  axis: 'x',
  duration: '4s',
  delay: '0s',
  size: '25%'
})
</script>

<template>
  <div
    aria-hidden="true"
    class="beam-track"
  >
    <div
      class="beam"
      :class="axis === 'x' ? 'beam--x animate-beam-x' : 'beam--y animate-beam-y'"
      :style="{
        animationDuration: duration,
        animationDelay: delay,
        [axis === 'x' ? 'width' : 'height']: size
      }"
    />
  </div>
</template>

<style scoped>
.beam-track {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.beam {
  position: absolute;
  inset: 0;
}

.beam--x {
  background: linear-gradient(to right, transparent, var(--ui-text-highlighted), transparent);
}

.beam--y {
  background: linear-gradient(to bottom, transparent, var(--ui-text-highlighted), transparent);
}
</style>
