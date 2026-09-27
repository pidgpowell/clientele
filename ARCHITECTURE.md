# Architecture & technical notes

## Stack & tooling

- **Nuxt** `^4.5.2`, SSR enabled, deployed on **Vercel** (`vercel.json`
  defines only legacy-path redirects: `/discography`, `/blogs/:path*`,
  `/lyrics/:path*` → `/`).
- **`@nuxt/content ^3.16.1`** — SQL-backed (via **`better-sqlite3`**), schema-defined
  collections configured in `content.config.ts` at the repo root (`news`
  markdown collection, `shows` CSV data collection). Upgraded from v2 on
  2026-09-27; queries now go through `queryCollection()` instead of the old
  `queryContent()`.
- **`@nuxt/image ^2.1.0`** — remote domains allow-listed to
  `pbs.twimg.com`, `dispatch-public.s3.amazonaws.com`, and
  `d1rgjmn2wmqeif.cloudfront.net` (Merge Records' CDN, used by news post
  images). Any image host used in markdown content **must** be added here
  or `<NuxtImg>`/`ProseImg` silently falls back to serving the original,
  un-resized file for every `srcset` breakpoint — no error, just no
  optimization. Check this list whenever a new content image host shows up.
- **`@nuxt/fonts`** — self-hosts Public Sans at build time (see note below);
  no runtime request to Google Fonts.
- **`@nuxtjs/tailwindcss ^6.14.0`** + `@tailwindcss/forms` /
  `@tailwindcss/typography`.
