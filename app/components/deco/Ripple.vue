<script setup lang="ts">
const rings = [90, 180, 270, 360, 450]
</script>

<template>
  <svg
    aria-hidden="true"
    class="ripple"
    viewBox="0 0 900 900"
    fill="none"
  >
    <circle
      v-for="(r, i) in rings"
      :key="r"
      class="ripple-ring"
      cx="450"
      cy="450"
      :r="r"
      stroke="currentColor"
      stroke-dasharray="2 4"
      :style="{ animationDelay: `${i * 0.7}s` }"
    />
  </svg>
</template>

<style scoped>
.ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(140%, 900px);
  aspect-ratio: 1;
  translate: -50% -50%;
  color: var(--ui-text-dimmed);
  pointer-events: none;
}

.ripple-ring {
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: ripple 4.2s var(--ease-out-quart) infinite;
}
</style>
