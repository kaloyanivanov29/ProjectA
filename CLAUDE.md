# Wiki Schema

This file tells Claude how this wiki is structured, what the conventions are, and what workflows to follow.

## Directory layout

```
CLAUDE.md          ← this file (the schema)
raw/               ← immutable source documents (never modify)
  assets/          ← locally downloaded images referenced by sources
wiki/              ← LLM-maintained markdown pages
  index.md         ← content catalog (update on every ingest)
  log.md           ← append-only activity log
  ...              ← topic, entity, and concept pages
```

## Conventions

- All wiki pages are markdown files in `wiki/`.
- Use `[[WikiLink]]` style cross-references between pages (Obsidian-compatible).
- Add YAML frontmatter to wiki pages where useful: `tags`, `sources`, `updated`.
- Raw sources are never edited. Read from them; write only to `wiki/`.
- One page per entity, concept, or topic. Prefer updating existing pages over creating new ones.
- Keep page titles concise. Use the filename as the canonical identifier.

## Operations

### Ingest

When a new source is added to `raw/`:

1. Read the source document fully.
2. Discuss key takeaways with the user if needed.
3. Write or update a summary page in `wiki/`.
4. Update `wiki/index.md` — add the new page(s) and update any affected entries.
5. Update all relevant entity and concept pages across the wiki (cross-references, contradictions, new data).
6. Append an entry to `wiki/log.md` using the format: `## [YYYY-MM-DD] ingest | Source Title`.
7. A single source may touch 10–15 wiki pages — that is expected and correct.

### Query

When the user asks a question:

1. Read `wiki/index.md` first to find relevant pages.
2. Read those pages in full.
3. Synthesize an answer with citations to wiki pages.
4. If the answer is valuable (comparison, analysis, discovered connection), file it back into the wiki as a new page and update `index.md` and `log.md`.
5. Log the query: `## [YYYY-MM-DD] query | Question summary`.

### Lint

When asked to health-check the wiki:

1. Look for contradictions between pages.
2. Identify stale claims superseded by newer sources.
3. Find orphan pages (no inbound links from other wiki pages).
4. Flag important concepts mentioned but lacking their own page.
5. Find missing cross-references.
6. Suggest new questions to investigate or new sources to look for.
7. Log the lint pass: `## [YYYY-MM-DD] lint | Summary of findings`.

## index.md format

```markdown
# Index

## Category Name
- [[Page Title]] — one-line summary
```

Categories to use (adjust as the wiki grows): `Sources`, `Entities`, `Concepts`, `Analyses`, `Queries`.

## log.md format

Each entry starts with `## [YYYY-MM-DD] operation | Title` so the log is greppable:

```bash
grep "^## \[" wiki/log.md | tail -5   # last 5 entries
grep "ingest" wiki/log.md             # all ingests
```

Operations: `ingest`, `query`, `lint`, `update`.
