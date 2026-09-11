/**
 * Whether reveal animations should be skipped for a component being set up.
 *
 * Reveals play on the first (server-rendered, hydrated) load and on scroll.
 * When a component mounts through a client-side navigation — a locale switch,
 * for example — it is rendered already revealed so the View Transition wipe
 * carries the change instead of every reveal replaying.
 *
 * Reading `isHydrating` at setup time keeps server and client in sync: during
 * hydration both render the hidden initial state, so there is no mismatch.
 */
export function useRevealSkip(): boolean {
  if (import.meta.server) return false
  return !useNuxtApp().isHydrating
}
