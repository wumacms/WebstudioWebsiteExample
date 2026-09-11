<script setup lang="ts">
withDefaults(defineProps<{
  side?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}>(), {
  side: 'top-left'
})
</script>

<template>
  <span
    aria-hidden="true"
    class="grid-cross hidden md:block"
    :data-side="side"
  />
</template>

<style scoped>
.grid-cross {
  position: absolute;
  z-index: 3;
  width: 13px;
  height: 13px;
  pointer-events: none;
  color: var(--ui-text-dimmed);
}

.grid-cross::before,
.grid-cross::after {
  content: '';
  position: absolute;
  background: currentColor;
}

.grid-cross::before {
  left: 0;
  right: 0;
  top: 6px;
  height: 1px;
}

.grid-cross::after {
  top: 0;
  bottom: 0;
  left: 6px;
  width: 1px;
}

.grid-cross[data-side='top-left'] {
  top: -7px;
  left: -7px;
}

.grid-cross[data-side='top-right'] {
  top: -7px;
  right: -7px;
}

.grid-cross[data-side='bottom-left'] {
  bottom: -7px;
  left: -7px;
}

.grid-cross[data-side='bottom-right'] {
  bottom: -7px;
  right: -7px;
}
</style>
