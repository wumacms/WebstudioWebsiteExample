export function useRevealSkip(): boolean {
  if (import.meta.server) return false
  return !useNuxtApp().isHydrating
}
