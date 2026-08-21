import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { FAQ_SUPPORT } from './faq_support.mjs';
import { FAQ_GAMES } from './faq_games.mjs';
import { SHELLS } from './shell_meta.mjs';
import { ICON_PATHS } from './icons_data.mjs';
import { AUTHOR_LINKS, AUTHOR_PHOTO } from './about_content.mjs';

const FILE = 'assets/site.js';
let js = readFileSync(FILE, 'utf8');
const before = js.length;

const faqLiteral = 'var FAQ = {\n' + ['en', 'ru'].map((l) =>
  `    ${l}: [\n` + FAQ_SUPPORT[l].map((f) =>
    `      { q: ${JSON.stringify(f.q)}, a: ${JSON.stringify(f.a)} }`).join(',\n') + '\n    ]'
).join(',\n') + '\n  };';


const gamesLiteral = 'var FAQ_GAMES = {\n' + ['en', 'ru'].map((l) =>
  `    ${l}: [\n` + FAQ_GAMES[l].map((f) =>
    `      { q: ${JSON.stringify(f.q)}, a: ${JSON.stringify(f.a)} }`).join(',\n') + '\n    ]'
).join(',\n') + '\n  };';
const gamesRe = /var FAQ_GAMES = \{[\s\S]*?\n  \};/;
if (gamesRe.test(js)) js = js.replace(gamesRe, gamesLiteral);

const faqRe = /var FAQ = \{[\s\S]*?\n  \};/;
if (!faqRe.test(js)) throw new Error('FAQ block not found');
js = js.replace(faqRe, faqLiteral);

if (!/gamesAll:/.test(js)) {
  js = js.replace("tapSwipe: 'Tap or swipe the card'", "gamesAll: 'See how to play', tapSwipe: 'Tap or swipe the card'");
  js = js.replace("tapSwipe: 'Тап или свайп по карточке'", "gamesAll: 'Как в это играть', tapSwipe: 'Тап или свайп по карточке'");
}

const helpers = `  function faqAccordion(items) {
    return '<div class="faq-acc">' + items.map(function (f) {
      return '<details><summary>' + esc(f.q) + '</summary>' +
        '<div class="faq-body">' + esc(f.a) + '</div></details>';
    }).join('') + '</div>';
  }
`;
if (!/function faqAccordion/.test(js)) js = js.replace('  function esc(s) {', helpers + '  function esc(s) {');

const sectionRe = /  function renderFaqSection\(\) \{[\s\S]*?\n  \}\n/;
js = js.replace(sectionRe, '');

js = js.replace(
  "return '<div class=\"page-in\">' + hero + counter + problem + discover + card + renderFaqSection() + finalCta + '</div>';",
  "return '<div class=\"page-in\">' + hero + counter + problem + discover + card + finalCta + '</div>';"
);
js = js.replace(/, faqKicker: '[^']*', faqTitle: '[^']*'/g, '');
js = js.replace(/faqKicker: '[^']*', faqTitle: '[^']*', /g, '');

const supportOld = /    var faqHtml = FAQ\[state\.lang\]\.map\(function \(f\) \{[\s\S]*?\}\)\.join\(''\);/;
if (supportOld.test(js)) js = js.replace(supportOld, '    var faqHtml = faqAccordion(FAQ[state.lang]);');


const hintLine = "'<p style=\"text-align:center;font-size:13px;color:#a99ea6;margin:16px 0 0\">' + esc(t.cardHint) + '</p>' +";
if (js.includes(hintLine) && !js.includes('esc(t.gamesAll)')) {
  js = js.replace(hintLine, hintLine + "\n        '<p style=\"text-align:center;margin:14px 0 0\"><a href=\"' + questionsHref() + '\" style=\"font-size:14.5px;font-weight:700;color:#E11D48;text-decoration:none\">' + esc(t.gamesAll) + ' →</a></p>' +");
}


const titles = Object.fromEntries(SHELLS.map((s) => [s.path, s.title]));
js = js.replace(/  var DOC_TITLES = \{[^}]*\};/, '  var DOC_TITLES = ' + JSON.stringify(titles) + ';');

js = js.replace(/  var AUTHOR_PHOTO = '[^']*';/, "  var AUTHOR_PHOTO = '" + AUTHOR_PHOTO + "';");
js = js.replace(/  var AUTHOR_LINKS = \[[^;]*\];/, '  var AUTHOR_LINKS = ' + JSON.stringify(AUTHOR_LINKS) + ';');
js = js.replace(/  var ICON_PATHS = \{[^;]*\};/, '  var ICON_PATHS = ' + JSON.stringify(ICON_PATHS) + ';');

// lazily loaded payloads need their own cache-busting, they are not in the shells
const lazyVer = (f) => createHash('md5').update(readFileSync(f)).digest('hex').slice(0, 8);
for (const name of ['game-content.js', 'web-deck.js', 'author.jpg']) {
  const re = new RegExp("'/assets/" + name.replace('.', '\\.') + "(\\?v=[a-f0-9]+)?'", 'g');
  js = js.replace(re, `'/assets/${name}?v=${lazyVer('assets/' + name)}'`);
}

writeFileSync(FILE, js);
console.log(`site.js: ${before} -> ${js.length} bytes`);
console.log('checks:', ['faqAccordion', 'faq-acc', 'renderFaqSection() + finalCta', 'faqHtml = faqAccordion']
  .map((k) => `${k}=${js.includes(k)}`).join('  '));
