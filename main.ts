// News-image entry for Sunday 22 November 2026 (Node 22, standard library only).
// The day's news poster lives in entry.png beside this file. The program copies
// it into the grader's output directory, then checks the copy is byte-identical
// to the source so both runs produce exactly the same file.
// Run it outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePath = new URL('./entry.png', import.meta.url);
if (!existsSync(sourcePath)) {
  throw new Error('entry.png is missing beside main.ts');
}
const expected = readFileSync(sourcePath);
// A PNG starts with its 8-byte signature; refuse to ship anything else.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!expected.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error('entry.png is not a PNG file');
}
mkdirSync(outDir, { recursive: true });
const targetPath = join(outDir, 'entry.png');
copyFileSync(sourcePath, targetPath);
const written = readFileSync(targetPath);
if (!written.equals(expected)) {
  throw new Error('entry.png copy differs from the source');
}
