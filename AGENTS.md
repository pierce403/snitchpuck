# Agent guidance

This is the independent `snitchpuck.org` research brief. Keep it separate from PDXHF and preserve unrelated working trees.

- Read `README.md`, `source-register.md`, and `NOTES.md` before changing deployment or editorial claims.
- Public source lives in `site/`. Keep the main experience a single static HTML page with local assets and clear source links.
- Use `npm ci`, `npm run check`, `npm run build`, and `npm run deploy:check`. Wrangler is pinned to 4.149.0; `sharp` is overridden to 0.35.5, matching the verified patched baseline.
- Browser-check layout changes at desktop and mobile widths, including link/anchor navigation, focus visibility, and horizontal overflow.
- Historical vulnerability reports, vendor remediation statements, and product marketing are different evidence classes. Do not turn either reported possibilities or marketing claims into observed deployment facts.
- Credentials remain outside source control. Inventory names/scopes only. Raw evidence and screenshots belong in ignored `evidence/`.
- Worker `snitchpuck` serves ignored `dist/`. `deployment.json` must identify the exact Git revision after publication. Verify public bytes and HTTPS; a successful build alone does not establish liveness.
- Apex/www custom-domain routes are tracked and attached to the active zone on the existing Worker. Cloudflare accepted attachment while the zone was pending; never report activation until zone status, delegation, TLS, and public responses are verified. Preserve all unrelated DNS/mail records. Native Git remains disconnected; do not broaden GitHub App access silently.
- Record useful wins, misses, and collaborator preferences here and in `NOTES.md`. The collaborator prefers concise reports and concrete live verification. Coordinate final commits/pushes through the lead agent for this initial publication; do not create competing deployments.

## Initial setup lessons (2026-10-14)

- The new site is an independent project. PDXHF had unrelated changes and was left untouched.
- Shell sandbox startup and CUA initialization hit host quota errors despite free filesystem space. Authorized elevated shell reads worked; this is an execution-environment limitation, not evidence of a project failure.
- Available OAuth has Workers write permissions and zone read, but lacks zone/DNS write and Workers Builds access. The account's workers.dev subdomain is `bcrt43`; account/registrar changes were completed through the owner-approved UI workflow.
- Use compatibility date 2026-10-13 with pinned Wrangler 4.149.0. The requested 2026-10-14 date passed dry-run packaging but refused local startup; 2026-10-13 is the bundled workerd limit. The coordinator approved aligning the date and retaining the dependency pin.
- Static checks, build, and dry-run passed on the initial page; full npm audit found 0 vulnerabilities. Normalize directory roots with `path.resolve` before checking local link containment.

## Publication lessons (2026-10-14)

- The finished page passed Playwright at 1440, 1280, 768, 390, and 320px: no horizontal overflow, missing images, console exceptions, or broken story anchor. Original screenshots and QA scripts are in ignored `evidence/`. A grid child initially inherited the diagram's 378px minimum content width; `min-width: 0` plus flexible diagram steps fixed mobile overflow.
- The live Avigilon product page no longer carries the old recording quote. Cite source 9, Motorola's 2024 utilities PDF page 4, for the historical no-recording promise; cite source 4 only for current advertised capabilities. Distinguish the network/password prerequisites, demonstrated capability, historical firmware scope, and documented exploitation.
- Fonts are locally hosted with their OFL license notices. The hero and social image use an original conceptual illustration; avoid presenting it as a hardware diagram. No scripts, analytics, remote fonts, or embedded players are required.

- The HALO advisory URL now redirects to a generic product page. Use the verified Wayback capture from September 22, 2026 for the August 2025 advisory. Confirm archive content, not just status: the direct archive response needed gzip decompression.

- Initial publication is live at https://snitchpuck.bcrt43.workers.dev/, serving site commit `1a294725bb3574d04cb068391dbdc42acec2179b`. Live browser checks proved source-byte identity, revision metadata, headers, 404s, and desktop/mobile behavior. Custom domains are now staged; activation and native Git publishing have separate verification gates below. A documentation-only handoff commit need not trigger a new manual deployment.

## Custom-domain staging lessons (2026-10-14)

