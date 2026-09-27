# Architecture & technical notes

## Stack & tooling

- **Nuxt** `^4.5.2`, SSR enabled, deployed on **Vercel** (`vercel.json`
  defines only legacy-path redirects: `/discography`, `/blogs/:path*`,
  `/lyrics/:path*` → `/`).
- **`@nuxt/content ^2.13.4`** — markdown + CSV content source.
- **`@nuxt/image ^2.1.0`** — remote domains allow-listed to
  `pbs.twimg.com` and `dispatch-public.s3.amazonaws.com`.
- **`@nuxtjs/tailwindcss ^6.14.0`** + `@tailwindcss/forms` /
  `@tailwindcss/typography`.
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
  shows.csv         tour dates, queried as a Nuxt Content collection
public/             favicons, one static image
```

There is no `server/`, `middleware/`, `plugins/`, `composables/`, or
`stores/` directory — this is a purely content/presentation site with no
custom server logic.

## Content model

- **News**: `content/news/*.md`, frontmatter `title` + `date`, body uses a
  `<!--more-->` marker for excerpts, images use Nuxt Content's inline
  attribute syntax (e.g. `{height="500" width="500"}`).
- **Shows**: `content/shows.csv` (columns: `date,venue,city,country,info,
  ticket-url,ticket-url2`), loaded via `queryContent("shows").findOne()` in
  `app/components/Shows.vue` and filtered/sorted client-side (year filter,
  free-text search, column sort via `sort-es`), rendered as a table on
  desktop and cards on mobile. Treating a CSV as a Nuxt Content collection
  is atypical — most Nuxt Content setups use markdown/YAML/JSON — so don't
  be surprised it doesn't look like the rest of the content pipeline.

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

## Gaps to be aware of

No linting, no formatting tool, no automated tests, no CI pipeline. Any
verification of a change here is manual (`npm run dev` / `npm run build`
+ visual check) — there's no safety net to catch regressions automatically.
