import { writeFileSync } from 'node:fs';
import { SCENARIOS, SCENARIO_LABELS } from './scenario_content.mjs';

// Функции в labels не переживают JSON, поэтому лимит собираем как шаблон строки.
const labels = Object.fromEntries(Object.entries(SCENARIO_LABELS).map(([k, v]) => [k, { ...v, limit: undefined }]));
const payload = { scenarios: SCENARIOS, labels };
writeFileSync('assets/scenarios.js', 'window.CLINKY_SCENARIOS=' + JSON.stringify(payload) + ';\n');
console.log('assets/scenarios.js written');
