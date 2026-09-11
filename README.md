# NORMA — лендинг веб-студии

Рекламный сайт студии на Nuxt 4 + Nuxt UI v4 + motion-v. Строгий стиль в духе Vercel: нулевой `border-radius`, сетка из линий, тёмная и светлая темы, локализация RU/EN, View Transitions.

## Стек

- **Nuxt 4**, Vue 3.5, TypeScript
- **@nuxt/ui v4** — собственная тема (`app/app.config.ts`, `app/assets/css/main.css`)
- **motion-v** — reveal-анимации, счётчики, scroll-progress
- **@nuxtjs/i18n** — `ru` (по умолчанию, без префикса) и `en` (`/en`)
- **@nuxt/fonts** — Onest / Geist Mono
- Картинки кейсов — Lorem Picsum (`https://picsum.photos/seed/<seed>/<w>/<h>`), детерминированные по seed

## Структура

```
app/
  app.vue                     — оболочка: header, рамка страницы, footer
  app.config.ts               — тема Nuxt UI (кнопки, бейджи, header, accordion…)
  assets/css/main.css         — токены, палитра, radius=0, view transitions, keyframes
  composables/useRevealSkip.ts — пропуск reveal после клиентской навигации
  utils/site.ts               — e-mail и ссылки (вне i18n)
  utils/cases.ts              — кейсы: slug, seed картинок, числа для счётчиков
  pages/index.vue             — лендинг
  pages/work/index.vue        — все проекты
  pages/work/[slug].vue       — детальная страница кейса
  components/
    motion/RevealText.vue     — текст «выезжает из щели» по словам (без opacity)
    motion/RevealBlock.vue    — блок выезжает из щели
    motion/CountUp.vue        — анимированный счётчик
    deco/Pattern.vue          — CSS-фоны секций: dots / grid / hatch / cross / glow + маски
    deco/HeroVisual.vue       — композиция hero: перекрестие, кольца, блики, подписи
    deco/Rings.vue            — концентрические пунктирные кольца (вращаются)
    deco/GridCircle.vue       — вращающаяся пунктирная дуга на пересечении линий
    deco/GridLine.vue         — линия сетки (пунктир, fade, вынос за контейнер)
    deco/GridCross.vue        — «плюс» на пересечении
    deco/Beam.vue             — бегущий блик по линии
    deco/Ripple.vue           — расходящиеся пунктирные круги (CTA)
    sections/*.vue            — секции лендинга
    CaseCard.vue              — карточка кейса (общий элемент view transition с детальной страницей)
    ThemeToggle.vue           — смена темы через View Transition (круг из точки клика)
    LocaleSwitcher.vue        — переключение языка
i18n/locales/{ru,en}.json     — все тексты
```

## Правила дизайна

- Никаких скруглений: `--ui-radius: 0` плюс глобальное `border-radius: 0 !important`.
- Широкий контейнер (`--ui-container` в `main.css`, сейчас 85% ширины экрана). Сплошные линии только у рамки и между секциями; внутренние разделители пунктирные (`cells-dashed`, `divider-dashed-*`, `line-dashed-*` в `main.css`).
- Все цвета — семантические токены Nuxt UI (`text-muted`, `bg-elevated`, `border-default`…). Палитра переопределена в `main.css`: чистый чёрный в тёмной теме, чистый белый в светлой.
- Текст не «появляется», а выезжает снизу из обрезающей обёртки (`RevealText`). Блоки — через `RevealBlock`.
- Декоративные элементы (`deco/*`) скрыты на мобильных (`md:block`).
- Уважается `prefers-reduced-motion`: `MotionConfig reduced-motion="user"` и CSS-медиазапросы.

## View Transitions

- Навигация (в том числе смена языка): новая страница «поднимается из щели» снизу (`vt-rise` в `main.css`), шапка закреплена через `view-transition-name: site-header`.
- Смена темы: `ThemeToggle.vue` запускает `document.startViewTransition` и анимирует `clip-path: circle()` из точки клика.
- Карточка кейса и hero-картинка детальной страницы делят `view-transition-name: case-<slug>`, поэтому картинка «перелетает» между страницами.
- Переключение языка идёт через `setLocale()`: он сначала обновляет cookie `i18n_redirected`, затем навигирует. Ссылка на `/` при cookie `en` получила бы 302 на `/en`.
- После клиентской навигации reveal-анимации не повторяются (`useRevealSkip()` смотрит на `nuxtApp.isHydrating`), чтобы переход показывал уже отрисованную страницу. При гидрации сервер и клиент рендерят одинаковое скрытое состояние.

## Команды

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm preview
pnpm lint
pnpm typecheck
```

## Деплой на GitHub Pages

Workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) на каждый push в `master` собирает статику (`pnpm generate`) и публикует `.output/public` через GitHub Pages.

Один раз в настройках репозитория: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Базовый путь вычисляется автоматически шагом `actions/configure-pages`: для репозитория `user.github.io` сайт лежит в корне, для `user/repo` — под `/repo/` (переменная `NUXT_APP_BASE_URL`). Домен для hreflang передаётся в `NUXT_PUBLIC_I18N_BASE_URL` (только origin, без `/repo`: i18n сам добавляет базовый путь).

Локальная проверка сборки под подпуть (в PowerShell, не в Git Bash: MSYS превращает `/repo/` в путь `C:/Program Files/Git/repo`):

```powershell
$env:NUXT_APP_BASE_URL = '/repo/'; pnpm generate
npx serve .output/public   # или любой статический сервер
```

Список маршрутов для prerender задаётся в `nuxt.config.ts` (`nitro.prerender.routes`): обе локали, `/work` и все кейсы из `app/utils/cases.ts`. Неизвестные адреса обслуживает `404.html`.

## Что заменить под реальную студию

- Название и тексты — `i18n/locales/*.json` (`brand.name`, `seo.*`, секции).
- E-mail, Telegram, соцсети — `app/utils/site.ts`.
- `baseUrl` для hreflang — `nuxt.config.ts` → `i18n.baseUrl`.
- Логотип — `app/components/AppLogo.vue`, фавикон — `public/favicon.svg`.
