# Agent guidance

This is the independent `snitchpuck.org` research brief. Keep it separate from PDXHF and preserve unrelated working trees.

- Read `README.md`, `source-register.md`, and `NOTES.md` before changing deployment or editorial claims.
- Public source lives in `site/`. Keep the main experience a single static HTML page with local assets and clear source links.
- Use `npm ci`, `npm run check`, `npm run build`, and `npm run deploy:check`. Wrangler is pinned to 4.149.0; `sharp` is overridden to 0.35.5, matching the verified patched baseline.
- Browser-check layout changes at desktop and mobile widths, including link/anchor navigation, focus visibility, and horizontal overflow.
- Historical vulnerability reports, vendor remediation statements, and product marketing are different evidence classes. Do not turn either reported possibilities or marketing claims into observed deployment facts.
- Credentials remain outside source control. Inventory names/scopes only. Raw evidence and screenshots belong in ignored `evidence/`.
- Worker `snitchpuck` serves ignored `dist/`. `deployment.json` must identify the exact Git revision after publication. Verify public bytes and HTTPS; a successful build alone does not establish liveness.
- Custom domains and native Git builds remain gated on the missing account/registrar permissions recorded in `README.md`. Do not add active-domain routes before the zone is ready or broaden GitHub App access silently.
- Record useful wins, misses, and collaborator preferences here and in `NOTES.md`. The collaborator prefers concise reports and concrete live verification. Coordinate final commits/pushes through the lead agent for this initial publication; do not create competing deployments.

## Initial setup lessons (2026-10-14)

- The new site is an independent project. PDXHF had unrelated changes and was left untouched.
- Shell sandbox startup and CUA initialization hit host quota errors despite free filesystem space. Authorized elevated shell reads worked; this is an execution-environment limitation, not evidence of a project failure.
- Available OAuth has Workers write permissions and zone read, but lacks zone/DNS write and Workers Builds access. The account's workers.dev subdomain is `bcrt43`; domain DNS currently points to Namecheap parking.
- Use compatibility date 2026-10-13 with pinned Wrangler 4.149.0. The requested 2026-10-14 date passed dry-run packaging but refused local startup; 2026-10-13 is the bundled workerd limit. The coordinator approved aligning the date and retaining the dependency pin.
- Static checks, build, and dry-run passed on the initial page; full npm audit found 0 vulnerabilities. Normalize directory roots with `path.resolve` before checking local link containment.

## Publication lessons (2026-10-14)

- The finished page passed Playwright at 1440, 1280, 768, 390, and 320px: no horizontal overflow, missing images, console exceptions, or broken story anchor. Original screenshots and QA scripts are in ignored `evidence/`. A grid child initially inherited the diagram's 378px minimum content width; `min-width: 0` plus flexible diagram steps fixed mobile overflow.
- The live Avigilon product page no longer carries the old recording quote. Cite source 9, Motorola's 2024 utilities PDF page 4, for the historical no-recording promise; cite source 4 only for current advertised capabilities. Distinguish the network/password prerequisites, demonstrated capability, historical firmware scope, and documented exploitation.
- Fonts are locally hosted with their OFL license notices. The hero and social image use an original conceptual illustration; avoid presenting it as a hardware diagram. No scripts, analytics, remote fonts, or embedded players are required.

- The HALO advisory URL now redirects to a generic product page. Use the verified Wayback capture from September 22, 2026 for the August 2025 advisory. Confirm archive content, not just status: the direct archive response needed gzip decompression.
