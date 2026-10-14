import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
let revision = process.env.CF_COMMIT_SHA || process.env.GITHUB_SHA || '';
if (!revision) {
  try {
    revision = execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    revision = 'uncommitted';
  }
}
if (revision !== 'uncommitted' && !/^[a-f0-9]{40}$/i.test(revision)) {
  throw new Error('Build revision must be a complete 40-character commit SHA.');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, 'site'), output, { recursive: true });
await writeFile(path.join(output, 'deployment.json'), JSON.stringify({
  project: 'snitchpuck.org',
  revision,
  kind: 'static-research-brief',
}, null, 2) + '\n');
console.log(`Built dist/ for ${revision}.`);