- **`routeRules`** in `nuxt.config.js` prerender `/`, `/news`, `/news/**`,
  and `/shows` at build time (content only changes on a new deploy, so
  there's no reason to re-run SSR per request for these).
- **`sort-es`** — the only runtime `dependency`; everything else (including
  Nuxt itself) is a `devDependency`. Used for client-side sorting in the
  shows table.
- Package manager is **npm** (`package-lock.json`, lockfileVersion 3).
- **No ESLint, no Prettier, no test framework, no CI config** exist in this
  repo. Don't assume `npm run lint`/`npm test` do anything.
- `nuxt.config.js` is plain JS, not TS (unusual for Nuxt 4, but intentional
  — there's no `.ts` config anywhere).

## Directory layout (Nuxt 4 `app/` source structure)

```
app/
  pages/            index.vue, news/index.vue, news/[...slug].vue, shows/index.vue
  components/
    content/        ProseImg.vue, EmbedYouTube.vue  — Nuxt Content prose overrides
    show/           Date.vue, Tickets.vue, Venue.vue — shows-table row pieces
    vendor/         lite-youtube.js — vendored custom element (not npm)
    (top-level)     AppNavigation.vue, Shows.vue, Facebook.vue, Instagram.vue,
                     Twitter.vue, X.vue, Icon*.vue
  layouts/          default.vue
  utils/            formatDate.js  (auto-imported)
content/
  news/*.md         markdown posts (Nuxt Studio-edited)
  shows.csv         tour dates, queried as a Nuxt Content data collection
public/             favicons, one static image
content.config.ts    Nuxt Content v3 collection definitions (news, shows)
```

There is no `server/`, `middleware/`, `plugins/`, `composables/`, or
`stores/` directory — this is a purely content/presentation site with no
custom server logic.

## Content model

- **News**: `content/news/*.md`, frontmatter `title` + `date`, body uses a
  `<!--more-->` marker for excerpts, images use Nuxt Content's inline
  attribute syntax (e.g. `{height="500" width="500"}`).
- **Shows**: `content/shows.csv` (columns: `date,venue,city,country,info,
  ticket-url,ticket-url2`) is a v3 `data` collection defined in
  `content.config.ts` with `source: 'shows.csv'` (single-file, non-glob
  source — v3 treats each CSV row as its own collection item rather than
  nesting rows under a `body` array). Loaded via
  `queryCollection("shows").all()` in `app/components/Shows.vue` and
  filtered/sorted entirely client-side (year filter, free-text search,
  column sort via `sort-es`), rendered as a table on desktop and cards on
  mobile. CSV as a Nuxt Content source is still somewhat atypical
  (most collections are markdown/YAML/JSON) but is natively supported by
  v3 — see https://content.nuxt.com/docs/files/csv.

## Notable patterns & quirks

- **Vendored YouTube embed**: `app/components/vendor/lite-youtube.js` is a
  hand-copied `lite-youtube-embed` custom element (not an npm package). It's
  registered as a valid custom element via `vue.compilerOptions
  .isCustomElement` in `nuxt.config.js`, and used through
  `app/components/content/EmbedYouTube.vue` (dynamically imported inside
  `<client-only>`) as a Nuxt Content prose component. It still carries a
  stray `/* eslint-disable */` comment from wherever it was copied from,
  even though this repo has no ESLint config.
- **`ProseImg.vue`** overrides Nuxt Content's default `<ProseImg>` to
  render through `<NuxtImg>`, so markdown-authored images get Nuxt Image
  optimization automatically.
- **`app/utils/formatDate.js`** shifts every date by `addHours(date, 9)`
  before formatting with `Intl.DateTimeFormat`. This isn't documented
  anywhere — it's likely a workaround for dates crossing a UTC day
  boundary when displayed in the site's target timezone, but treat it as
  a fragile, unexplained behavior rather than settled logic if you touch
  date rendering.
- **`npm install-scripts` gate**: this npm setup blocks native postinstall
  scripts unless the package/version is explicitly listed in
  `package.json`'s `allowScripts`. `better-sqlite3` (required by
  `@nuxt/content` v3) and `esbuild` both need their native build/install
  step approved via `npm install-scripts approve <pkg>` (then
  `npm rebuild <pkg>` for build-step packages) after `npm install` —
  otherwise `nuxt build`/`nuxt dev` fail with "Nuxt Content requires
  better-sqlite3" or a broken esbuild binary.
- **Dev-mode content cache can go stale**: `nuxt dev`'s local database
  (`.data/content/contents.sqlite`) caches parsed content incrementally.
  During active editing of `content/shows.csv` we saw it retain a stray
  edit (`"XXXX"` typed then reverted in a venue name) even after the file
  on disk was back to its original content — the dev server's HMR
  re-parse didn't fully invalidate that row. If shows/news data looks
  wrong/stale in dev despite the file being correct, stop `nuxt dev`,
  `rm -rf .data`, and restart rather than assuming the query code is
  broken.
- **`@nuxt/fonts` + variable fonts**: Public Sans is self-hosted via
  `@nuxt/fonts` (see `fonts.families` in `nuxt.config.js`), replacing the
  old runtime `fonts.googleapis.com` stylesheet link. Google now serves
  Public Sans as a variable-only font — requesting discrete weights
  (`weights: [300, 400, ...]`) makes every "weight" resolve to the *same*
  variable file, and `@nuxt/fonts` emits one `@font-face` per discrete
  weight anyway, so without a range every weight renders identically
  (the browser needs `font-weight: 300 700`, a range, to interpolate a
  variable font). The config uses `weights: ['300 700']` for exactly this
  reason — don't switch it back to a discrete list without checking that
  Tailwind's `font-light`/`font-medium`/etc. still render distinctly.
- **`useImage()` for non-`<NuxtImg>` image URLs** (e.g. `og:image`): it
  returns a **root-relative** path when the image is served through the
  local IPX endpoint, not an absolute URL. Social meta tags require an
  absolute URL, so wrap it in `new URL(path, 'https://theclientele.co.uk')`
  — see `app/layouts/default.vue`.

## Gaps to be aware of

No linting, no formatting tool, no automated tests, no CI pipeline. Any
verification of a change here is manual (`npm run dev` / `npm run build`
+ visual check) — there's no safety net to catch regressions automatically.
