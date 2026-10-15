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

1. Ordinary visitor DNS availability: authoritative delegation, active zone, and direct edge apex/www TLS/HTTP now pass; some recursive caches still retain parking records, as recorded below.
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

- Source repository: https://github.com/pierce403/snitchpuck (currently public), default branch main. Initial site commit: `1a294725bb3574d04cb068391dbdc42acec2179b`.
- Deployed asset-only Worker to https://snitchpuck.bcrt43.workers.dev/; Cloudflare version `484ff844-ff51-4676-93d5-d0367fb4d44b`. No previous Worker existed under that name.
- Browser HTTPS responses verified root 200 with exact source HTML hash; deployment.json reports the site commit and no-store; CSS 200; missing path, AGENTS.md and .env return 404. Security response headers are present.
- Live Playwright at 1280 and 390px passed rendering, font/image loading, response anchor, nine source entries, no overflow, no page exceptions, and zero external page requests. Evidence: ignored live-browser.json, live-http.json, and live screenshots.
- Python urllib received 403 for the new workers.dev host in this execution environment. A real browser returned 200 and provided response bodies/headers for the verification above; this was not treated as evidence of a broken deployment.
- PDXHF still has only its pre-existing docs/index.md modification and .pages-update.json. No PDXHF files were changed.
- Initial domain discovery found Namecheap parking. The later owner-approved setup is staged as recorded below; native Builds remains disconnected.
- This final handoff commit changes documentation only. Public HTML/assets match the initial site commit, which deployment.json identifies.

- GitHub reported that the repository moved from snitchpuck.org to snitchpuck during publication. The origin URL and handoff link now use the verified canonical location; no rename was initiated by this publishing workflow.

### Owner-approved custom-domain setup

- Explicit approval resolved the initial automatic-review/permission gate: Cloudflare Free, preserve mail/TXT, replace only apex/www parking, change nameservers, and leave Bot Preference Sync disabled.
- Created zone `bd99a6ff27aa02caffd242522c3617da`; saved `cash.ns.cloudflare.com` and `hope.ns.cloudflare.com` at Namecheap. Verified import and preservation of five MX records plus SPF. Removed only the imported parking A/www CNAME after the public backup at ignored `evidence/dns-before.json`.
- The Worker UI accepted apex attachment while pending; the Worker Domains API attached www. Readback verified both enabled for production service `snitchpuck`, with certificate IDs. No asset redeployment occurred; site commit `1a294725bb3574d04cb068391dbdc42acec2179b` / version `484ff844-ff51-4676-93d5-d0367fb4d44b` were retained.
- Source now tracks both exact-host `custom_domain` routes. Pending attachment is staging; activation still needs zone/delegation/TLS/public checks. At 23:52:04 UTC on October 14, 2026, Cloudflare was pending and .org still delegated to Namecheap.
- Current Builds UI shows “Connect your Git repository,” confirming no native Git connection in the UI. The source repository is currently public. Manual hosting is separate from automatic Git publication.
- Coordinator owns the final commit/push. No redeploy is required for documentation alone; preserve deployed asset/revision evidence until a deliberate new content publication.

### Activation follow-up (October 14 local; October 15 UTC)

- Zone API reports active, activated_on `2026-10-14T23:57:06.666101Z`. At 00:27 UTC, .org delegates to cash/hope, and both authoritative Cloudflare servers return `104.21.22.208` / `172.67.207.23` for apex/www.
- Direct edge HTTPS with standard CA and hostname validation returns HTTP 200 for both hostnames and deployment revision `1a294725bb3574d04cb068391dbdc42acec2179b`. The certificate covers both names. Apex homepage also returns 200.
- Recursive DNS answers remain mixed with old Namecheap parking values. An ordinary local curl timed out and browser navigation did not load during this check. The edge is ready, but ordinary visitor availability remains inconsistent while caches expire; no exact global completion time was claimed.
- No additional remote changes, asset redeployments, or automation were performed for this status check.

### Static serving confirmation (October 14 local)

- Both custom hostnames passed direct Cloudflare edge checks with normal TLS verification: homepage, CSS, and puck SVG each returned 200 and exact source hashes; deployment.json identified the expected site commit; a missing path returned 404. Evidence: ignored `evidence/custom-domain-edge-check.json`.
- Ordinary apex requests still timed out and www requests reached a destination with an SSL EOF. Recursive DNS checks still returned the old parking records. The CF active status confirms zone activation, while these visitor checks continue to distinguish cached DNS from correctly serving static assets.

### Requested Cloudflare log and deployment diagnosis (October 14 local)

