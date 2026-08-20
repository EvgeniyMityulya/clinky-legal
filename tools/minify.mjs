import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, statSync } from 'node:fs';

// Sources stay readable and hand-edited; the shells load the minified twins.
const TARGETS = [
  { src: 'assets/site.js', out: 'assets/site.min.js', module: false },
  { src: 'assets/legal-content.js', out: 'assets/legal-content.min.js', module: false },
  { src: 'assets/motion.js', out: 'assets/motion.min.js', module: false },
  { src: 'assets/hero3d.js', out: 'assets/hero3d.min.js', module: true }
];

const kb = (f) => (statSync(f).size / 1024).toFixed(1);

for (const t of TARGETS) {
  const args = [
    '--yes', 'terser', t.src,
    '--compress', 'passes=2',
    '--mangle',
    '--output', t.out
  ];
  if (t.module) args.splice(3, 0, '--module');
  execFileSync('npx', args, { stdio: ['ignore', 'ignore', 'inherit'] });
  const banner = `/* generated from ${t.src.split('/').pop()} — edit the source, then run node tools/minify.mjs */\n`;
  writeFileSync(t.out, banner + readFileSync(t.out, 'utf8'));
  console.log(`${t.src.padEnd(28)} ${kb(t.src).padStart(6)} KB -> ${kb(t.out).padStart(6)} KB  ${t.out}`);
}