- The owner explicitly approved Cloudflare Free, mail/TXT preservation, apex/www parking replacement, nameserver change, and Bot Preference Sync disabled. The approval gate is resolved; remaining delays are external delegation and TLS/activation.
- Zone `bd99a6ff27aa02caffd242522c3617da` uses `cash.ns.cloudflare.com` / `hope.ns.cloudflare.com`. Five MX records and SPF were preserved. Only imported parking A/www CNAME records were removed after `evidence/dns-before.json` was saved.
- The UI/API accepted pending-zone attachments for both production hostnames without asset redeployment. Track both `custom_domain` routes in source so later deploys preserve them. Attachment/certificate IDs alone do not prove active HTTPS.
- At 23:52:04 UTC the .org authoritative delegation still pointed to Namecheap. Check authoritative delegation separately from recursive caches; then verify active zone and public TLS before claiming completion.
- Builds UI currently offers “Connect your Git repository.” Native Git publishing is disconnected; the public repository is `pierce403/snitchpuck`. The deployed site remains commit `1a294725bb3574d04cb068391dbdc42acec2179b`, Worker version `484ff844-ff51-4676-93d5-d0367fb4d44b`.

- For this asset-only Worker, the dashboard reports logs/traces disabled despite the configuration flags. Do not infer invocation-log availability from config alone.

## Activation follow-up (2026-10-14 local)

- Cloudflare activated at 23:57:06 UTC. At 00:27 UTC October 15, .org delegation and both authoritative Cloudflare servers were correct, but recursive caches still returned some old Namecheap parking records. Treat authoritative cutover, valid edge TLS/HTTP, and ordinary visitor availability as separate observations.
- Direct edge checks with normal certificate/hostname validation served the expected site revision for both apex/www. The ordinary local connection still timed out during cache propagation; do not claim universal availability from a forced edge lookup. No additional configuration or asset deployment was needed.

- Follow-up serving check: both custom hostnames return exact source HTML, CSS, and puck illustration bytes over normally validated TLS when resolving to the authoritative Cloudflare edge; missing paths return 404. Ordinary DNS still reached stale parking records during the check. Evidence is ignored `evidence/custom-domain-edge-check.json`.

## Log diagnosis and ordinary visitor check (2026-10-14 local)

- `wrangler tail snitchpuck --format json` returns API error 100311: cannot tail a Worker which only has assets. The dashboard also reports static-only metrics unavailable and Observability disabled; an empty log view is not a deployment failure. Deployment history/API and exact live asset checks are the useful evidence for this architecture.
- The dashboard shows version `484ff844` Ready at 100%. Ordinary HTTPS and a real browser now load `https://www.snitchpuck.org/` with source-identical HTML, a loaded illustration, and no horizontal overflow. Apex visitor availability still varies with recursive DNS.
- All six .org nameservers and both Cloudflare authoritative servers agree on delegation/records; mixed public caches also occur over DoH. Cloudflare public resolver cache refresh requests for apex NS/A and www A were queued through its documented tool. Its apex answer then changed to CF addresses; other caches still held parking. Do not report a queued refresh as global completion.

- Collaborator clarified the primary address must remain `https://snitchpuck.org/`. Present www only as a diagnostic alias; its successful rendering does not complete apex visitor verification. Canonical, Open Graph, robots/sitemap already use the apex.
- When public DNS was correct, `getent ahostsv4` and `resolvectl query --cache=no snitchpuck.org` still returned the old parking address through the network-supplied DNS resolver. An uncached OS query distinguishes upstream network caching from the computer's local cache. Do not change host DNS settings or unrelated network infrastructure to conceal this discrepancy.

## Canonical www redirect (2026-10-14 local)

- Owner requested www always redirect to the apex. Cloudflare zone Single Redirect `81aad0d2bb78457c97275eec2913772e` matches only `www.snitchpuck.org`, returns 301 to HTTPS apex plus original path, and preserves the query string. Public configuration is recorded in `cloudflare/www-redirect.json`; it is an operational record, not an automatically applied Wrangler resource. Preserve it during hosting changes.
- Do not implement hostname redirects in Workers Static Assets `_redirects`: the current docs and pinned Wrangler parser reject absolute source URLs. Its shared runtime has host-matching code, which alone does not establish supported input. A path-only catchall on this shared Worker would redirect the apex to itself.
- Live HTTP/HTTPS www checks passed, including existing assets, missing paths, and encoded query values; apex root/CSS stayed 200 without Location at the edge. Rule deployment did not republish assets or change their revision. Evidence: ignored `evidence/www-redirect-live.json`.
