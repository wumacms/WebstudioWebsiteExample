<script setup lang="ts">
import { motion, useInView } from 'motion-v'

const props = withDefaults(defineProps<{
  /** Text to reveal. Use `\n` for an explicit line break. */
  text: string
  /** Delay before the first word starts, in seconds. */
  delay?: number
  /** Delay between consecutive words, in seconds. */
  stagger?: number
  /** Duration of a single word, in seconds. */
  duration?: number
  /** Animate only the first time the text enters the viewport. */
  once?: boolean
}>(), {
  delay: 0,
  stagger: 0.045,
  duration: 0.9,
  once: true
})

const ease = [0.16, 1, 0.3, 1] as const

const hidden = { transform: 'translateY(120%)' }
const visible = { transform: 'translateY(0%)' }

// After a client-side navigation the page is shown already revealed so the
// View Transition carries the change instead of re-running every reveal.
const skip = useRevealSkip()

// The words themselves are fully clipped while hidden, so an observer on them
// would never fire. Observe the (unclipped) root instead and drive every word.
const root = ref<HTMLElement | null>(null)
const inView = useInView(root, { once: props.once, margin: '0px 0px -8% 0px' })

const lines = computed(() => {
  let index = 0
  return props.text.split('\n').map(line =>
    line
      .split(/\s+/)
      .filter(Boolean)
      .map(word => ({ word, index: index++ }))
  )
})
</script>

<template>
  <span
    ref="root"
    class="reveal-text"
  >
    <template
      v-for="(line, lineIndex) in lines"
      :key="lineIndex"
    >
      <br
        v-if="lineIndex > 0"
        class="max-sm:hidden"
      >
      <template
        v-for="{ word, index } in line"
        :key="index"
      >
        <span class="reveal-text__clip">
          <motion.span
            class="reveal-text__word"
            :initial="skip ? false : hidden"
            :animate="skip || inView ? visible : hidden"
            :transition="{ duration, ease, delay: delay + index * stagger }"
          >{{ word }}</motion.span>
        </span>{{ ' ' }}
      </template>
    </template>
  </span>
</template>

<style scoped>
.reveal-text__clip {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  /* Keep descenders (g, y, р, у) inside the clip without touching line-height. */
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;
}

.reveal-text__word {
  display: inline-block;
}
</style>
