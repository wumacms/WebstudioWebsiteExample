<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

async function toggle(event: MouseEvent) {
  const next = colorMode.value === 'dark' ? 'light' : 'dark'
  const root = document.documentElement
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!document.startViewTransition || prefersReduced) {
    colorMode.preference = next
    return
  }

  // Keyboard activation reports 0,0 — fall back to the button centre.
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const x = event.clientX || rect.left + rect.width / 2
  const y = event.clientY || rect.top + rect.height / 2
  const r = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  root.classList.add('theme-transition')

  // Rendering is paused while the update callback runs, so never wait for
  // requestAnimationFrame here — it would never fire and the transition
  // would abort with a timeout. `nextTick` is enough for the class to switch.
  const transition = document.startViewTransition(async () => {
    colorMode.preference = next
    await nextTick()
  })

  try {
    await transition.ready
    root.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${r}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 700,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
    await transition.finished
  } catch {
    // Aborted or skipped transitions still leave the theme applied.
  } finally {
    root.classList.remove('theme-transition')
  }
}
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    square
    :aria-label="t('nav.theme')"
    @click="toggle"
  >
    <UIcon
      name="i-lucide-sun"
      class="size-4 hidden dark:block"
    />
    <UIcon
      name="i-lucide-moon"
      class="size-4 dark:hidden"
    />
  </UButton>
</template>
