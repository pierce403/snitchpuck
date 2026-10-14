# Snitch Puck

A single-page, independent research brief intended for **https://snitchpuck.org/**, documenting public HALO sensor security research and the vendor response. The public site is static HTML, CSS, and local assets. This project is separate from PDXHF.

## Local development and checks

Use Node 22 or newer. The verified development host uses Node 24.19.0 and pinned Wrangler 4.149.0.

```sh
npm ci
npm run check
npm run build
npm run deploy:check
npm run dev
```

`site/` is the source; `scripts/build.mjs` copies it into ignored `dist/`. The build writes `dist/deployment.json` using `CF_COMMIT_SHA`, `GITHUB_SHA`, or the local Git HEAD. Before Git initialization, the marker is `uncommitted`. `npm run check` checks metadata, reviewed source links, local files, fragment targets, and duplicate IDs. It does not establish the truth of source claims or verify live external URLs. Run browser layout/accessibility checks at desktop and mobile widths before publishing design changes.

Compatibility date is 2026-10-13, the newest date supported by the pinned local runtime. The requested 2026-10-14 date refused local startup, so the date was aligned without changing dependencies. Review and test compatibility changes when updating Wrangler.

## Hosting

`wrangler.jsonc` configures asset-only Worker `snitchpuck` in account `b6d1478423f0bb0c0477df387305e46b`, serving `dist/` with terminal 404 responses. Its temporary address is `https://snitchpuck.bcrt43.workers.dev/` once deployed. Observability is enabled; static asset-only requests do not necessarily generate Worker invocation logs. `_headers` restricts browser capabilities and disallows third-party scripts, frames, and connections.

On October 14, 2026, read-only discovery found no `snitchpuck.org` Cloudflare zone, while public DNS used Namecheap nameservers and parking records. Existing Wrangler authentication can deploy Workers but cannot create zones/edit DNS or configure Workers Builds. No deployment or domain activation is established by this source configuration.

### Custom domain activation

1. Add `snitchpuck.org` to the intended Cloudflare account using authorized zone-write access. Preserve any unrelated DNS/mail records.
2. Change the registrar nameservers to the pair assigned to this new Cloudflare zone. Wait for the zone to become active.
3. Add the following top-level routes to `wrangler.jsonc`, then publish through the established deployment workflow:

```json
"routes": [
  { "pattern": "snitchpuck.org", "custom_domain": true },
  { "pattern": "www.snitchpuck.org", "custom_domain": true }
]
```

Custom domains require an active zone and exact hostnames. Cloudflare manages their DNS records and certificates. Check conflicting CNAMEs before attaching either hostname. Verify HTTPS, certificate validity, apex and www behavior, a missing path's 404, headers, and `deployment.json` revision. The canonical URL remains the apex.

### Native Git publishing

Prefer Cloudflare Workers Builds connected to this project's private GitHub repository, production branch `main`, root `/`, build command `npm run build`, deploy command `npx wrangler deploy`, paths `*`. Keep credentials in Cloudflare; no Cloudflare credential belongs in GitHub or this repository.

The gate is a user-scoped token with **Workers Builds Configuration: Edit** (API permission: Workers CI Write), plus a pre-existing Cloudflare GitHub App installation permitted to read this repository. Recheck repository access before creating a connection; do not broaden the App's access silently. Read-only discovery of existing Builds configuration returned HTTP 403 with the available Wrangler OAuth token. Configure and verify this integration when suitable authorized access becomes available. Avoid overlapping manual and native Git deployments.

The current REST sequence is repository connection (`PUT /accounts/{account}/builds/repos/connections`), Worker system tag (`GET /accounts/{account}/workers/scripts`), build-token metadata (`GET /accounts/{account}/builds/tokens`), trigger creation (`POST /accounts/{account}/builds/triggers`), and first build (`POST /accounts/{account}/builds/triggers/{trigger}/builds`). The tag is a system identifier, not the Worker name. Never print or retain token values for inventory.

Reference: [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [Builds API setup](https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/).

## Editorial boundaries

`source-register.md` records the reviewed sources and how they support the page. Keep historical researcher findings, vendor claims/remediation, and marketing descriptions distinct. Do not imply these historical vulnerabilities affect every present deployment or that researchers documented covert recording by an operator. Raw downloaded research evidence and browser QA artifacts stay in ignored `evidence/`.
