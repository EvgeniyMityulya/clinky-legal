import { writeFileSync } from 'node:fs';

const SITE = 'https://clinkyapp.com';
const URLS = [
  { path: '/', pri: '1.0' },
  { path: '/games', pri: '0.9' },
  { path: '/about', pri: '0.6' },
  { path: '/support', pri: '0.5' },
  { path: '/privacy', pri: '0.3' },
  { path: '/terms', pri: '0.3' },
  { path: '/privacy-ru', pri: '0.3' },
  { path: '/terms-ru', pri: '0.3' }
];

writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map((u) => `  <url><loc>${SITE}${u.path}</loc><priority>${u.pri}</priority></url>`).join('\n')}
</urlset>
`);

writeFileSync('robots.txt', `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

console.log(`sitemap.xml: ${URLS.length} urls, robots.txt written`);
