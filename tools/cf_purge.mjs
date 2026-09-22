// Purges the CDN copies of the built assets. The cache rule keeps /assets/* for a
// year, so a request that lands mid-deploy can pin a stale file for that long.
// Run this right after a deploy goes live.
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const SITE = 'https://clinkyapp.com';
const BATCH = 30;   // Cloudflare's per-call cap on purged URLs

// One line of token characters and nothing else; the value itself is never printed.
const tokenFile = readFileSync(process.env.HOME + '/.config/cloudflare/token.txt', 'utf8');
const token = (tokenFile.match(/^([A-Za-z0-9_-]+)\r?\n?$/) || [])[1];
if (!token) { console.error('~/.config/cloudflare/token.txt must hold a single line of [A-Za-z0-9_-]'); process.exit(1); }
const env = readFileSync(process.env.HOME + '/.config/cloudflare/clinky.env', 'utf8');
const zone = (env.match(/CF_ZONE_ID=([A-Za-z0-9]+)/) || [])[1];
if (!zone) { console.error('no zone id'); process.exit(1); }

// Everything under assets/ goes, so a newly added payload (scenarios.js was once missed) cannot slip through.
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.name.startsWith('.') ? [] : e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
// Same 8-char md5 the patchers put in ?v=, so the versioned URL the shells request is purged as well.
const version = (f) => createHash('md5').update(readFileSync(f)).digest('hex').slice(0, 8);

const urls = [];
for (const f of walk('assets').sort()) {
  const url = `${SITE}/${encodeURI(f)}`;
  urls.push(url, `${url}?v=${version(f)}`);
}

let failed = 0;
for (let i = 0; i < urls.length; i += BATCH) {
  const files = urls.slice(i, i + BATCH);
  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
    method: 'POST',
    headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json' },
    body: JSON.stringify({ files })
  });
  const out = await res.json().catch(() => ({}));
  if (out.success) console.log(`purged ${i + files.length}/${urls.length} urls`);
  else { failed++; console.error(`batch ${i / BATCH + 1} failed (${res.status}): ${JSON.stringify(out.errors || out).slice(0, 300)}`); }
}
process.exit(failed ? 1 : 0);
