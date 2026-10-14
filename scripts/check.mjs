import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('../site/', import.meta.url)));
const canonical = 'https://snitchpuck.org/';
const failures = [];
const fail = (message) => failures.push(message);
const exists = async (file) => { try { return await stat(file); } catch { return null; } };
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');
const documents = new Map();
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (file.endsWith('.html')) documents.set(file, await readFile(file, 'utf8'));
  }
}
await walk(root);
const homeFile = path.join(root, 'index.html');
const home = documents.get(homeFile);
if (!home) fail('site/index.html is missing.');
if (home) {
  if (!/<!doctype html>/i.test(home)) fail('Homepage needs an HTML doctype.');
  if (!/<html\b[^>]*\blang=["']en["']/i.test(home)) fail('Homepage needs lang="en".');
  if (!/<meta\b[^>]*name=["']viewport["']/i.test(home)) fail('Homepage needs viewport metadata.');
  if (!/<meta\b[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(home)) fail('Homepage needs a description.');
  if (!/<title>[^<]+<\/title>/i.test(home)) fail('Homepage needs a title.');
  if ((home.match(/<h1\b/gi) || []).length !== 1) fail('Homepage must have exactly one h1.');
  if ((home.match(/<main\b/gi) || []).length !== 1) fail('Homepage must have exactly one main landmark.');
  const links = [...home.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
  if (!links.some((tag) => /\brel=["']canonical["']/i.test(tag) && tag.includes(canonical))) fail('Homepage canonical must be https://snitchpuck.org/.');
  const references = [
    ['talk', 'https://www.youtube.com/watch?v=WCnojaEpF2I'],
    ['WIRED', 'https://www.wired.com/story/school-bathroom-vape-detector-audio-bug/'],
    ['vendor advisory', ['https://halodetect.com/product-security/security-advisory/', 'https://web.archive.org/web/20260922180259/https://halodetect.com/product-security/security-advisory/']],
    ['product', ['https://www.avigilon.com/sensors/halo-smart-sensor-3c', 'https://halodetect.com/halo-3c-pc/']],
    ['housing deployment', 'https://halodetect.com/case-studies/saratoga-springs-housing-authority/'],
    ['acquisition', 'https://www.motorolasolutions.com/newsroom/press-releases/motorola-solutions-acquires-halo-smart-sensor-creator-ipvideo.html'],
    ['BSidesPDX', 'https://bsidespdx.org/events/2025/speakers'],
  ];
  const hrefs = new Set([...home.matchAll(/\bhref=["']([^"']+)["']/gi)].map((m) => decode(m[1])));
  for (const [name, urls] of references) {
    if (!(Array.isArray(urls) ? urls : [urls]).some((url) => hrefs.has(url))) fail(`Missing reviewed ${name} source link.`);
  }
}
for (const [file, html] of documents) {
  const relative = path.relative(root, file);
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length) fail(`${relative}: duplicate id attributes.`);
  for (const match of html.matchAll(/\b(href|src)=["']([^"']+)["']/gi)) {
    const value = decode(match[2]);
    if (/^(?:https?:|mailto:|tel:|data:)/i.test(value)) continue;
    if (/^(?:javascript:|\/\/)/i.test(value)) { fail(`${relative}: unsafe or protocol-relative URL ${value}`); continue; }
    const url = new URL(value, 'https://local.invalid/' + relative.split(path.sep).join('/'));
    let local = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (local !== root && !local.startsWith(root + path.sep)) { fail(`${relative}: path escapes site root.`); continue; }
    let info = await exists(local);
    if (info?.isDirectory()) { local = path.join(local, 'index.html'); info = await exists(local); }
    if (!info) { fail(`${relative}: missing local target ${value}`); continue; }
    if (url.hash && local.endsWith('.html')) {
      const target = documents.get(local) || await readFile(local, 'utf8');
      const targetIds = [...target.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]);
      if (!targetIds.includes(decodeURIComponent(url.hash.slice(1)))) fail(`${relative}: missing fragment ${value}`);
    }
  }
}
for (const file of ['404.html', '_headers', 'robots.txt', 'sitemap.xml']) {
  if (!await exists(path.join(root, file))) fail(`site/${file} is missing.`);
}
if (failures.length) {
  console.error(failures.map((message) => `- ${message}`).join('\n'));
  process.exitCode = 1;
} else console.log(`Static checks passed for ${documents.size} HTML documents, local assets/fragments, metadata, and seven reviewed source links.`);
