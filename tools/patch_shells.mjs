import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const assetVer = (file) => {
  try { return createHash('md5').update(readFileSync(file)).digest('hex').slice(0, 8); }
  catch (e) { return '0'; }
};

import { SITE, SHELLS } from './shell_meta.mjs';
import { FAQ_SUPPORT } from './faq_support.mjs';
import { FAQ_GAMES } from './faq_games.mjs';
import { GAMES_META } from './games_meta.mjs';


const CF_BEACON = process.env.CF_BEACON_TOKEN || '';
const GSC = process.env.GSC_VERIFY || '';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const DROP = [
  /^\s*<meta name="robots"/i,
  /^\s*<title>/i,
  /^\s*<meta name="description"/i,
  /^\s*<meta property="og:/i,
  /^\s*<meta name="twitter:/i,
  /^\s*<link rel="canonical"/i,
  /^\s*<link rel="alternate"/i,
  /^\s*<meta name="google-site-verification"/i
];

const PRERENDER_CSS = `<style>
#prerender{max-width:720px;margin:0 auto;padding:38px 22px 60px;font:400 17px/1.6 "DM Sans",-apple-system,system-ui,sans-serif;color:#1C1326}
#prerender h1{font-family:Nunito,sans-serif;font-size:34px;line-height:1.2;margin:0 0 14px}
#prerender h2{font-family:Nunito,sans-serif;font-size:24px;margin:36px 0 10px}
#prerender h3{font-size:18px;margin:22px 0 6px}
#prerender p{margin:0 0 14px}
#prerender a{color:#E11D48}
#prerender nav{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:26px;font-weight:600}
#prerender ul{padding-left:20px}
#prerender .eyebrow{color:#E11D48;font-weight:800;font-size:13px;letter-spacing:.08em;text-transform:uppercase}
</style>`;

function faqHtml(faq) {
  return faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('\n');
}

function faqSchema(faq) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

function sampleQuestions(loc, n) {
  const names = { en: { A: 'Alex', B: 'Sam' }, ru: { A: 'Аня', B: 'Макс' } }[loc];
  return GAMES_META.map((g) => {
    let qs = [];
    try {
      const items = JSON.parse(readFileSync(`data/${g.id}.json`, 'utf8'));
      qs = items.slice(0, n).map((q) => q.text[loc]
        .replace(/\{A\}/g, names.A).replace(/\{B\}/g, names.B).replace(/\*/g, ''));
    } catch (e) {}
    return { title: g.title[loc], href: '/games', qs };
  });
}

function homePrerender(loc) {
  const t = loc === 'ru'
    ? {
        eyebrow: 'Скоро в App Store', h1: 'Преврати встречи в игру',
        lede: 'Лёгкий повод видеться чаще. Карточки-игры для любой компании и 3D-напиток за каждый «чок».',
        cta: 'Встать в очередь', gamesTitle: 'Эти вопросы раскроют любого',
        gamesSub: 'Это реальные карточки из приложения. Полные наборы можно листать прямо на сайте.',
        problemTitle: 'Собраться компанией бывает та ещё задачка',
        problemBody: 'То никак не собраться, то собрались, а поговорить не о чем. С лёгким напоминанием и парой игр всё идёт живее. Clinky помогает видеться чаще и проводить время так, что хочется повторить.',
        insideTitle: 'Всё для встреч в одном месте',
        inside: [['Не теряй друзей', 'Помни, кого и когда видел и с кем давно не пересекался.'], ['Чокнись чем угодно', 'Кофе, чай, бокал вина или пиво. Главное, что вы вместе.'], ['Игры для компании', 'Карточки-игры, которые разговорят любой стол за секунды.']],
        hubTitle: 'Бесплатные наборы вопросов',
        nav: [['Главная', '/'], ['Игры', '/games'], ['О нас', '/about'], ['Поддержка', '/support']]
      }
    : {
        eyebrow: 'Coming soon to the App Store', h1: 'Turn hangouts into a game',
        lede: 'An easy reason to meet more often. Party-game cards for any table and a 3D drink for every clink.',
        cta: 'Join the waitlist', gamesTitle: 'Questions that open anyone up',
        gamesSub: 'These are real cards from the app. You can read the full sets right here on the site.',
        problemTitle: 'Getting everyone together can be a real quest',
        problemBody: 'Either everyone is busy and the meet-up drifts to someday, or you finally gather and the conversation stalls. A light reminder and a couple of games make it all way more fun. Clinky helps you meet up more often and have the kind of time you want to repeat.',
        insideTitle: 'Everything for your hangouts in one place',
        inside: [['Do not lose touch', 'Remember who you saw, when, and who you have not met in a while.'], ['Clink with anything', 'Coffee, tea, a glass of wine or a beer. What matters is you are together.'], ['Party games', 'Icebreaker cards that get any table talking in seconds.']],
        hubTitle: 'Free question packs',
        nav: [['Home', '/'], ['Games', '/games'], ['About', '/about'], ['Support', '/support']]
      };

  const samples = sampleQuestions(loc, 3);
  return `<div id="prerender">
<nav>${t.nav.map(([n, h]) => `<a href="${h}">${esc(n)}</a>`).join('')}</nav>
<p class="eyebrow">${esc(t.eyebrow)}</p>
<h1>${esc(t.h1)}</h1>
<p>${esc(t.lede)}</p>
<p><a href="/"><strong>${esc(t.cta)}</strong></a></p>
<h2>${esc(t.gamesTitle)}</h2>
<p>${esc(t.gamesSub)}</p>
${samples.map((s) => `<h3><a href="${s.href}">${esc(s.title)}</a></h3>`).join('\n')}
<h2>${esc(t.problemTitle)}</h2>
<p>${esc(t.problemBody)}</p>
<h2>${esc(t.insideTitle)}</h2>
${t.inside.map(([h, d]) => `<h3>${esc(h)}</h3><p>${esc(d)}</p>`).join('\n')}
<h2>${esc(t.hubTitle)}</h2>
<ul>${GAMES_META.map((g) => `<li><a href="/games">${esc(g.title[loc])}</a></li>`).join('')}</ul>
</div>`;
}


