// Notifies Bing and Yandex about new or changed URLs. Reads the sitemap so the
// list never drifts from what we actually publish.
import { readFileSync } from 'node:fs';
import { INDEXNOW_KEY } from './indexnow_key.mjs';

const HOST = 'clinkyapp.com';
const urls = [...readFileSync('sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const only = process.argv.slice(2);
const list = only.length ? urls.filter((u) => only.some((f) => u.includes(f))) : urls;

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`, urlList: list })
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${list.length} urls`);
if (res.status !== 200 && res.status !== 202) console.log(await res.text());
