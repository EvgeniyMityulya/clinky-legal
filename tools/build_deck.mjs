import { writeFileSync } from 'node:fs';
import { WEB_DECK, DECK_LIMIT } from './web_deck.mjs';

// Shipped as its own file so the cards are not inside the main bundle and load
// only on the play pages.
const payload = { limit: DECK_LIMIT, games: {} };
for (const [id, g] of Object.entries(WEB_DECK)) {
  payload.games[id] = { slug: g.slug, en: g.en, ru: g.ru };
}

writeFileSync('assets/web-deck.js',
  '/* generated from tools/web_deck.mjs — run node tools/build_deck.mjs */\n' +
  'window.CLINKY_WEB_DECK = ' + JSON.stringify(payload) + ';\n');

const counts = Object.entries(payload.games).map(([k, g]) => `${k}: ${g.en.length}/${g.ru.length}`).join(', ');
console.log(`assets/web-deck.js written — limit ${payload.limit}/day, ${counts}`);