// Legal pages ship their full text in the prerendered fallback: the real policy is
// ~1500 words injected by legal-content.js, and crawlers without JS were seeing 20.
let LEGAL_CACHE = null;
function legalDocs() {
  if (LEGAL_CACHE) return LEGAL_CACHE;
  const w = {};
  new Function('window', readFileSync('assets/legal-content.js', 'utf8'))(w);
  LEGAL_CACHE = { privacy: w.PRIVACY || {}, terms: w.TERMS || {} };
  return LEGAL_CACHE;
}

function legalBody(which, loc) {
  const doc = legalDocs()[which] || {};
  const sections = doc[loc] || [];
  return sections.map((sec) => {
    let out = sec.h ? `<h2>${esc(sec.h)}</h2>` : '';
    out += (sec.b || []).map((bl) => {
      if (bl[0] === 'h3') return `<h3>${esc(bl[1])}</h3>`;
      if (bl[0] === 'ul') return `<ul>${(bl[1] || []).map((li) => `<li>${esc(li)}</li>`).join('')}</ul>`;
      return `<p>${esc(bl[1])}</p>`;
    }).join('');
    return out;
  }).join('\n');
}

function simplePrerender(s) {
  const loc = s.loc;
  const nav = loc === 'ru'
    ? [['Главная', `${SITE}/`], ['Игры', '/games'], ['Приватность', '/privacy-ru'], ['Условия', '/terms-ru']]
    : [['Home', `${SITE}/`], ['Games', '/games'], ['About', '/about'], ['Support', '/support'], ['Privacy', '/privacy'], ['Terms', '/terms']];
  const heading = s.title.split(/ — |—/)[0];
  const base = s.file.split('/').pop();
  const legalKind = /^privacy/.test(base) ? 'privacy' : (/^terms/.test(base) ? 'terms' : null);
  const legalText = legalKind ? legalBody(legalKind, loc) : '';
  const faq = (s.faq && s.faq !== 'games')
    ? `<h2>${loc === 'ru' ? 'Частые вопросы' : 'Frequently asked questions'}</h2>\n${faqHtml(FAQ_SUPPORT[loc])}`
    : '';
  return `<div id="prerender">
<nav>${nav.map(([n, h]) => `<a href="${h}">${esc(n)}</a>`).join('')}</nav>
<h1>${esc(heading)}</h1>
<p>${esc(s.description)}</p>
${legalText}
${faq}
<p><a href="/">Clinky</a></p>
</div>`;
}


