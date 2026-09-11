<script setup lang="ts">
import { motion, useScroll, useSpring } from 'motion-v'

const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, {
  stiffness: 140,
  damping: 30,
  restDelta: 0.001
})
</script>

<template>
  <motion.div
    aria-hidden="true"
    class="fixed top-0 inset-x-0 z-[60] h-px origin-left bg-inverted pointer-events-none"
    :style="{ scaleX }"
  />
</template>
