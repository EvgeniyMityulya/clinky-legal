// Official brand marks for the author links. Simple Icons ships them as CC0
// paths on a 24x24 grid, so they render as plain inline SVG like everything else.
import { writeFileSync } from 'node:fs';

const NAMES = ['linkedin', 'telegram', 'x'];
const out = {};
for (const name of NAMES) {
  const res = await fetch(`https://unpkg.com/simple-icons@13.0.0/icons/${name}.svg`);
  if (!res.ok) { console.log('MISS', name, res.status); continue; }
  const svg = await res.text();
  const d = (svg.match(/ d="([^"]+)"/) || [])[1];
  if (d) out[name] = d;
}
writeFileSync('tools/brand_icons_data.mjs', 'export const BRAND_ICONS = ' + JSON.stringify(out) + ';\n');
console.log('brand icons written:', Object.keys(out).join(', '));
