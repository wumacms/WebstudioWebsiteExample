# NORMA

Сайт веб-студии на Nuxt 4. Строгий стиль: нет скруглений, сетка из линий, тёмная и светлая тема, русский и английский.

## Стек

- Nuxt 4, Vue 3, TypeScript
- @nuxt/ui v4 со своей темой
- motion-v для анимаций
- @nuxtjs/i18n (ru по умолчанию, en на `/en`)
- шрифты Onest и Geist Mono через @nuxt/fonts
- картинки кейсов берутся с picsum.photos по seed

## Запуск

```bash
pnpm install
pnpm dev
```

Остальные команды:

```bash
pnpm build      # серверная сборка
pnpm generate   # статика в .output/public
pnpm preview
pnpm lint
pnpm typecheck
```

## Где что лежит

```
app/
  app.vue                   шапка, рамка страницы, футер
  app.config.ts             тема Nuxt UI
  assets/css/main.css       токены, палитра, линии, паттерны, view transitions
  composables/              useRevealSkip
  utils/site.ts             почта и ссылки
  utils/cases.ts            кейсы: slug, seed картинок, цифры
  pages/index.vue           главная
  pages/work/index.vue      все проекты
  pages/work/[slug].vue     страница кейса
  components/
    motion/                 RevealText, RevealBlock, CountUp
    deco/                   паттерны, линии, кольца, блики
    sections/               секции главной
    CaseCard.vue            карточка кейса
    ThemeToggle.vue         смена темы
    LocaleSwitcher.vue      смена языка
i18n/locales/               все тексты
```

## Как это устроено

Радиус скруглений везде ноль. Это задано через `--ui-radius: 0` и глобальный `border-radius: 0 !important` в `main.css`.

Сплошные линии только у рамки и между секциями. Все внутренние разделители пунктирные. За это отвечают утилиты `cells-dashed`, `divider-dashed-*` и `line-dashed-*`.

Текст не появляется через прозрачность, а выезжает снизу из обрезанной обёртки. Это `RevealText` для слов и `RevealBlock` для блоков. После перехода между страницами эти анимации не повторяются, страницу показывает сам view transition. Логика в `useRevealSkip`.

Смена темы идёт через `document.startViewTransition` с кругом из точки клика. Карточка кейса и большая картинка на его странице делят один `view-transition-name`, поэтому картинка перелетает между страницами.

Язык переключается через `setLocale()`. Он сначала пишет cookie, потом переходит на нужный адрес. Обычная ссылка на `/` при cookie `en` вернула бы редирект на `/en`.

Почта и ссылки лежат в `utils/site.ts`, а не в переводах: символ `@` внутри сообщений vue-i18n ломает парсер.

## Деплой на GitHub Pages

Workflow в `.github/workflows/deploy.yml`. На каждый push в `master` он собирает статику и выкладывает `.output/public`.

Один раз в настройках репозитория: Settings, Pages, Source: GitHub Actions.

Базовый путь считается сам. Для репозитория `user.github.io` сайт лежит в корне, для `user/repo` под `/repo/`. В i18n передаётся только домен, путь он добавляет сам.

Проверить сборку под подпуть локально можно так (в PowerShell, Git Bash подменяет значение `/repo/` на путь к своей папке):

```powershell
$env:NUXT_APP_BASE_URL = '/repo/'; pnpm generate
npx serve .output/public
```

Перед `pnpm generate` остановите dev-сервер, иначе он держит папку `.output`.

Список страниц для генерации собирается в `nuxt.config.ts` из обеих локалей, `/work` и кейсов из `utils/cases.ts`.

## Что поменять под себя

- название и тексты в `i18n/locales/*.json`
- почта и соцсети в `app/utils/site.ts`
- `baseUrl` для hreflang в `nuxt.config.ts`
- логотип в `app/components/AppLogo.vue`, фавикон в `public/favicon.svg`
