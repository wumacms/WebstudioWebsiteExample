<script setup lang="ts">
import { motion, useInView } from 'motion-v'

const props = withDefaults(defineProps<{
  delay?: number
  duration?: number
  /** How far the content travels from below the slit. Any CSS length or percentage. */
  distance?: string
  once?: boolean
}>(), {
  delay: 0,
  duration: 1,
  distance: '100%',
  once: true
})

const ease = [0.16, 1, 0.3, 1] as const

const hidden = computed(() => ({ transform: `translateY(${props.distance})` }))
const visible = { transform: 'translateY(0%)' }

// After a client-side navigation the block is shown already revealed so the
// View Transition carries the change instead of re-running the reveal.
const skip = useRevealSkip()

// The inner block is clipped while hidden, so observe the wrapper instead.
const root = useTemplateRef('root')
const inView = useInView(root, { once: props.once, margin: '0px 0px -8% 0px' })
</script>

<template>
  <div
    ref="root"
    class="reveal-block overflow-hidden"
  >
    <motion.div
      class="reveal-block__inner h-full"
      :initial="skip ? false : hidden"
      :animate="skip || inView ? visible : hidden"
      :transition="{ duration, ease, delay }"
    >
      <slot />
    </motion.div>
  </div>
</template>