function gamesPrerender(loc) {
  const t = loc === 'ru'
    ? { h1: 'Игры для компании', lede: 'Выбери игру, посмотри, как она идёт, и полистай настоящие карточки из приложения.',
        how: 'Как играть', cards: 'Примеры карточек', faq: 'Вопросы про игры',
        nav: [['Главная', '/'], ['Игры', '/games'], ['О нас', '/about'], ['Поддержка', '/support']] }
    : { h1: 'Games for any table', lede: 'Pick a game, see how it runs and flick through real cards from the app.',
        how: 'How to play', cards: 'Example cards', faq: 'Questions about the games',
        nav: [['Home', '/'], ['Games', '/games'], ['About', '/about'], ['Support', '/support']] };

  const blocks = GAMES_META.map((g) => {
    let cards = [];
    try {
      const items = JSON.parse(readFileSync(`data/${g.id}.json`, 'utf8'));
      const names = { en: { A: 'Alex', B: 'Sam' }, ru: { A: 'Аня', B: 'Макс' } }[loc];
      cards = items.slice(0, 3).map((q) => q.text[loc]
        .replace(/\{A\}/g, names.A).replace(/\{B\}/g, names.B).replace(/\*/g, ''));
    } catch (e) {}
    return `<h3>${esc(g.title[loc])}</h3>
<p><strong>${esc(t.how)}:</strong> ${g.how[loc].map((x) => esc(x)).join(' · ')}</p>
${cards.length ? `<ul>${cards.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}`;
  }).join('\n');

  return `<div id="prerender">
<nav>${t.nav.map(([n, h]) => `<a href="${h}">${esc(n)}</a>`).join('')}</nav>
<h1>${esc(t.h1)}</h1>
<p>${esc(t.lede)}</p>
${blocks}
<h2>${esc(t.faq)}</h2>
${faqHtml(FAQ_GAMES[loc])}
</div>`;
}

function jsonld(s) {
  const canonical = s.path === '/' ? `${SITE}/` : `${SITE}${s.path}`;
  const canonicalForSchema = s.canonicalOverride ? `${SITE}${s.canonicalOverride}` : canonical;
  const website = {
    '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Clinky',
    inLanguage: 'en',
    publisher: { '@id': `${SITE}/#org` },
    description: 'Clinky is an iOS app for hangouts with friends: question cards, a log of every meet-up and a 3D drink for each clink.'
  };
  const organization = {
    '@type': 'Organization', '@id': `${SITE}/#org`, name: 'Clinky', url: `${SITE}/`,
    logo: { '@type': 'ImageObject', url: `${SITE}/assets/clinky-icon.png`, width: 512, height: 512 }
  };
  const graph = [website, organization];
  if (s.home) {
    graph.push({
      '@type': 'MobileApplication', '@id': `${SITE}/#app`, name: 'Clinky',
      applicationCategory: 'LifestyleApplication', operatingSystem: 'iOS 17.0 or later',
      url: `${SITE}/`, image: `${SITE}/assets/og-image.jpg`,
      description: 'Track who you meet, play party-game question cards and collect a 3D drink for every clink. Offline-first, no accounts.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE}/#org` }
    });
    graph.push({
      '@type': 'WebPage', '@id': canonical, url: canonical, name: s.title,
      description: s.description, inLanguage: s.loc, isPartOf: { '@id': `${SITE}/#website` }
    });
  } else {
    graph.push({
      '@type': 'WebPage', '@id': canonical, url: canonical, name: s.title,
      description: s.description, inLanguage: s.loc, isPartOf: { '@id': `${SITE}/#website` }
    });
    if (s.faq === 'games') graph.push(faqSchema(FAQ_GAMES[s.loc]));
    else if (s.faq) graph.push(faqSchema(FAQ_SUPPORT[s.loc]));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

function seoBlock(s) {
  const canonical = s.canonicalOverride
    ? `${SITE}${s.canonicalOverride}`
    : (s.path === '/' ? `${SITE}/` : `${SITE}${s.path}`);
  const rows = [
    '<!-- seo:start -->',
    `<meta name="robots" content="${s.robots}">`,
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}">`
  ];
  if (!s.noCanonical) rows.push(`<link rel="canonical" href="${canonical}">`);
  if (s.altRu) {
    rows.push(`<link rel="alternate" hreflang="en" href="${canonical}">`);
    rows.push(`<link rel="alternate" hreflang="ru" href="${SITE}${s.altRu}">`);
    rows.push(`<link rel="alternate" hreflang="x-default" href="${canonical}">`);
  }
  if (s.altEn) {
    rows.push(`<link rel="alternate" hreflang="en" href="${SITE}${s.altEn}">`);
    rows.push(`<link rel="alternate" hreflang="ru" href="${canonical}">`);
    rows.push(`<link rel="alternate" hreflang="x-default" href="${SITE}${s.altEn}">`);
  }
  rows.push(
    '<meta property="og:site_name" content="Clinky">',
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="${s.loc === 'ru' ? 'ru_RU' : 'en_US'}">`,
    `<meta property="og:title" content="${esc(s.ogTitle)}">`,
    `<meta property="og:description" content="${esc(s.ogDescription)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${SITE}/assets/og-image.jpg">`,
    '<meta property="og:image:width" content="1024">',
    '<meta property="og:image:height" content="1024">',
    '<meta name="twitter:card" content="summary">',
    `<meta name="twitter:title" content="${esc(s.ogTitle)}">`,
    `<meta name="twitter:description" content="${esc(s.ogDescription)}">`,
    `<meta name="twitter:image" content="${SITE}/assets/og-image.jpg">`
  );
  if (GSC) rows.push(`<meta name="google-site-verification" content="${GSC}">`);
  rows.push(`<script type="application/ld+json">${JSON.stringify(jsonld(s))}</script>`);
  rows.push(PRERENDER_CSS);
  rows.push("<script>document.documentElement.classList.add('motion-ready');setTimeout(function(){if(!window.clinkyInitReveals)document.documentElement.classList.remove('motion-ready')},1500)</script>");
  rows.push(`<script defer src="/assets/motion.min.js?v=${assetVer('assets/motion.min.js')}"></script>`);
  if (CF_BEACON) rows.push(`<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${CF_BEACON}"}'></script>`);
  rows.push('<!-- seo:end -->');
  return rows.join('\n');
}

for (const s of SHELLS) {
  let html = readFileSync(s.file, 'utf8');

  html = html.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->\n?/, '');
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${s.loc}">`);

  const lines = html.split('\n').filter((l) => !DROP.some((re) => re.test(l)));
  const vi = lines.findIndex((l) => /<meta name="viewport"/.test(l));
  lines.splice(vi + 1, 0, seoBlock(s));
  html = lines.join('\n');

  html = html.replace(/<noscript[\s\S]*?<\/noscript>\n?/, '');

  const body = s.home ? homePrerender(s.loc) : (s.faq === 'games' ? gamesPrerender(s.loc) : simplePrerender(s));
  const appBlock = `<div id="app"><!-- prerender:start -->\n${body}\n<!-- prerender:end --></div>`;
  if (/<!-- prerender:start -->/.test(html)) {
    html = html.replace(/<div id="app"><!-- prerender:start -->[\s\S]*?<!-- prerender:end --><\/div>/, appBlock);
  } else {
    html = html.replace(/<div id="app"><\/div>/, appBlock);
  }



  // shells load the minified twins (sources stay readable; run tools/minify.mjs after edits)
  const MIN_MAP = [
    ['assets/legal-content.js', 'assets/legal-content.min.js'],
    ['assets/site.js', 'assets/site.min.js'],
    ['assets/hero3d.js', 'assets/hero3d.min.js'],
    ['assets/motion.js', 'assets/motion.min.js']
  ];
  for (const [plain, min] of MIN_MAP) {
    const re = new RegExp(plain.replace('.', '\\.') + '(\\?v=[a-f0-9]+)?', 'g');
    html = html.replace(re, min);
  }

  const BUST = [
    ['assets/site.css', 'assets/site.css'],
    ['assets/site.min.js', 'assets/site.min.js'],
    ['assets/legal-content.min.js', 'assets/legal-content.min.js'],
    ['assets/hero3d.min.js', 'assets/hero3d.min.js'],
    ['assets/motion.min.js', 'assets/motion.min.js']
  ];
  for (const [ref, file] of BUST) {
    const v = assetVer(file);
    html = html.replace(new RegExp('(["\'])' + ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(\\?v=[a-f0-9]+)?\\1', 'g'), `$1${ref}?v=${v}$1`);
  }


  // external CSS must not block first paint: preload + swap media on load
  const NONBLOCKING = [
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Nunito:wght@700;800;900&display=swap',
    'https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css',
    'https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css',
    'https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css'
  ];
  for (const href of NONBLOCKING) {
    const esc = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blocking = new RegExp('<link href="' + esc + '" rel="stylesheet">|<link rel="stylesheet" href="' + esc + '">', 'g');
    html = html.replace(blocking,
      `<link rel="preload" as="style" href="${href}">` +
      `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'">`);
  }
  if (!/unpkg\.com" crossorigin/.test(html)) {
    html = html.replace('<link rel="preconnect" href="https://fonts.googleapis.com">',
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://unpkg.com" crossorigin>');
  }


  html = html.replace('three@0.160.0/build/three.module.js', 'three@0.160.0/build/three.module.min.js');


  const LEGAL_PAGES = new Set(['privacy.html', 'terms.html', 'privacy-ru.html', 'terms-ru.html', 'ru/privacy.html', 'ru/terms.html']);
  if (!LEGAL_PAGES.has(s.file)) {
    html = html.replace(/\n?<script src="assets\/legal-content\.js(\?v=[a-f0-9]+)?"><\/script>/, '');
  } else if (!/legal-content\.js/.test(html)) {
    html = html.replace('<script src="assets/site.js', '<script src="assets/legal-content.js"></script>\n<script src="assets/site.js');
  }

  writeFileSync(s.file, html);
  console.log(`patched ${s.file.padEnd(16)} ${(html.length / 1024).toFixed(1)} KB`);
}
console.log(CF_BEACON ? 'CF beacon: embedded' : 'CF beacon: skipped (set CF_BEACON_TOKEN)');
console.log(GSC ? 'GSC meta: embedded' : 'GSC meta: skipped (set GSC_VERIFY)');
