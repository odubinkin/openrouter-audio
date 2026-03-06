---
id: "202603060758-TD3Q57"
title: "Sync help and docs with openrouter-audio CLI behavior"
result_summary: "Help, README, and SKILL are synchronized with current CLI behavior."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T07:59:41.681Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved: align help and docs to implemented CLI behavior, then verify with build and help output."
verification:
  state: "ok"
  updated_at: "2026-03-06T08:01:16.040Z"
  updated_by: "CODER"
  note: "Build passed and help/docs are aligned with implemented behavior: generate usage now includes --dry-run, defaults/notes in README and SKILL reflect current CLI logic."
commit:
  hash: "e9a837b902d4566f2b9a9995fd15307950fbd673"
  message: "📝 TD3Q57 docs: sync help and docs with CLI behavior"
comments:
  -
    author: "CODER"
    body: "Start: audited CLI implementation and found docs/help drift; now updating help text and markdown docs to exactly match implemented options, defaults, and output behavior."
  -
    author: "CODER"
    body: "Verified: documentation/help now matches implemented CLI behavior in src/openrouter-audio.ts; build succeeds and built --help shows updated generate options including --dry-run and aligned defaults/notes."
events:
  -
    type: "status"
    at: "2026-03-06T07:59:45.867Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audited CLI implementation and found docs/help drift; now updating help text and markdown docs to exactly match implemented options, defaults, and output behavior."
  -
    type: "verify"
    at: "2026-03-06T08:01:16.040Z"
    author: "CODER"
    state: "ok"
    note: "Build passed and help/docs are aligned with implemented behavior: generate usage now includes --dry-run, defaults/notes in README and SKILL reflect current CLI logic."
  -
    type: "status"
    at: "2026-03-06T08:02:00.182Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: documentation/help now matches implemented CLI behavior in src/openrouter-audio.ts; build succeeds and built --help shows updated generate options including --dry-run and aligned defaults/notes."
doc_version: 2
doc_updated_at: "2026-03-06T08:02:00.182Z"
doc_updated_by: "CODER"
description: "Audit src/openrouter-audio.ts and align CLI help text, README.md, and SKILL.md with actual command/options/defaults behavior."
id_source: "generated"
---
## Summary

Align user-facing documentation with implemented CLI behavior in src/openrouter-audio.ts, including command usage, option flags, defaults, and output semantics. Success means --help, README.md, and SKILL.md describe the same behavior with no stale or contradictory statements.

## Scope

In scope: src/openrouter-audio.ts usage/help text; README.md; SKILL.md. Out of scope: API request/response runtime logic changes unless required to fix help wording bugs.

## Plan

1) Inspect src/openrouter-audio.ts to enumerate commands/options/defaults/output behavior. 2) Compare against current usage() help text, README.md, and SKILL.md and list discrepancies. 3) Update usage() help text in source if needed (documentation-only behavior description changes). 4) Update README.md and SKILL.md to match implemented behavior exactly. 5) Run npm run build and validate help output from built/openrouter-audio/openrouter-audio --help.

## Risks

Risk: documenting inferred behavior instead of actual behavior. Mitigation: every statement is cross-checked against src/openrouter-audio.ts and validated via CLI --help. Risk: doc drift after edits. Mitigation: rebuild artifact and inspect generated help text.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- `npm run build`
- `build/openrouter-audio/openrouter-audio --help`
- Manual diff check for `README.md` and `SKILL.md` against implemented options/defaults in `src/openrouter-audio.ts`

### Evidence / Commands
- Capture command outputs for build success and help text reflecting updated usage/options.

### Pass criteria
- Build completes successfully.
- Help text includes all implemented options (including `--dry-run` for `generate`).
- `README.md` and `SKILL.md` contain no contradictions with current CLI behavior.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T08:01:16.040Z — VERIFY — ok

By: CODER

Note: Build passed and help/docs are aligned with implemented behavior: generate usage now includes --dry-run, defaults/notes in README and SKILL reflect current CLI logic.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T08:01:11.780Z, excerpt_hash=sha256:1d69d555018c1d1b1e3e8afa9cb4477f5cbd38b36ece175c8deb6c3809d55ebc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the documentation/help commit for this task, restoring prior versions of src/openrouter-audio.ts usage text, README.md, and SKILL.md. Re-run build and --help check to confirm rollback consistency.

## Context

The CLI recently evolved (default models, format handling, prompt flags, streaming behavior). Existing docs may lag implementation and can mislead users. Source of truth for behavior is src/openrouter-audio.ts in this repository.

## Notes

### Approvals / Overrides
- None.

### Decisions
- `src/openrouter-audio.ts` treated as source of truth for behavior.
- Updated help/docs only; runtime API/request logic unchanged.

### Implementation Notes
- Updated `usage()` in `src/openrouter-audio.ts`:
  - Added `--dry-run` to `generate` usage line.
  - Added notes for default voice (`alloy`) and `--dry-run` behavior.
- Updated `README.md` to reflect current defaults and behavior:
  - Added default generate voice.
  - Added explicit `--dry-run` behavior and API key exception for dry-run.
  - Reworded model list provenance to code-embedded list (not dated external catalog note).
- Updated `SKILL.md` similarly for defaults/environment/notes and added dry-run example.

### Evidence / Links
- `npm run build` (success)
- `build/openrouter-audio/openrouter-audio --help` (shows `--dry-run` and updated notes)
