# Site build tools

The landing page is a hand-written SPA (`assets/site.js`). Everything SEO-related is generated,
so edit the sources in this folder and re-run the scripts. Editing the generated HTML directly
gets overwritten on the next build.

## Sources

| File | What lives there |
|---|---|
| `pages.mjs` | Copy for the question hub and the three question packs, EN + RU (titles, descriptions, ledes, intros, rules, per-page FAQ) |
| `faq_home.mjs` | The home-page FAQ, EN + RU. Single source: it feeds the visible FAQ section in `site.js`, the FAQPage JSON-LD and the prerendered fallback |
| `shell_meta.mjs` | Per-page title, description, canonical, hreflang pairs and Open Graph copy for the SPA shells |
| `../data/*.json` | The question sets, copied from the iOS app (`Clinky/Resources/IceBreakers/`) |

## Scripts

```bash
node tools/build.mjs         # question hub + sitemap.xml + robots.txt
node tools/patch_shells.mjs  # SPA shells: meta, canonical, JSON-LD, prerendered fallback
node tools/patch_site_js.mjs # site.js: FAQ data, home FAQ section, links to the hub
```

All three are idempotent, so running them twice changes nothing. Run all three after touching any source.

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
