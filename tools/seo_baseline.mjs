// Captures the SEO-critical parts of every page in the sitemap and diffs them
// against the stored snapshot, so a regression shows up before Google notices.
//   node tools/seo_baseline.mjs --save    write snapshots/seo-baseline.json
//   node tools/seo_baseline.mjs          compare the live site to the snapshot
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const SNAP = 'snapshots/seo-baseline.json';
const save = process.argv.includes('--save');
const local = process.argv.includes('--local');
const base = local ? 'http://127.0.0.1:8899' : 'https://clinkyapp.com';

const paths = [...readFileSync('sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].replace('https://clinkyapp.com', ''));

const pick = (html, re) => (html.match(re) || [, ''])[1].trim();

async function capture(path) {
  const res = await fetch(base + path);
  const html = await res.text();
  const prerender = (html.match(/<div id="prerender">([\s\S]*?)<\/div>\s*<\/div>/) || html.match(/<div id="prerender">([\s\S]*)/) || [, ''])[1];
  const words = prerender.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  let schemaTypes = [];
  try { schemaTypes = (JSON.parse(ld ? ld[1] : '{}')['@graph'] || []).map((n) => n['@type']).sort(); } catch (e) {}
  return {
    status: res.status,
    title: pick(html, /<title>([^<]*)<\/title>/),
    description: pick(html, /<meta name="description" content="([^"]*)"/),
    canonical: pick(html, /<link rel="canonical" href="([^"]*)"/),
    robots: pick(html, /<meta name="robots" content="([^"]*)"/),
    h1: pick(html, /<h1[^>]*>([^<]*)/),
    hreflang: [...html.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]).sort(),
    schemaTypes,
    prerenderWords: words
  };
}

const now = {};
for (const p of paths) now[p] = await capture(p);

if (save) {
  if (!existsSync('snapshots')) mkdirSync('snapshots');
  writeFileSync(SNAP, JSON.stringify(now, null, 2) + '\n');
  console.log(`baseline saved: ${paths.length} pages`);
  process.exit(0);
}

const old = JSON.parse(readFileSync(SNAP, 'utf8'));
const HIGH = new Set(['status', 'canonical', 'robots', 'title', 'h1']);
let high = 0, low = 0;
for (const p of new Set([...Object.keys(old), ...Object.keys(now)])) {
  const a = old[p], b = now[p];
  if (!a) { console.log(`NEW  ${p}`); low++; continue; }
  if (!b) { console.log(`GONE ${p}  (dropped from the sitemap)`); high++; continue; }
  for (const k of Object.keys(b)) {
    const av = JSON.stringify(a[k]), bv = JSON.stringify(b[k]);
    if (av === bv) continue;
    if (k === 'prerenderWords') {
      const drop = (a[k] - b[k]) / Math.max(1, a[k]);
      if (drop > 0.2) { console.log(`HIGH ${p} words ${a[k]} -> ${b[k]}`); high++; }
      continue;
    }
    const sev = HIGH.has(k) ? 'HIGH' : 'low ';
    console.log(`${sev} ${p} ${k}\n     was: ${av}\n     now: ${bv}`);
    HIGH.has(k) ? high++ : low++;
  }
}
console.log(`\n${high} high, ${low} low`);
process.exit(high ? 1 : 0);
