// Official brand marks for the author links. Simple Icons ships them as CC0
// paths on a 24x24 grid, so they render as plain inline SVG like everything else.
import { writeFileSync } from 'node:fs';
import { assertGeometricSvg, assertPathData } from './guards.mjs';

const NAMES = ['linkedin', 'telegram', 'x'];
const out = {};
const misses = [];
for (const name of NAMES) {
  const res = await fetch(`https://unpkg.com/simple-icons@13.0.0/icons/${name}.svg`, { redirect: 'error' })
    .catch((e) => ({ ok: false, status: e.cause?.message || e.message }));
  if (!res.ok) { misses.push(`${name} ${res.status}`); continue; }
  const svg = await res.text();
  // Simple Icons adds an accessible <title>; site.js renders the mark aria-hidden, so it is dropped unused.
  const inner = svg.replace(/[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*/, '').replace(/^\s*<title>[^<]*<\/title>/, '').trim();
  assertGeometricSvg(inner, `${name}.svg`);
  const paths = [...inner.matchAll(/<path d="([^"]+)"\s*\/>/g)];
  if (paths.length !== 1) { misses.push(`${name} expected one <path d>, found ${paths.length}`); continue; }
  out[name] = assertPathData(paths[0][1], `${name}.svg`);
}
if (misses.length) {
  console.error('MISS\n  ' + misses.join('\n  '));
  process.exit(1);
}
writeFileSync('tools/brand_icons_data.mjs', 'export const BRAND_ICONS = ' + JSON.stringify(out) + ';\n');
console.log('brand icons written:', Object.keys(out).join(', '));
