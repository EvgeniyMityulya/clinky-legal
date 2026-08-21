// Purges the CDN copies of the built assets. The cache rule keeps /assets/* for a
// year, so a request that lands mid-deploy can pin a stale file for that long.
// Run this right after a deploy goes live.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const token = readFileSync(process.env.HOME + '/.config/cloudflare/token.txt', 'utf8').trim();
const env = readFileSync(process.env.HOME + '/.config/cloudflare/clinky.env', 'utf8');
const zone = (env.match(/CF_ZONE_ID=([A-Za-z0-9]+)/) || [])[1];
if (!zone) { console.log('no zone id'); process.exit(1); }

const hash = (f) => execSync(`md5 -q ${f}`).toString().trim().slice(0, 8);
const files = ['site.css', 'site.min.js', 'hero3d.min.js', 'motion.min.js', 'legal-content.min.js', 'web-deck.js', 'game-content.js'];
const urls = [];
for (const f of files) {
  urls.push(`https://clinkyapp.com/assets/${f}`);
  try { urls.push(`https://clinkyapp.com/assets/${f}?v=${hash('assets/' + f)}`); } catch (e) {}
}

const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
  method: 'POST',
  headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json' },
  body: JSON.stringify({ files: urls })
});
const out = await res.json();
console.log(out.success ? `purged ${urls.length} urls` : JSON.stringify(out.errors || out).slice(0, 300));
