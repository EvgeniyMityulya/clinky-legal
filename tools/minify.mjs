import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, statSync } from 'node:fs';

// Pinned in package.json: `npx --yes terser` ran whatever version was newest that day.
const TERSER = './node_modules/.bin/terser';
if (!existsSync(TERSER)) {
  console.error(`${TERSER} is missing. Run \`npm ci --ignore-scripts\` in the repo root, then retry.`);
  process.exit(1);
}

// Sources stay readable and hand-edited; the shells load the minified twins.
const TARGETS = [
  { src: 'assets/site.js', out: 'assets/site.min.js', module: false },
  { src: 'assets/legal-content.js', out: 'assets/legal-content.min.js', module: false },
  { src: 'assets/motion.js', out: 'assets/motion.min.js', module: false },
  { src: 'assets/hero3d.js', out: 'assets/hero3d.min.js', module: true }
];

const kb = (bytes) => (bytes / 1024).toFixed(1);

for (const t of TARGETS) {
  const before = existsSync(t.out) ? statSync(t.out).size : 0;
  const args = [
    t.src,
    '--compress', 'passes=2',
    '--mangle',
    '--output', t.out
  ];
  if (t.module) args.splice(1, 0, '--module');
  execFileSync(TERSER, args, { stdio: ['ignore', 'ignore', 'inherit'] });
  const banner = `/* generated from ${t.src.split('/').pop()} — edit the source, then run node tools/minify.mjs */\n`;
  writeFileSync(t.out, banner + readFileSync(t.out, 'utf8'));
  const after = statSync(t.out).size;
  console.log(`${t.src.padEnd(28)} ${kb(statSync(t.src).size).padStart(6)} KB -> ${kb(after).padStart(6)} KB  ${t.out}  (was ${kb(before)} KB, ${after - before >= 0 ? '+' : ''}${after - before} B)`);
}
