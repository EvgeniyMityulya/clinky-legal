import { writeFileSync } from 'node:fs';
import { GAME_CONTENT, CONTENT_LABELS } from './game_content.mjs';

const payload = { content: GAME_CONTENT, labels: CONTENT_LABELS };
writeFileSync('assets/game-content.js', 'window.CLINKY_GAME_CONTENT=' + JSON.stringify(payload) + ';\n');
console.log('assets/game-content.js written');
