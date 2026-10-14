# Work notes

## October 14, 2026 — initial publication

Requested outcome: a polished, single-page static research brief for the newly purchased `snitchpuck.org`, hosted on Cloudflare.

### Scope and ownership

- New source directory: `/home/pierce/projects/snitchpuck.org`.
- Independent from the existing PDXHF checkout; its unrelated edits must remain untouched.
- Lead agent owns research synthesis, homepage/assets, browser verification, repository publication, and deployment. Hosting helper owns build/configuration/documentation and makes no Git or remote mutations.

### Hosting discovery

- Account ID: `b6d1478423f0bb0c0477df387305e46b`.
- Worker target: `snitchpuck`; workers.dev namespace: `bcrt43`.
- No `snitchpuck.org` Cloudflare zone or custom Worker domain existed at discovery.
- Public nameservers: `dns1.registrar-servers.com`, `dns2.registrar-servers.com`; apex A: `162.255.119.52` (parking).
- Available Wrangler OAuth supports Worker publication but lists zone read only. Environment inventory found no Cloudflare/Namecheap variable names and one Wrangler profile (`default.toml`).
- Workers Builds token/trigger/limits read requests returned HTTP 403 / code 10000. GitHub CLI classic OAuth cannot enumerate GitHub App installations. Repository access through the existing Cloudflare App therefore remains unverified.
- Neither `pierce403/snitchpuck` nor `pierce403/snitchpuck.org` existed at the initial repository lookup.

### Build and validation record

- Node 24.19.0 is available. Wrangler 4.149.0 is the verified reusable baseline; the new dependency lock pins it.
- `site/` -> `dist/`; revision metadata comes from the Cloudflare build commit or local Git HEAD.
- Structural checks cover public metadata, source links, local assets/fragment targets, and terminal 404 source presence.
- `npm ci --ignore-scripts --no-audit --no-fund` installed the exact lock (35 packages); full `npm audit --audit-level=high` found 0 vulnerabilities.
- `npm run check` passed for two HTML documents, local assets/fragments, metadata, and all seven required reviewed links. The checker initially rejected valid local paths because a trailing root slash became a doubled separator in containment checks; normalizing the root with `path.resolve` fixed it.
- `npm run build` passed and wrote the pre-Git `uncommitted` marker. `npm run deploy:check` passed with 10 static assets and no bindings. No remote publication occurred.
- Actual `npm run dev -- --port 8799 --ip 127.0.0.1 --local` parsed both header rules, then refused the configured 2026-10-14 date: the bundled runtime supports dates only through **2026-10-13**. This is a local runtime startup failure despite a successful packaging dry run. The coordinator approved aligning compatibility to 2026-10-13 while retaining Wrangler 4.149.0; site editorial dates remain October 14.
- Final browser results, exact published revision, and live checks are recorded below by the publishing coordinator.

### Remaining publication gates

1. Cloudflare zone creation and registrar nameserver update for apex/www HTTPS.
2. Native Git integration with verified existing GitHub App repository access and suitable Workers Builds permission.

### Evidence handling

Public source links are in `source-register.md`. Evidence files remain ignored. No credentials were printed or written by the hosting helper. Historical research does not establish present exploitation or unauthorized operator recording.

### Final source and browser checks

- Independent source review corrected the network/password prerequisites and moved the short historical recording quote to an official Motorola 2024 PDF, page 4.
- Live verification found the old advisory URL now redirects to generic product marketing. The September 22, 2026 Wayback capture contains the advisory and was verified after decoding its gzip response. The public link now points to that archive.
- Five Playwright cases passed at 1440, 1280, 768, 390, and 320px with no overflow, missing images, console exceptions, or broken story navigation. Separate checks confirmed the keyboard skip link, source 9 anchor, and zero third-party page requests.
- A 378px intrinsic diagram width caused the first mobile overflow. Flexible steps and min-width:0 on grid children resolved it.
- Source synthesis was independently checked against per-source budgets, with one short vendor quote. Public copy distinguishes research demonstrations, vendor claims, and deployment evidence.

### Verified publication

- Private source repository: https://github.com/pierce403/snitchpuck.org, default branch main. Initial site commit: `1a294725bb3574d04cb068391dbdc42acec2179b`.
- Deployed asset-only Worker to https://snitchpuck.bcrt43.workers.dev/; Cloudflare version `484ff844-ff51-4676-93d5-d0367fb4d44b`. No previous Worker existed under that name.
- Browser HTTPS responses verified root 200 with exact source HTML hash; deployment.json reports the site commit and no-store; CSS 200; missing path, AGENTS.md and .env return 404. Security response headers are present.
- Live Playwright at 1280 and 390px passed rendering, font/image loading, response anchor, nine source entries, no overflow, no page exceptions, and zero external page requests. Evidence: ignored live-browser.json, live-http.json, and live screenshots.
- Python urllib received 403 for the new workers.dev host in this execution environment. A real browser returned 200 and provided response bodies/headers for the verification above; this was not treated as evidence of a broken deployment.
- PDXHF still has only its pre-existing docs/index.md modification and .pages-update.json. No PDXHF files were changed.
- The custom domain remains on Namecheap parking. The owner was asked to add it in Cloudflare and apply the assigned nameservers. Domain connection and native Builds remain unverified and incomplete.
- This final handoff commit changes documentation only. Public HTML/assets match the initial site commit, which deployment.json identifies.
