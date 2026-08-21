# Site build tools

The landing page is a hand-written SPA (`assets/site.js`). Everything SEO-related is generated,
so edit the sources in this folder and re-run the scripts. Editing the generated HTML directly
gets overwritten on the next build.

## Sources

| File | What lives there |
|---|---|
| `game_content.mjs` | Per-game editorial copy, EN + RU (tagline, who it fits, intro, rules, ways to play, tips, per-game FAQ). Feeds the play pages, the games hub cards, the FAQPage JSON-LD and the prerender |
| `web_deck.mjs` | The website-only card decks and the daily limit. Kept separate from the app set on purpose |
| `faq_home.mjs` | The home-page FAQ, EN + RU. Single source: it feeds the visible FAQ section in `site.js`, the FAQPage JSON-LD and the prerendered fallback |
| `shell_meta.mjs` | Per-page title, description, canonical, hreflang pairs and Open Graph copy for the SPA shells |
| `../data/*.json` | The question sets, copied from the iOS app (`Clinky/Resources/IceBreakers/`) |

## Scripts

```bash
node tools/build.mjs              # sitemap.xml + robots.txt
node tools/build_deck.mjs         # web_deck.mjs -> assets/web-deck.js
node tools/build_game_content.mjs # game_content.mjs -> assets/game-content.js
node tools/patch_site_js.mjs      # site.js: FAQ data, doc titles, games page wiring
node tools/minify.mjs             # assets/*.js -> assets/*.min.js (shells load the minified twins)
node tools/patch_shells.mjs       # shells: meta, canonical, JSON-LD, prerender, cache-busting hashes
node tools/indexnow.mjs           # tells Bing and Yandex what changed (run after the deploy is live)
```

`indexnow.mjs` reads sitemap.xml, so it stays in sync with what we publish. Pass a
substring to submit only part of it, e.g. `node tools/indexnow.mjs /play/`. The key file
at the repo root must stay reachable at https://clinkyapp.com/<key>.txt.

Order matters: build the data bundles and patch the sources first, minify, then patch the shells
so the version hashes match the files that ship. Every script is idempotent.

`assets/game-content.js` and `assets/web-deck.js` load on demand from the games and play pages,
so they stay out of the main bundle.

`assets/*.js` stay readable and are the files you edit. `assets/*.min.js` are generated
and referenced by the shells, so a source edit without `minify.mjs` will not reach the site.

## Refreshing the questions

```bash
cp "$HOME/Pet Projects/Learning/Clinky/Clinky/Resources/IceBreakers/"{never_have_i,would_you_rather,tell_a_moment}.json data/
node tools/build.mjs
```

The `roulette.json` set is intentionally left out of the website: its cards need two player names
(`{A}` and `{B}`) and read as broken text without them.

## Analytics and verification

Both are opt-in through environment variables, so nothing is embedded until you pass a value:

```bash
CF_BEACON_TOKEN=xxxx node tools/patch_shells.mjs   # Cloudflare Web Analytics beacon
GSC_VERIFY=xxxx node tools/patch_shells.mjs        # Google Search Console meta tag
```

If the domain is proxied through Cloudflare, Web Analytics can be switched on in the dashboard
instead and the beacon gets injected at the edge. In that case leave `CF_BEACON_TOKEN` unset.

## Local preview

```bash
python3 -m http.server 8765
```

Extension-less paths like `/about` only work on GitHub Pages, not in `http.server`. Use `/about.html` locally.
