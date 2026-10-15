# Snitch Puck

A single-page, independent research brief published at **https://snitchpuck.org/**, documenting public HALO sensor security research and the vendor response. The public site is static HTML, CSS, and local assets. This project is separate from PDXHF.

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

Optional manual social-image regeneration:

```sh
python3 scripts/make-social.py
```

This helper requires Pillow, fontTools and Brotli and reads the existing local photograph and OFL font assets. It writes `site/assets/social.png`. The normal npm static build copies the prepared image and has no Python dependency.

Compatibility date is 2026-10-13, the newest date supported by the pinned local runtime. The requested 2026-10-14 date refused local startup, so the date was aligned without changing dependencies. Review and test compatibility changes when updating Wrangler.

## Hosting

`wrangler.jsonc` configures asset-only Worker `snitchpuck` in account `b6d1478423f0bb0c0477df387305e46b`, serving `dist/` with terminal 404 responses. The primary live address is https://snitchpuck.org/; www permanently redirects there. Current production serves commit `bb7d65311013e70e8f5b05f76f632c36da08ad8c`, Cloudflare version `730b741e-3554-4f78-a6ed-efcd1f6c6c1c`. The workers.dev preview remains available. The initial publication served commit `1a294725bb3574d04cb068391dbdc42acec2179b`, Cloudflare version `484ff844-ff51-4676-93d5-d0367fb4d44b`. Observability is requested in configuration; the asset-only dashboard reports logs/traces disabled and these requests do not produce Worker invocation logs. `_headers` restricts browser capabilities and disallows third-party scripts, frames, and connections.

### Custom-domain setup: active and verified

The owner explicitly approved Cloudflare Free hosting, preserving mail/TXT records, replacing only apex/www parking, changing registrar nameservers, and leaving Bot Preference Sync disabled. The initial approval gate for these account/registrar changes is resolved.

Zone `bd99a6ff27aa02caffd242522c3617da` exists. Namecheap now has `cash.ns.cloudflare.com` and `hope.ns.cloudflare.com` saved. All five MX records and the SPF TXT were imported and preserved; only the imported parking A and www CNAME were removed after the public DNS backup in ignored `evidence/dns-before.json`.

Cloudflare accepted both exact-host custom domains on production Worker `snitchpuck` while the zone was pending. The apex was attached through the UI; www through the Worker Domains API. Readback showed both enabled with certificate IDs. These attachments did not republish the assets: site commit `1a294725bb3574d04cb068391dbdc42acec2179b` and version `484ff844-ff51-4676-93d5-d0367fb4d44b` remain the deployment identity.

The following routes are now tracked in `wrangler.jsonc` so future deployments preserve the domain setup:

```json
"routes": [
  { "pattern": "snitchpuck.org", "custom_domain": true },
  { "pattern": "www.snitchpuck.org", "custom_domain": true }
]
```

Cloudflare activated the zone at 23:57:06 UTC on October 14, 2026. At 00:27 UTC on October 15 (October 14 in Los Angeles), the .org delegation and both Cloudflare authoritative servers pointed to the correct setup. Direct edge HTTPS checks, with normal certificate and hostname validation, returned the expected homepage and deployment revision for apex/www. Public recursive resolvers still held some Namecheap parking records, and a normal local connection timed out; full user-visible availability is still subject to those DNS caches expiring. A later ordinary HTTPS and browser check successfully rendered `https://www.snitchpuck.org/`; the apex remained inconsistent across recursive resolvers. Cloudflare public resolver refresh requests were queued, and its apex lookup subsequently returned the correct addresses. This was separate from a routing or TLS configuration failure. The later photo publication passed ordinary apex HTTPS and browser checks; the network-supplied resolver now returns the correct addresses too. The canonical URL remains the apex. Cloudflare manages custom-domain DNS and certificates; preserve unrelated DNS and mail records.

### Canonical www redirect

`http://www.snitchpuck.org/*` and `https://www.snitchpuck.org/*` permanently redirect to `https://snitchpuck.org/*` with status **301**, retaining the original path and query string. The apex serves the site directly.

The active zone Single Redirect is `81aad0d2bb78457c97275eec2913772e`; its public configuration is recorded in `cloudflare/www-redirect.json`. This JSON documents the live rule and is not automatically applied by Wrangler. The rule runs at the zone before the Worker. Keep both custom-domain attachments and the redirect rule during future hosting updates. This change does not republish the static assets.

[Cloudflare Single Redirect settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/). Workers Static Assets `_redirects` supports path rules but cannot match the incoming hostname.

### Native Git publishing

The current Worker Builds UI shows **Connect your Git repository**: native Git publishing is not connected. Existing hosting uses the authorized manual Wrangler workflow. The source repository is public at https://github.com/pierce403/snitchpuck.

For future native publishing, use production branch `main`, root `/`, build command `npm run build`, deploy command `npx wrangler deploy`, paths `*`. Keep credentials in Cloudflare; no Cloudflare credential belongs in GitHub or this repository.

CLI setup requires a user-scoped token with **Workers Builds Configuration: Edit** (API permission: Workers CI Write), plus a pre-existing Cloudflare GitHub App installation permitted to read this repository. The signed-in dashboard is an alternative after repository access is verified. Recheck repository access before creating a connection; do not broaden the App's access silently. Read-only discovery of existing Builds configuration returned HTTP 403 with the available Wrangler OAuth token. Configure and verify this integration when suitable authorized access becomes available. Avoid overlapping manual and native Git deployments.

The current REST sequence is repository connection (`PUT /accounts/{account}/builds/repos/connections`), Worker system tag (`GET /accounts/{account}/workers/scripts`), build-token metadata (`GET /accounts/{account}/builds/tokens`), trigger creation (`POST /accounts/{account}/builds/triggers`), and first build (`POST /accounts/{account}/builds/triggers/{trigger}/builds`). The tag is a system identifier, not the Worker name. Never print or retain token values for inventory.

Reference: [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [Builds API setup](https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/).

## Editorial boundaries

Use plain factual titles and prose throughout the public page, metadata, 404 and social preview. The current copy revision uses “HALO sensor security research” and removes promotional slogans, metaphors and editorial filler. Keep published source titles and attributed quotations accurate. Desktop/mobile, source-preservation and build checks passed before publication; NOTES.md records the exact release and live checks.

`source-register.md` records the reviewed sources and how they support the page. Keep historical researcher findings, vendor claims/remediation, and marketing descriptions distinct. Do not imply these historical vulnerabilities affect every present deployment or that researchers documented covert recording by an operator. Raw downloaded research evidence and browser QA artifacts stay in ignored `evidence/`.

## Public slides and device photograph

The photo revision replaces the conceptual hero/social artwork with a real HALO 3C photograph from page 29 of [Rey and nyx's official DEF CON 33 slides](https://media.defcon.org/DEF%20CON%2033/DEF%20CON%2033%20presentations/Reynaldo%20nyx%20-%20Unmasking%20the%20snitch%20puck.pdf). Source 10 and visible page links identify the deck. `site/assets/halo-3c-photo.webp` is a 1600×1204 derivative of its 1913×1440 embedded photograph; the downloaded PDF remains in ignored `evidence/research-slides.pdf`.

Preserve the deck/page credit. Its acknowledgements thank Matt H for photo assistance; no explicit open license or individual photo byline was found. Do not label the image as original site artwork or claim an open license. The regenerated 1200×630 social preview and desktop/mobile layout were checked before publication; see NOTES.md for exact deployment and public verification evidence.
