---
id: "202603060803-S5D74Z"
title: "Trim SKILL.md dry-run details and rewrite CLI paths"
status: "DOING"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T08:05:08.880Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved updated docs-only plan for SKILL.md dry-run removal and path normalization."
verification:
  state: "ok"
  updated_at: "2026-03-06T08:05:45.880Z"
  updated_by: "CODER"
  note: "Verified SKILL.md cleanup: removed dry-run references and replaced build/openrouter-audio/ path prefix with ./openrouter-audio; grep check returned no matches."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: applying user-requested SKILL.md cleanup by removing dry-run details and replacing build/openrouter-audio/ path prefixes with ./openrouter-audio examples."
events:
  -
    type: "status"
    at: "2026-03-06T08:05:12.869Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: applying user-requested SKILL.md cleanup by removing dry-run details and replacing build/openrouter-audio/ path prefixes with ./openrouter-audio examples."
  -
    type: "verify"
    at: "2026-03-06T08:05:45.880Z"
    author: "CODER"
    state: "ok"
    note: "Verified SKILL.md cleanup: removed dry-run references and replaced build/openrouter-audio/ path prefix with ./openrouter-audio; grep check returned no matches."
doc_version: 2
doc_updated_at: "2026-03-06T08:05:45.881Z"
doc_updated_by: "CODER"
description: "Remove dry-run mentions from SKILL.md and replace build/openrouter-audio/ paths with ./openrouter-audio."
id_source: "generated"
---
## Summary


## Scope

In scope: SKILL.md only. Out of scope: README.md, source code, CLI behavior.

## Plan

1) Edit SKILL.md: remove all dry-run references. 2) Replace build/openrouter-audio/ path prefix with ./openrouter-audio for skill command/path examples. 3) Verify with ripgrep checks. 4) Commit and finish task.

## Risks


## Verify Steps

### Scope
- Primary tag: `docs`

### Checks
- `rg -n "dry-run|build/openrouter-audio/" SKILL.md`

### Evidence / Commands
- Capture grep output showing no `dry-run` references and no legacy `build/openrouter-audio/` paths.

### Pass criteria
- `SKILL.md` contains zero `dry-run` mentions.
- All CLI examples and artifact paths in `SKILL.md` use `./openrouter-audio` where applicable.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T08:05:45.880Z — VERIFY — ok

By: CODER

Note: Verified SKILL.md cleanup: removed dry-run references and replaced build/openrouter-audio/ path prefix with ./openrouter-audio; grep check returned no matches.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T08:05:41.705Z, excerpt_hash=sha256:ae2263037025752b58abfb3467b8f8de9b37ea1c5bc7246ab7f02e873e9e4037

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for this task to restore prior SKILL.md text.

## Notes

### Approvals / Overrides
- None.

### Decisions
- Reused existing TODO task `202603060803-S5D74Z` and expanded scope to include path normalization in SKILL.md.

### Implementation Notes
- Removed dry-run references from SKILL.md (environment exception, usage example block, notes bullet).
- Replaced all `build/openrouter-audio/` path prefixes with `./openrouter-audio` in SKILL.md.

### Evidence / Links
- `rg -n "dry-run|build/openrouter-audio/" SKILL.md` returned no matches.
