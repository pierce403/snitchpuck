# Source register

Reviewed for the initial October 14, 2026 brief. Source roles are deliberately distinct; this site is an independent account, not an official vendor or researcher publication.

| Source | Role in the brief |
| --- | --- |
| [YouTube talk](https://www.youtube.com/watch?v=WCnojaEpF2I) | User-supplied research presentation. |
| [WIRED report](https://www.wired.com/story/school-bathroom-vape-detector-audio-bug/) | Independent reporting. |
| [Archived vendor advisory](https://web.archive.org/web/20260922180259/https://halodetect.com/product-security/security-advisory/) | August 4, 2025 vendor response and remediation claims. |
| [HALO 3C product page](https://www.avigilon.com/sensors/halo-smart-sensor-3c) | Current vendor product description; redirects from `https://halodetect.com/halo-3c-pc/`. |
| [Housing case study](https://halodetect.com/case-studies/saratoga-springs-housing-authority/) | Vendor-described deployment context. |
| [Motorola acquisition announcement](https://www.motorolasolutions.com/newsroom/press-releases/motorola-solutions-acquires-halo-smart-sensor-creator-ipvideo.html) | Corporate ownership chronology. |
| [BSidesPDX 2025 speakers](https://bsidespdx.org/events/2025/speakers) | Rey's firsthand presentation abstract. |
| [DEF CON 33 talk archive](https://infocondb.org/con/def-con/def-con-33/unmasking-the-snitch-puck-the-creepy-iot-surveillance-tech-in-the-school-bathroom) | Conference title and August 8, 2025 event date. |

Keep reported findings separate from vendor claims. Capability does not prove an operator used it. Historical disclosure does not prove current vulnerability on a particular device. Product pages and case studies describe vendor positions, not independent security verification. Raw source captures and browser evidence stay in ignored `evidence/`.

9. Motorola Solutions, 2024 utilities solution brief, PDF page 4. Supports the short no-recording quote; current Avigilon page supports capabilities only. https://www.motorolasolutions.com/content/dam/msi/images/solutions/utilities/solving_for_safer_utilities_solution_brief_xp.pdf

The original advisory URL now redirects to a generic Avigilon product page. The linked Wayback capture was verified by content (not status alone). Direct urllib reads required gzip decompression; HTTP 200 alone was insufficient.

## Public presentation and device photograph

10. [Official DEF CON 33 slide deck](https://media.defcon.org/DEF%20CON%2033/DEF%20CON%2033%20presentations/Reynaldo%20nyx%20-%20Unmasking%20the%20snitch%20puck.pdf), Rey and nyx, 103 pages. Download verified from the conference archive; SHA-256 `69175a4b0fcb6804bff0b982bd4afcebcd522aeab444b03063edf622741e343b`. Page 29 shows the actual HALO 3C on the workbench; pages 30, 34 and 35 show its internals. The page 29 embedded JPEG (PDF image object 128, 1913×1440) supplies `site/assets/halo-3c-photo.webp`, resized to 1600×1204 and encoded as WebP. The same photo appears in the social preview. No generative alteration or background replacement was made.

The deck's page 101 thanks Matt H for photo assistance. Retain that acknowledgement and the researcher/deck link with this excerpt; no separate open license was found in the PDF, and the recording's license is not asserted for the PDF asset. Raw PDF, extracted originals, and renders stay in ignored `evidence/`. The full deck remains hosted by DEF CON rather than being republished here.
