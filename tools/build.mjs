import { writeFileSync } from 'node:fs';

const SITE = 'https://clinkyapp.com';
const PAGES = [
  { path: 'games', pri: '0.9' },
  { path: 'about', pri: '0.6' },
  { path: 'support', pri: '0.5' },
  { path: 'privacy', pri: '0.3' },
  { path: 'terms', pri: '0.3' }
];

// Each page ships an EN and a RU address, linked by hreflang in the shells.
const URLS = [
  { path: '/', pri: '1.0', alt: '/ru/' },
  { path: '/play/never-have-i-ever', pri: '0.9', alt: '/ru/play/ya-nikogda-ne' },
  { path: '/ru/play/ya-nikogda-ne', pri: '0.9', alt: '/play/never-have-i-ever' },
  { path: '/play/roulette', pri: '0.8', alt: '/ru/play/ruletka' },
  { path: '/ru/play/ruletka', pri: '0.8', alt: '/play/roulette' },
  { path: '/play/questions-to-ask-friends', pri: '0.8', alt: '/ru/play/voprosy-druzyam' },
  { path: '/ru/play/voprosy-druzyam', pri: '0.8', alt: '/play/questions-to-ask-friends' },
  { path: '/play/would-you-rather', pri: '0.8', alt: '/ru/play/chto-vyberesh' },
  { path: '/ru/play/chto-vyberesh', pri: '0.8', alt: '/play/would-you-rather' },
  { path: '/questions/for-couples', pri: '0.8', alt: '/ru/voprosy/dlya-pary' },
  { path: '/ru/voprosy/dlya-pary', pri: '0.8', alt: '/questions/for-couples' },
  { path: '/questions/party', pri: '0.8', alt: '/ru/voprosy/za-stolom' },
  { path: '/ru/voprosy/za-stolom', pri: '0.8', alt: '/questions/party' },
  { path: '/questions/first-date', pri: '0.8', alt: '/ru/voprosy/pervoe-svidanie' },
  { path: '/ru/voprosy/pervoe-svidanie', pri: '0.8', alt: '/questions/first-date' },
  { path: '/ru/', pri: '1.0', alt: '/' },
  ...PAGES.map((p) => ({ path: `/${p.path}`, pri: p.pri, alt: `/ru/${p.path}` })),
  ...PAGES.map((p) => ({ path: `/ru/${p.path}`, pri: p.pri, alt: `/${p.path}` }))
];

writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${URLS.map((u) => `  <url>
    <loc>${SITE}${u.path}</loc>
    <xhtml:link rel="alternate" hreflang="${u.path.startsWith('/ru') ? 'en' : 'ru'}" href="${SITE}${u.alt}"/>
    <xhtml:link rel="alternate" hreflang="${u.path.startsWith('/ru') ? 'ru' : 'en'}" href="${SITE}${u.path}"/>
    <priority>${u.pri}</priority>
  </url>`).join('\n')}
</urlset>
`);

writeFileSync('robots.txt', `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

console.log(`sitemap.xml: ${URLS.length} urls, robots.txt written`);
