// Downloads the Phosphor SVGs we actually use and writes them as inline paths,
// so the site stops loading three icon-font stylesheets from a CDN.
import { writeFileSync } from 'node:fs';
import { assertGeometricSvg } from './guards.mjs';

const PAIRS = `arrow-left|bold
arrow-right|bold
arrows-left-right|bold
beer-bottle|fill
bell|fill
briefcase|fill
chart-bar|fill
chat-circle|bold
chat-teardrop-dots|fill
check-circle|fill
check|bold
clock|fill
coffee|fill
cube|fill
envelope|regular
eye-slash|bold
flame|fill
game-controller|fill
hand-heart|fill
heart|fill
list|bold
lock-simple|fill
paper-plane-tilt|fill
shield-check|fill
target|bold
trophy|fill
user-circle|fill
users-three|fill
x|bold`.split('\n').map((l) => l.trim().split('|'));

const out = {};
const misses = [];
for (const [name, weight] of PAIRS) {
  const file = weight === 'regular' ? `${name}.svg` : `${name}-${weight}.svg`;
  const url = `https://unpkg.com/@phosphor-icons/core@2.1.1/assets/${weight}/${file}`;
  // a redirect means the pinned file moved, which is worth a look before anything ships
  const res = await fetch(url, { redirect: 'error' }).catch((e) => ({ ok: false, status: e.cause?.message || e.message }));
  if (!res.ok) { misses.push(`${weight} ${name} ${res.status}`); continue; }
  const svg = await res.text();
  const inner = svg.replace(/[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*/, '').trim();
  assertGeometricSvg(inner, `${weight}/${file}`);
  out[`${name}|${weight}`] = inner.replace(/\s*fill="[^"]*"/g, '').replace(/\s+/g, ' ');
}
// a partial map would silently drop icons from the site, so nothing is written
if (misses.length) {
  console.error('MISS\n  ' + misses.join('\n  '));
  process.exit(1);
}
writeFileSync('tools/icons_data.mjs', 'export const ICON_PATHS = ' + JSON.stringify(out, null, 0) + ';\n');
console.log('icons written:', Object.keys(out).length);
