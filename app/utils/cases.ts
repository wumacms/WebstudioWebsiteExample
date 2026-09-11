/**
 * Case studies. Copy lives in `i18n/locales/*.json` under `work.items.<slug>`;
 * this file holds only what must not be translated: slugs, image seeds and
 * the numbers behind the result counters.
 */
export interface CaseResult {
  key: 'r1' | 'r2' | 'r3'
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
}

export interface CaseStudy {
  slug: string
  /** Lorem Picsum seed — the same seed always returns the same photo. */
  seed: string
  results: CaseResult[]
}

export const cases: CaseStudy[] = [
  {
    slug: 'atlas',
    seed: 'norma-atlas',
    results: [
      { key: 'r1', value: 140, prefix: '+', suffix: '%' },
      { key: 'r2', value: 0.9, decimals: 1, suffix: 's' },
      { key: 'r3', value: 4.8, decimals: 1 }
    ]
  },
  {
    slug: 'orbit',
    seed: 'norma-orbit',
    results: [
      { key: 'r1', value: 0.7, decimals: 1, suffix: 's' },
      { key: 'r2', value: 40, suffix: 'ms' },
      { key: 'r3', value: 62, prefix: '+', suffix: '%' }
    ]
  },
  {
    slug: 'lumen',
    seed: 'norma-lumen',
    results: [
      { key: 'r1', value: 9.4, decimals: 1, suffix: '%' },
      { key: 'r2', value: 2, prefix: '×' },
      { key: 'r3', value: 5 }
    ]
  }
]

export function findCase(slug: string) {
  return cases.find(c => c.slug === slug)
}

export function nextCase(slug: string) {
  const index = cases.findIndex(c => c.slug === slug)
  return cases[(index + 1) % cases.length]!
}

/** Deterministic placeholder photo from Lorem Picsum. */
export function caseImage(seed: string, width: number, height: number, variant = '') {
  return `https://picsum.photos/seed/${seed}${variant}/${width}/${height}`
}
