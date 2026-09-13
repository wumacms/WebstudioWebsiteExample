# NORMA

基于 Nuxt 4 的网络工作室官网。极致克制的视觉风格：无圆角、线条栅格、明暗双主题，中英双语。

## 技术栈

- Nuxt 4、Vue 3、TypeScript
- @nuxt/ui v4，配套自定义主题
- motion-v 负责动效
- @nuxtjs/i18n（默认 `zh`，`en` 在 `/en`）
- 字体 Onest 与 Geist Mono，通过 @nuxt/fonts 加载
- 案例图片按 seed 从 picsum.photos 拉取

## 启动

```bash
pnpm install
pnpm dev
```

其他命令：

```bash
pnpm build      # 服务端构建
pnpm generate   # 静态站点输出到 .output/public
pnpm preview
pnpm lint
pnpm typecheck
```

## 目录结构

```
app/
  app.vue                   顶栏、页面框架、页脚
  app.config.ts             Nuxt UI 主题
  assets/css/main.css       设计变量、调色板、线条、图案、视图过渡
  composables/              组合式函数（如 useRevealSkip）
  utils/site.ts             邮箱与社交链接
  utils/cases.ts            案例：slug、图片 seed、关键数字
  pages/index.vue           首页
  pages/work/index.vue      全部项目
  pages/work/[slug].vue     案例详情页
  components/
    motion/                 RevealText、RevealBlock、CountUp
    deco/                   图案、线条、圆环、光斑
    sections/               首页各分区
    CaseCard.vue            案例卡片
    ThemeToggle.vue         主题切换
    LocaleSwitcher.vue      语言切换
i18n/locales/               所有文案
```

## 实现要点

所有圆角统一为零。通过 `--ui-radius: 0` 与 `main.css` 中全局的 `border-radius: 0 !important` 强制生效。

实线只用于外框与分区之间，所有内部分隔线均使用虚线。相关工具类为 `cells-dashed`、`divider-dashed-*` 与 `line-dashed-*`。

文字不是通过透明度淡入，而是从裁切容器底部向上滑出。单词级动画由 `RevealText` 提供，区块级动画由 `RevealBlock` 提供。跨页面切换后这些动画不再重复，页面切换本身交给 view transition 完成，跳过逻辑封装在 `useRevealSkip` 中。

主题切换通过 `document.startViewTransition` 实现，并以点击点为圆心扩散圆形遮罩。案例卡片与其详情页的大图共用一个 `view-transition-name`，因此图片会在跨页面切换时"飞"过去。

语言切换通过 `setLocale()` 完成：先写入 cookie，再跳转到对应 URL。若 cookie 为 `en` 时直接请求 `/`，会先被重定向到 `/en`——这也是为什么切换必须经过 `setLocale`，避免落入重定向循环。

邮箱与社交链接放在 `utils/site.ts`，而没有放在翻译里：vue-i18n 的消息体对 `@` 符号敏感，写在翻译里会破坏解析。

## 部署到 GitHub Pages

工作流位于 `.github/workflows/deploy.yml`。每次 push 到 `master` 都会构建静态产物并发布到 `.output/public`。

在仓库设置中只需配置一次：`Settings` → `Pages` → `Source` 选 `GitHub Actions`。

基础路径会自动推导：`user.github.io` 的站点部署在根路径，`user/repo` 则部署在 `/repo/`。i18n 仅传入域名，路径由其自行追加。

想在本地预览带子路径的构建结果，可以这样（PowerShell 环境；Git Bash 会把 `/repo/` 替换成实际仓库名）：

```powershell
$env:NUXT_APP_BASE_URL = '/repo/'; pnpm generate
npx serve .output/public
```

执行 `pnpm generate` 前请关闭 dev 服务器，否则它会一直占用 `.output` 目录。

生成路径在 `nuxt.config.ts` 中按两种 locale、`/work` 列表以及 `utils/cases.ts` 中的所有案例拼装而成。

## 二开指引

- 品牌名与文案：`i18n/locales/*.json`
- 邮箱与社交：`app/utils/site.ts`
- hreflang 的 `baseUrl`：`nuxt.config.ts`
- Logo：`app/components/AppLogo.vue`；favicon：`public/favicon.svg`
