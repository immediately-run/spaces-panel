# FINDINGS — spaces-panel

Recorded by the 2026-06 code-verification pass (R3-124; plan `08-system-apps.md`).
**Record / verify only.** Gates green (`npm run build` + `npm run lint`).

## Spec-ref fixed (Phase 1)

`SpacesPanel.tsx:1` previously cited the opaque pointer
"UI_AS_APPS_SPEC Phase 03 pilot; design surface 07". Per the plan's step 2
(replace opaque plan/brief pointers with the canonical spec §), this pass changed
it to the canonical **`UI_AS_APPS_SPEC §5.2`** (Spaces management — the read-only/
baseline `listSpaces` half) **+ `FILE_SHARING_SPEC §9.7`** (the share surface).
This is the read-only/list half of the share surface; it calls
`listSpaces({ app: true })` for the app-scoped view (host-enforced). Comment-only
edit; gates stay green.

## Vocabulary (Phase 2)

Uses `s.role` (owner/writer/reader) correctly as the FILE_SHARING grant-role, not
a principal (core_concepts §11) — left intact. No `.principal` read (RENAME-SM-1
does **not** affect this repo). No `kernel`. `main.tsx` dev-only. Conformant.

## SDK-version skew (record only)

Pins `@immediately-run/sdk` at **`0.2.8`** (oldest fleet tier). Coordinated bump
owed; do not bump here.
