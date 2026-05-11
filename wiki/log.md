# Log

Append-only chronological record of all wiki activity — ingests, queries, lint passes.

Greppable format: each entry starts with `## [YYYY-MM-DD] operation | Title`

```bash
grep "^## \[" wiki/log.md | tail -5    # last 5 entries
grep "ingest" wiki/log.md              # all ingested sources
grep "query" wiki/log.md               # all filed queries
```

---

## [2026-05-11] update | Wiki initialized

Initial wiki structure created: `CLAUDE.md`, `wiki/index.md`, `wiki/log.md`, `raw/`, `raw/assets/`.
