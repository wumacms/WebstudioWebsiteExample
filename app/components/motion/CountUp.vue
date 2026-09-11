<script setup lang="ts">
import { animate, useInView } from 'motion-v'

const props = withDefaults(defineProps<{
  to: number
  decimals?: number
  duration?: number
  delay?: number
}>(), {
  decimals: 0,
  duration: 1.8,
  delay: 0
})

const { locale } = useI18n()

const el = useTemplateRef('el')
const inView = useInView(el, { once: true, amount: 0.6 })
const value = ref(0)

const formatted = computed(() => new Intl.NumberFormat(locale.value, {
  minimumFractionDigits: props.decimals,
  maximumFractionDigits: props.decimals
}).format(value.value))

watch(inView, (visible) => {
  if (!visible) return
  animate(0, props.to, {
    duration: props.duration,
    delay: props.delay,
    ease: [0.16, 1, 0.3, 1],
    onUpdate: (latest) => {
      value.value = latest
    }
  })
}, { once: true })
</script>

<template>
  <span
    ref="el"
    class="tabular-nums"
  >{{ formatted }}</span>
</template>