- API and CLI deployment history match the dashboard: original version `484ff844-ff51-4676-93d5-d0367fb4d44b` remains Ready at 100%, with no failed replacement deployment. Effective settings have no active observability configuration; live tail fails explicitly with code 100311 because this Worker only has assets. No claim of error-free historical logs was made.
- Ordinary curl now retrieves exact-source HTML from both www and workers.dev. Browser verification of `https://www.snitchpuck.org/` rendered the expected title, illustration, and no overflow. Apex ordinary curl still times out while forced-edge HTTPS succeeds. Evidence: ignored `evidence/log-followup-http.json`; screenshot stored in the task artifact directory.
- Independent DNS diagnosis found all six .org authoritative servers delegate to cash/hope, both CF authorities agree on A/AAAA/HTTPS records, and no DNSSEC failure. Public resolver answers remain mixed by record type and location; host IPv6 connectivity is unavailable and was not confused with a remote fault.
- Cloudflare official public resolver purge tool queued refresh requests for apex A/NS and www A. Subsequent 1.1.1.1 apex answers were correct CF addresses; Google still returned an old parking answer with 378 seconds remaining at that observation. Queuing a refresh does not clear other providers or local caches. No asset redeployment or unrelated DNS change was made.

### Apex address clarification and remaining resolver fault

- Owner emphasized `https://snitchpuck.org/` as the requested address. www is a diagnostic alias, not a replacement. Site canonical URL, Open Graph URL, sitemap and robots already name the apex.
- Google/Cloudflare UDP and DoH queries now return the correct apex CF addresses. The computer's network-supplied resolver still returns parking `162.255.119.52`, including `resolvectl query --cache=no`; ordinary apex HTTP therefore times out while the CF-edge request succeeds. This isolates the observed remaining failure upstream of the local OS cache. No host DNS, hosts file, router, TLS validation, or unrelated configuration was changed.

### Owner-requested www canonical redirect

- Deployed Cloudflare Single Redirect `81aad0d2bb78457c97275eec2913772e` in zone `bd99a6ff27aa02caffd242522c3617da`. UI readback shows Active. Match `(http.host eq "www.snitchpuck.org")`, dynamic target `concat("https://snitchpuck.org", http.request.uri.path)`, 301, preserve_query_string true. Recorded exact public rule in `cloudflare/www-redirect.json`.
- Six live checks passed: ordinary www root and CSS/query requests return exact expected Location; direct-edge HTTP www and missing-path/query return 301; edge apex root and CSS return 200 without a Location. No asset redeploy, runtime code, dependency change, DNS mutation, or unrelated rule change was needed.
- Workers `_redirects` cannot host-match: pinned parseRedirects passes onlyRelative=true when validating the source. The runtime matcher alone was misleading; checked the parser and current official docs before choosing a zone rule.
- Screenshot of the active rule is in the task artifact directory as `www-redirect-active.jpg`; raw response verification is ignored `evidence/www-redirect-live.json`.

### Public slides and real device photograph

- Owner requested public slides and a real device photograph to replace the conceptual illustration. Verified the official archive directory and exact lowercase filename: `https://media.defcon.org/DEF%20CON%2033/DEF%20CON%2033%20presentations/Reynaldo%20nyx%20-%20Unmasking%20the%20snitch%20puck.pdf`. The uppercase filename linked by a secondary index returns 404.
- Saved the 103-page, 8,874,929-byte PDF as ignored `evidence/research-slides.pdf`, with extracted text alongside it. SHA-256: `69175a4b0fcb6804bff0b982bd4afcebcd522aeab444b03063edf622741e343b`. Real exterior photo is page 29; opened unit page 30, teardown page 34, PCB close-up page 35.
- Coordinator extracted page 29's original 1913×1440 JPEG (object 128) into `site/assets/halo-3c-photo.webp`, 1600×1204, for the hero and social preview. Visible slide links/source 10 and a photo-assistance credit are part of this revision.
- Credit the researchers' deck/page; page 101 thanks “Matt H for photo assistance.” No explicit open license or individual image byline was found. The deck has no URI annotations or Drive URL; its public archive also includes a demonstration video.
- CUA/Playwright measured the new page at 1280×900, 390×844 and 320×844 with no horizontal overflow, missing images or console errors. All ten sources and the source-10 anchor render correctly. Desktop/mobile screenshots and `photo-browser-qa.json` are in the task artifact directory. The 1200×630 social image was regenerated with the real photo and visually inspected. Existing static checks/build and Wrangler dry-run passed. Exact-revision publication and live verification follow this source commit.

### Verified photo publication

- Published source commit `949b415149b093f81d0a88109e187a8e71181d66` manually through the existing authorized workflow after its GitHub push. Native Git remains disconnected. Build/check and dry-run passed before publication.
- Cloudflare deployment `69a506fc-df8a-4d88-9058-6704600c6ec5` serves version `81728fa6-0f4e-47c1-a17d-92277c9e89c9` at 100%, created October 14, 2026 at 6:12 p.m. America/Los_Angeles. API readback confirms the active version.
- Ordinary apex HTTPS now returns 200 with exact source HTML, photograph and social-image bytes; deployment.json identifies the source commit. Removed /assets/puck.svg and a missing path return 404. www still returns 301 to HTTPS apex after publication. Evidence: ignored `evidence/photo-live-http.json`.
- Real browser loaded https://snitchpuck.org/ successfully. At 1280px and 390px the photo/fonts load, all ten sources appear, and no horizontal overflow was found. Live screenshot is in the task artifact directory as `photo-live.jpg`. The network-supplied resolver now returns CF addresses, so the previously observed ordinary visitor failure is resolved for this host.
- This following commit records verification only; asset metadata intentionally continues to identify the content revision above.
