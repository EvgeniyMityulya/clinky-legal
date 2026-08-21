// Downloads the Phosphor SVGs we actually use and writes them as inline paths,
// so the site stops loading three icon-font stylesheets from a CDN.
import { writeFileSync } from 'node:fs';

const PAIRS = `arrow-left|bold
arrow-right|bold
arrows-left-right|bold
beer-bottle|fill
bell|fill
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
heart|fill
list|bold
lock-simple|fill
shield-check|fill
target|bold
trophy|fill
user-circle|fill
users-three|fill
x|bold`.split('\n').map((l) => l.trim().split('|'));

const out = {};
for (const [name, weight] of PAIRS) {
  const file = weight === 'regular' ? `${name}.svg` : `${name}-${weight}.svg`;
  const url = `https://unpkg.com/@phosphor-icons/core@2.1.1/assets/${weight}/${file}`;
  const res = await fetch(url);
  if (!res.ok) { console.log('MISS', weight, name, res.status); continue; }
  const svg = await res.text();
  const inner = svg.replace(/[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*/, '').trim()
    .replace(/\s*fill="[^"]*"/g, '').replace(/\s+/g, ' ');
  out[`${name}|${weight}`] = inner;
}
writeFileSync('tools/icons_data.mjs', 'export const ICON_PATHS = ' + JSON.stringify(out, null, 0) + ';\n');
console.log('icons written:', Object.keys(out).length);
