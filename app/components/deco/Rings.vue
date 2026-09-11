<script setup lang="ts">
const rings = [
  { r: 70, duration: '36s', reverse: false, dash: '2 4' },
  { r: 140, duration: '52s', reverse: true, dash: '2 4' },
  { r: 210, duration: '70s', reverse: false, dash: '2 6' },
  { r: 280, duration: '90s', reverse: true, dash: '2 8' },
  { r: 350, duration: '120s', reverse: false, dash: '1 9' }
]
</script>

<template>
  <svg
    aria-hidden="true"
    class="rings"
    viewBox="0 0 720 720"
    fill="none"
  >
    <circle
      v-for="ring in rings"
      :key="ring.r"
      class="rings__ring"
      :class="{ 'rings__ring--reverse': ring.reverse }"
      cx="360"
      cy="360"
      :r="ring.r"
      stroke="currentColor"
      :stroke-dasharray="ring.dash"
      :style="{ animationDuration: ring.duration }"
    />
    <!-- a solid quarter arc, the "hand" of the composition -->
    <path
      class="rings__ring"
      d="M360 150A210 210 0 0 1 570 360"
      stroke="currentColor"
      stroke-width="1.5"
      style="animation-duration: 24s; color: var(--ui-text-muted)"
    />
  </svg>
</template>

<style scoped>
.rings {
  color: var(--ui-text-dimmed);
  pointer-events: none;
}

.rings__ring {
  transform-box: view-box;
  transform-origin: 360px 360px;
  animation: grid-spin linear infinite;
}

.rings__ring--reverse {
  animation-direction: reverse;
}

@media (prefers-reduced-motion: reduce) {
  .rings__ring {
    animation: none;
  }
}
</style>
