export default defineAppConfig({
  ui: {
    colors: {
      primary: 'neutral',
      neutral: 'neutral'
    },
    button: {
      slots: {
        base: 'rounded-none font-medium tracking-tight cursor-pointer select-none transition-[background-color,color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--ui-bg) focus-visible:ring-primary'
      },
      variants: {
        size: {
          lg: {
            base: 'h-10 px-4 text-sm gap-2'
          },
          xl: {
            base: 'h-12 px-6 text-sm gap-2'
          }
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: 'bg-primary text-inverted hover:bg-primary/80 active:bg-primary/70'
        },
        {
          color: 'neutral',
          variant: 'outline',
          class: 'ring-1 ring-inset ring-accented text-highlighted bg-default hover:bg-elevated active:bg-accented'
        },
        {
          color: 'neutral',
          variant: 'ghost',
          class: 'text-muted hover:text-highlighted hover:bg-elevated'
        }
      ]
    },
    badge: {
      slots: {
        base: 'rounded-none font-mono uppercase tracking-[0.12em]'
      },
      compoundVariants: [
        {
          color: 'neutral',
          variant: 'outline',
          class: 'ring-1 ring-inset ring-default text-muted bg-transparent'
        }
      ]
    },
    header: {
      slots: {
        root: 'bg-default/80 backdrop-blur-md border-b border-default h-(--ui-header-height) sticky top-0 z-50 [view-transition-name:site-header]',
        container: 'px-6 lg:px-12',
        body: 'p-6'
      }
    },
    navigationMenu: {
      slots: {
        link: 'text-sm font-normal before:rounded-none',
        childLink: 'before:rounded-none'
      },
      variants: {
        active: {
          false: {
            link: 'text-muted hover:text-highlighted'
          },
          true: {
            link: 'text-highlighted'
          }
        }
      }
    },
    accordion: {
      slots: {
        item: 'border-b border-default last:border-b-0',
        trigger: 'py-5 text-base font-medium text-highlighted rounded-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary',
        body: 'pb-6 text-sm sm:text-base text-muted max-w-2xl leading-relaxed',
        trailingIcon: 'size-4 text-muted'
      }
    },
    dropdownMenu: {
      slots: {
        content: 'rounded-none shadow-none ring-1 ring-default bg-default',
        item: 'rounded-none before:rounded-none text-sm cursor-pointer',
        group: 'p-0',
        viewport: 'divide-y divide-default'
      }
    },
    tooltip: {
      slots: {
        content: 'rounded-none shadow-none ring-1 ring-default bg-default text-highlighted font-mono text-xs'
      }
    },
    marquee: {
      slots: {
        root: '[--gap:--spacing(0)] [--duration:40s]',
        content: 'gap-0'
      }
    }
  }
})
