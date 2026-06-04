# immediately.run — Spaces panel (read-only)

A first-party immediately.run **system app**: the read-only Spaces panel
(UI_AS_APPS_SPEC Phase 03 pilot). Lists the spaces the user has granted **to
this app** — via the SDK's `listSpaces({ app: true })`, which the host answers
app-scoped (Phase 01). No writes, no management — those are the elevated Spaces
manager (Phase 06).

- **Data:** `@immediately-run/sdk` (`listSpaces`). App-scoped, read-only.
- **Design:** adapts design surface `07-spaces` (the panel portion); tokens from
  `src/index.css`. Built for a narrow chrome panel column.
- **States:** loading (skeleton), empty, error, list, no-search-match.

## Local dev

```bash
npm install
npm run build   # tsc -b && vite build — must pass clean
npm run lint
```

> Runs fully only inside immediately.run (the SDK reaches the host). `npm run
> build` verifies it compiles and bundles.
